from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from .models import Order, OrderItem
from accounts.models import User
from products.models import Product


@csrf_exempt
def create_order(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Only POST method is allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        address = data.get("address")
        items = data.get("items", [])

        if not name or not email or not phone or not address:
            return JsonResponse(
                {"error": "Please fill all customer details"},
                status=400
            )

        if not items:
            return JsonResponse(
                {"error": "Cart is empty"},
                status=400
            )

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "username": email,
                "first_name": name
            }
        )

        total_amount = 0

        for item in items:

            product = Product.objects.get(
                id=item["product_id"]
            )

            quantity = int(item["quantity"])

            total_amount += product.price * quantity

        order = Order.objects.create(
            user=user,
            total_amount=total_amount
        )

        for item in items:

            product = Product.objects.get(
                id=item["product_id"]
            )

            quantity = int(item["quantity"])

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )

        return JsonResponse({
            "message": "Order created successfully",
            "order_id": order.id,
            "total_amount": str(order.total_amount)
        })

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=400
        )


@csrf_exempt
def vendor_orders(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET method is allowed"},
            status=405
        )

    try:

        order_items = OrderItem.objects.select_related(
            "order",
            "product",
            "order__user"
        ).all()

        orders = []

        for item in order_items:

            product = item.product

            if not product.vendor:
                continue

            orders.append({
                "order_id": item.order.id,
                "customer": item.order.user.first_name,
                "product": product.name,
                "amount": str(
                    item.price * item.quantity
                ),
                "quantity": item.quantity,
                "status": item.order.status
            })

        return JsonResponse(
            {"orders": orders}
        )

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=400
        )


@csrf_exempt
def update_order_status(request, order_id):

    if request.method != "PUT":
        return JsonResponse(
            {"error": "Only PUT method is allowed"},
            status=405
        )

    try:

        data = json.loads(request.body)

        new_status = data.get("status")

        if new_status not in [
            "PENDING",
            "CONFIRMED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ]:
            return JsonResponse(
                {"error": "Invalid status"},
                status=400
            )

        order = Order.objects.get(id=order_id)

        order.status = new_status
        order.save()

        return JsonResponse({
            "message": "Order status updated successfully",
            "order_id": order.id,
            "status": order.status
        })

    except Order.DoesNotExist:

        return JsonResponse(
            {"error": "Order not found"},
            status=404
        )

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=400
        )

    # ================= ADMIN ORDERS =================

@csrf_exempt
def admin_orders(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET method is allowed"},
            status=405
        )

    try:

        orders = Order.objects.select_related(
            "user"
        ).prefetch_related(
            "items__product__vendor"
        ).all().order_by("-id")

        order_data = []

        for order in orders:

            vendor_name = "N/A"

            first_item = order.items.first()

            if first_item and first_item.product.vendor:
                vendor_name = first_item.product.vendor.business_name

            order_data.append({
                "order_id": order.id,
                "customer": order.user.first_name or order.user.username,
                "vendor": vendor_name,
                "amount": str(order.total_amount),
                "status": order.status,
            })

        return JsonResponse({
            "orders": order_data
        })

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=400
        )

    # ================= CUSTOMER ORDERS =================

@csrf_exempt
def customer_orders(request):

    if request.method != "GET":
        return JsonResponse(
            {"error": "Only GET method is allowed"},
            status=405
        )

    try:

        email = request.GET.get("email")

        if not email:
            return JsonResponse(
                {"error": "Customer email is required"},
                status=400
            )

        orders = Order.objects.filter(
            user__email=email
        ).prefetch_related(
            "items__product"
        ).order_by("-id")

        order_data = []

        for order in orders:

            for item in order.items.all():

                order_data.append({
                    "order_id": order.id,
                    "product": item.product.name,
                    "quantity": item.quantity,
                    "amount": str(
                        item.price * item.quantity
                    ),
                    "status": order.status
                })

        return JsonResponse({
            "orders": order_data
        })

    except Exception as e:

        return JsonResponse(
            {"error": str(e)},
            status=400
        )