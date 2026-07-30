from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BookViewSet,
    BorrowViewSet,
    CategoryViewSet,
    DashboardAPIView,
    current_user,
)
from .views import login_view, logout_view
from .views import register_view, login_view,my_purchased_books
from . import payment_views

router = DefaultRouter()

router.register(r"books", BookViewSet, basename="books")
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"borrow", BorrowViewSet, basename="borrow")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard/", DashboardAPIView.as_view(), name="dashboard"),
path("logout/", logout_view),
path("register/", register_view),
path("login/", login_view),
path(
    "my_purchases/",
    my_purchased_books,
),
 path(
        "checkout/<int:book_id>/",
        payment_views.create_checkout_session,
        name="checkout",
    ),

    path(
        "payment-success/",
        payment_views.payment_success,
        name="payment-success",
    ),

    path(
        "payment-cancel/",
        payment_views.payment_cancel,
        name="payment-cancel",
    ),
    path("me/", current_user),

]


