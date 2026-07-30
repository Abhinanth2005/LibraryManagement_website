from rest_framework import serializers
from .models import Category, Book, Borrow


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"

from rest_framework import serializers
from .models import Book, Borrow,Purchase

class BookSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    is_borrowed = serializers.SerializerMethodField()
    is_purchased = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            "id",
            "category",
            "category_name",
            "title",
            "author",
            "price",
            "quantity",
            "available",
            "status",
            "cover",
            "created_at",
            "is_borrowed",
            "is_purchased",
            "description",
            "publisher",
            "published_year",
        ]

    def get_is_borrowed(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        return Borrow.objects.filter(
            book=obj,
            user=request.user,
            returned=False,
        ).exists()

    def get_is_purchased(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        return Purchase.objects.filter(
            book=obj,
            user=request.user,
        ).exists()

    


class BorrowSerializer(serializers.ModelSerializer):

    book_title = serializers.CharField(
        source="book.title",
        read_only=True
    )

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Borrow
        fields = "__all__"



class PurchaseSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = Purchase
        fields = [
            "id",
            "book",
            "purchase_date",
        ]        