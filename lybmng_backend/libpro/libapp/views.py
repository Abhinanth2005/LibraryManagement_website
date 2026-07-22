from django.utils import timezone

from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Book, Category, Borrow
from .serializers import (
    BookSerializer,
    CategorySerializer,
    BorrowSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    pagination_class = None


class BorrowViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Borrow.objects.all().order_by("-borrow_date")
    serializer_class = BorrowSerializer


from django.db import transaction
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response

from .models import Book, Borrow
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related("category").all()
    serializer_class = BookSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "category",
        "status",
    ]

    search_fields = [
        "title",
        "author",
    ]

    ordering_fields = [
        "title",
        "author",
        "available",
        "created_at",
    ]

    ordering = [
        "-created_at",
    ]

    @transaction.atomic
    @action(detail=True, methods=["post"])
    def borrow(self, request, pk=None):

        book = self.get_object()

        if book.available <= 0:
            return Response(
                {
                    "success": False,
                    "message": "Book is out of stock."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        book.available -= 1

        if book.available == 0:
            book.status = "Out of Stock"

        book.save()

        Borrow.objects.create(book=book)

        return Response(
            {
                "success": True,
                "message": "Book borrowed successfully.",
                "book": {
                    "id": book.id,
                    "title": book.title,
                    "available": book.available,
                    "status": book.status,
                },
            },
            status=status.HTTP_200_OK,
        )

    @transaction.atomic
    @action(detail=True, methods=["post"], url_path="return")
    def return_book(self, request, pk=None):

        book = self.get_object()

        borrow = Borrow.objects.filter(
       book=book,
       user=request.user,
       returned=False
      ).first()

        if borrow is None:
            return Response(
                {
                    "success": False,
                    "message": "No active borrow record found."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        borrow.returned = True
        borrow.return_date = timezone.now()
        borrow.save()

        book.available += 1
        book.status = "Available"
        book.save()

        return Response(
            {
                "success": True,
                "message": "Book returned successfully.",
                "book": {
                    "id": book.id,
                    "title": book.title,
                    "available": book.available,
                    "status": book.status,
                },
            },
            status=status.HTTP_200_OK,
        )


from .models import Book, Category, Borrow


class DashboardAPIView(APIView):

    def get(self, request):

        total_books = Book.objects.count()

        available_books = Book.objects.filter(
            available__gt=0
        ).count()

        borrowed_books = Borrow.objects.filter(
            returned=False
        ).count()

        out_of_stock = Book.objects.filter(
            available=0
        ).count()

        total_categories = Category.objects.count()

        recent_books = Book.objects.select_related(
            "category"
        ).order_by("-created_at")[:5]

        category_chart = []

        categories = Category.objects.all()

        for category in categories:

            available = Book.objects.filter(
                category=category
            ).aggregate(
                total=Sum("available")
            )["total"] or 0

            category_chart.append({
                "category": category.name,
                "available": available,
            })

        return Response({

            "total_books": total_books,

            "available_books": available_books,

            "borrowed_books": borrowed_books,

            "out_of_stock": out_of_stock,

            "categories": total_categories,

            "category_chart": category_chart,

            "recent_books": [

                {

                    "id": book.id,

                    "title": book.title,

                    "author": book.author,

                    "category": book.category.name,

                    "available": book.available,

                    "quantity": book.quantity,

                    "status": book.status,

                }

                for book in recent_books

            ]

        })