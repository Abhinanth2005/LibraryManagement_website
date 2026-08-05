from django.utils import timezone

from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response



from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Book, Category, Borrow, Purchase
from django.contrib.auth.models import User
from .serializers import (
    BookSerializer,
    CategorySerializer,
    BorrowSerializer,
    PurchaseSerializer,
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

    def get_serializer_context(self):
     context = super().get_serializer_context()
     context["request"] = self.request
     return context

    @transaction.atomic
    @action(detail=True, methods=["post"])
    def borrow(self, request, pk=None):
        print("USER:", request.user)
        print("AUTH:", request.user.is_authenticated)

        if not request.user.is_authenticated:
            return Response(
            {
                "message": "Login required"
            },
            status=401
        )


        book = self.get_object()

        if book.available <= 0:
            return Response(
                {
                    "success": False,
                    "message": "Book is out of stock."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


        already_borrowed = Borrow.objects.filter(
        book=book,
          user=request.user,
         returned=False,
        ).exists()

        if already_borrowed:
         return Response(
        {
            "success": False,
            "message": "You have already borrowed this book."
        },
        status=status.HTTP_400_BAD_REQUEST,
    )

        book.available -= 1

        if book.available == 0:
            book.status = "Out of Stock"

        book.save()

        # Borrow.objects.create(book=book)
        Borrow.objects.create(
    book=book,
    user=request.user,
)

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
    @transaction.atomic
    @action(detail=True, methods=["post"])
    def buy(self, request, pk=None):

        if not request.user.is_authenticated:
            return Response(
              {
                  "message": "Login required"
              },
              status=status.HTTP_401_UNAUTHORIZED,
            )

        book = self.get_object()

        already_purchased = Purchase.objects.filter(
          book=book,
          user=request.user,
          ).exists()

        if already_purchased:
            return Response(
               {
                   "success": False,
                   "message": "You have already purchased this book."
               },
               status=status.HTTP_400_BAD_REQUEST,
            )

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

        Purchase.objects.create(
        book=book,
        user=request.user,
        )

        return Response(
            {
                "success": True,
                "message": "Book purchased successfully.",
                "book": {
                    "id": book.id,
                    "title": book.title,
                    "price": book.price,
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

from django.contrib.auth import authenticate, login,logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["POST"])
def login_view(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user_obj = User.objects.get(email=email)

    except User.DoesNotExist:
        return Response(
            {"message": "Invalid credentials"},
            status=400
        )


    user = authenticate(
        request,
        username=user_obj.username,
        password=password
    )


    if user is None:
        return Response(
            {"message": "Invalid credentials"},
            status=400
        )


    login(request, user)   # <-- creates session cookie

    from django.middleware.csrf import get_token

    return Response(
        {
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "is_superuser": user.is_superuser,
            },
            "csrftoken": get_token(request),
        }
    )

@api_view(["POST"])
def logout_view(request):

    logout(request)

    return Response(
        {
            "message": "Logged out successfully."
        }
    )

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(["POST"])
def register_view(request):

    name = request.data.get("name")
    email = request.data.get("email")
    password = request.data.get("password")

    if User.objects.filter(email=email).exists():
        return Response(
            {
                "message": "Email already exists."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=email,
        email=email,
        first_name=name,
        password=password
    )

    return Response(
        {
            "message": "Registration successful."
        },
        status=status.HTTP_201_CREATED
    )

# @api_view(["GET"])
# def my_purchased_books(request):

#     purchases = Purchase.objects.filter(
#         user=request.user
#     ).select_related("book")

#     serializer = PurchaseSerializer(
#         purchases,
#         many=True,
#         context={"request": request},
#     )

#     return Response(serializer.data)

@api_view(["GET"])
def my_purchased_books(request):

    print("USER:", request.user)
    print("AUTH:", request.user.is_authenticated)

    purchases = Purchase.objects.filter(
        user=request.user
    )

    print("COUNT:", purchases.count())

    serializer = PurchaseSerializer(
        purchases,
        many=True,
        context={"request": request},
    )

    return Response(serializer.data)


from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token

@ensure_csrf_cookie
def current_user(request):
    csrf_token = get_token(request)

    if not request.user.is_authenticated:
        return JsonResponse(
            {"detail": "Authentication required", "csrftoken": csrf_token},
            status=401
        )

    return JsonResponse({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "is_superuser": request.user.is_superuser,
        "csrftoken": csrf_token,
    })
