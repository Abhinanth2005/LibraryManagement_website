from requests import session
import stripe

from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Book, Purchase

stripe.api_key = settings.STRIPE_SECRET_KEY

print(repr(settings.STRIPE_SECRET_KEY))
print("Key Length:", len(settings.STRIPE_SECRET_KEY))


@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def create_checkout_session(request, book_id):

    book = get_object_or_404(Book, id=book_id)

    if book.available <= 0:
        return Response(
            {"error": "Book is out of stock."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        print("Logged in user:", request.user)
        print("User ID:", request.user.id)
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],

            line_items=[
                {
                    "price_data": {
                        "currency": "inr",        
                        "product_data": {
                            "name": book.title,
                            "description": book.description,
                        },
                        "unit_amount": int(book.price * 100),
                    },
                    "quantity": 1,
                }
            ],

            mode="payment",

            metadata={
                "book_id": str(book.id),
                "user_id": str(request.user.id),
            },

            success_url="https://librarymanagement-website.onrender.com/payment-success?session_id={CHECKOUT_SESSION_ID}",

            cancel_url="https://librarymanagement-website.onrender.com/payment-cancel",
        )

        return Response(
            {
                "url": checkout_session.url,
            }
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def payment_success(request):

    print("========== PAYMENT SUCCESS CALLED ==========")

    session_id = request.data.get("session_id")

    if not session_id:
        return Response(
            {"error": "Session ID is required"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        print("Stripe Metadata:", session.metadata)
        print("User ID:", session.metadata.get("user_id"))
        print("Book ID:", session.metadata.get("book_id"))

        session = stripe.checkout.Session.retrieve(session_id)

        if session.payment_status != "paid":
            return Response(
                {"error": "Payment not completed"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        payment_id = session.payment_intent

        if Purchase.objects.filter(
            stripe_payment_id=payment_id
        ).exists():
            return Response(
                {"message": "Purchase already exists."}
            )

        book = Book.objects.get(
            id=session.metadata["book_id"]
        )
        User = get_user_model()

        user = User.objects.get(
            id=session.metadata["user_id"]
        )

        Purchase.objects.create(
            user=user,
            book=book,
            amount=book.price,
            stripe_payment_id=payment_id,
            payment_status="Paid",
        )
        if book.available > 0:
           book.available -= 1
           book.save()

        return Response(
            {
                "message": "Payment Successful",
                "book": book.title,
            }
        )

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
def payment_cancel(request):

    return Response(
        {
            "message": "Payment Cancelled"
        }
    )