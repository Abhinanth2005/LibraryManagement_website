from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BookViewSet,
    BorrowViewSet,
    CategoryViewSet,
    DashboardAPIView,
)

router = DefaultRouter()

router.register(r"books", BookViewSet, basename="books")
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"borrow", BorrowViewSet, basename="borrow")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", DashboardAPIView.as_view(), name="dashboard"),
]