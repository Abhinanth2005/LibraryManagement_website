from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):

    STATUS_CHOICES = [
        ("Available", "Available"),
        ("Out of Stock", "Out of Stock"),
    ]

    title = models.CharField(max_length=200)
    author = models.CharField(max_length=150)

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField(default=1)
    available = models.PositiveIntegerField(default=1)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Available"
    )

    cover = models.ImageField(
        upload_to="covers/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.status = (
            "Available"
            if self.available > 0
            else "Out of Stock"
        )
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Borrow(models.Model):

    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    borrow_date = models.DateTimeField(
        auto_now_add=True
    )

    returned = models.BooleanField(
        default=False
    )

    return_date = models.DateTimeField(
        null=True,
        blank=True
    )

    def __str__(self):
        return self.book.title