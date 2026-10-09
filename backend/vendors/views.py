from django.http import JsonResponse
from .models import Vendor
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def vendor_profile(request, vendor_id):

 try:
    vendor = Vendor.objects.get(id=vendor_id)
 except Vendor.DoesNotExist:
    return JsonResponse({"error": "Vendor not found"}, status=404)

 if request.method == "GET":
    return JsonResponse({
        "id": vendor.id,
        "full_name": vendor.full_name,
        "email": vendor.email,
        "phone": vendor.phone,
        "business_name": vendor.business_name,
        "business_address": vendor.business_address
    })

 if request.method == "PUT":
    data = json.loads(request.body)

    vendor.full_name = data.get("full_name", vendor.full_name)
    vendor.email = data.get("email", vendor.email)
    vendor.phone = data.get("phone", vendor.phone)
    vendor.business_name = data.get("business_name", vendor.business_name)
    vendor.business_address = data.get(
        "business_address",
        vendor.business_address
    )

    vendor.save()

    return JsonResponse({
        "message": "Profile updated successfully"
    })

 return JsonResponse({"error": "Method not allowed"}, status=405)

# ================= VENDOR LIST =================

def vendor_list(request):

    vendors = Vendor.objects.all()

    vendor_data = []

    for vendor in vendors:

        vendor_data.append({
            "id": vendor.id,
            "full_name": vendor.full_name,
            "email": vendor.email,
            "phone": vendor.phone,
            "business_name": vendor.business_name,
            "business_address": vendor.business_address
        })

    return JsonResponse({
        "vendors": vendor_data
    })
# ================= VENDOR REGISTRATION =================

@csrf_exempt
def vendor_register(request):

    if request.method != "POST":
        return JsonResponse(
            {"error": "Method not allowed"},
            status=405
        )

    try:
        data = json.loads(request.body)

        full_name = data.get("full_name", "").strip()
        email = data.get("email", "").strip().lower()
        phone = data.get("phone", "").strip()
        business_name = data.get("business_name", "").strip()

        if not full_name or not email or not business_name:
            return JsonResponse(
                {"error": "Name, email, and business name are required."},
                status=400
            )

        if Vendor.objects.filter(email__iexact=email).exists():
            return JsonResponse(
                {"error": "A vendor with this email already exists."},
                status=409
            )

        vendor = Vendor.objects.create(
            full_name=full_name,
            email=email,
            phone=phone,
            business_name=business_name,
        )

        return JsonResponse(
            {
                "message": "Vendor registered successfully.",
                "vendor": {
                    "id": vendor.id,
                    "full_name": vendor.full_name,
                    "email": vendor.email,
                    "phone": vendor.phone,
                    "business_name": vendor.business_name,
                }
            },
            status=201
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {"error": "Invalid JSON data."},
            status=400
        )

    except Exception as error:
        return JsonResponse(
            {"error": "Vendor registration failed."},
            status=500
        )