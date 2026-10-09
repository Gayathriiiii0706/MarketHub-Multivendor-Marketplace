from rest_framework import serializers
from .models import Category, Vendor, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "vendor",
            "category",
            "category_name",
            "name",
            "price",
            "stock",
            "description",
            "image",
            "created_at"
        ]