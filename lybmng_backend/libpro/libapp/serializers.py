from rest_framework import serializers
from .models import Category, Book, Borrow


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Book
        fields = "__all__"


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