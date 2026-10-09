from django.contrib import admin
from .models import Product, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'vendor',
        'category',
        'price',
        'stock',
    )
    search_fields = (
        'name',
        'description',
    )
    list_filter = (
        'category',
        'vendor',
    )