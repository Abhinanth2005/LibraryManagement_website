from django.contrib import admin
from .models import Category, Book, Borrow,Purchase

admin.site.register(Category)
admin.site.register(Book)
admin.site.register(Borrow)
admin.site.register(Purchase)