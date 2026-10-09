from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

from .models import Category, Product
from vendors.models import Vendor
from .serializers import (
    CategorySerializer,
    VendorSerializer,
    ProductSerializer
)


# ================= CATEGORY =================

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


# ================= VENDOR =================

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


# ================= PRODUCT =================

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()

        vendor_id = self.request.query_params.get("vendor")

        if vendor_id:
            queryset = queryset.filter(vendor_id=vendor_id)

        return queryset


# ================= AI PRODUCT DESCRIPTION =================

@api_view(["POST"])
def generate_product_description(request):

    try:
        product_name = request.data.get("product_name", "")
        category = request.data.get("category", "")

        if not product_name:
            return Response(
                {"error": "Product name is required"},
                status=400
            )

        if not category:
            return Response(
                {"error": "Category is required"},
                status=400
            )

        prompt = f"""
Create a professional e-commerce product description.

Product Name: {product_name}
Category: {category}

Rules:
- Write 3 to 5 sentences.
- Use simple, natural English.
- Make it attractive for customers.
- Only use the product name and category provided.
- Do NOT invent specifications, numbers, features, warranty,
  battery life, materials, certifications, or technical details.
- Do NOT mention price or stock.
- Return only the description.
"""

        ollama_response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2:3b",
                "prompt": prompt,
                "stream": False
            },
            timeout=120
        )

        if ollama_response.status_code != 200:
            return Response(
                {
                    "error": "Ollama AI service failed",
                    "details": ollama_response.text
                },
                status=500
            )

        data = ollama_response.json()

        description = data.get("response", "").strip()

        return Response({
            "product_name": product_name,
            "description": description
        })

    except Exception as e:

        print("OLLAMA ERROR:", str(e))

        return Response(
            {"error": str(e)},
            status=500
        )


# ================= AI DESCRIPTION FOR EXISTING PRODUCT =================

@api_view(["POST"])
def generate_description_for_product(request, product_id):

    try:
        product = Product.objects.get(id=product_id)

        prompt = f"""
Create a professional e-commerce product description.

Product Name: {product.name}
Category: {product.category.name}

Rules:
- Write 3 to 5 sentences.
- Use simple, natural English.
- Make it attractive for customers.
- Only use the product name and category provided.
- Do NOT invent specifications, numbers, features, warranty,
  battery life, materials, certifications, or technical details.
- Do NOT mention price or stock.
- Return only the description.
"""

        ollama_response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2:3b",
                "prompt": prompt,
                "stream": False
            },
            timeout=120
        )

        if ollama_response.status_code != 200:
            return Response(
                {
                    "error": "Ollama AI service failed",
                    "details": ollama_response.text
                },
                status=500
            )

        data = ollama_response.json()

        description = data.get("response", "").strip()

        product.description = description
        product.save()

        return Response({
            "id": product.id,
            "name": product.name,
            "description": product.description
        })

    except Product.DoesNotExist:

        return Response(
            {"error": "Product not found"},
            status=404
        )

    except Exception as e:

        print("OLLAMA PRODUCT ERROR:", str(e))

        return Response(
            {"error": str(e)},
            status=500
        )