from django.http import JsonResponse
from .models import User


def customer_list(request):

    if request.method == "GET":

        customers = User.objects.filter(role="CUSTOMER")

        data = []

        for customer in customers:
            data.append({
    "id": customer.id,
    "name": f"{customer.first_name} {customer.last_name}".strip(),
    "username": customer.username,
    "email": customer.email,
    "phone": customer.phone,
    "orders": customer.orders.count(),
})

        return JsonResponse({
            "customers": data
        })

    return JsonResponse(
        {"error": "Method not allowed"},
        status=405
    )