from django.contrib import admin
from .models import Vendor


@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = (
        'full_name',
        'business_name',
        'email',
        'phone',
    )
    search_fields = (
        'full_name',
        'business_name',
        'email',
    )