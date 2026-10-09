from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CategoryViewSet,
    VendorViewSet,
    ProductViewSet,
    generate_product_description,
    generate_description_for_product
)


router = DefaultRouter()

router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)


urlpatterns = [
    path('', include(router.urls)),

    path(
        'generate-description/',
        generate_product_description,
        name='generate-description'
    ),

    path(
        'generate-description/<int:product_id>/',
        generate_description_for_product,
        name='generate-description-for-product'
    ),
]