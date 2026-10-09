from django.urls import path
from .views import (
    create_order,
    vendor_orders,
    admin_orders,
    update_order_status,
    customer_orders
)

urlpatterns = [
    path('create/', create_order, name='create_order'),
    path('vendor-orders/', vendor_orders, name='vendor_orders'),
    path('admin-orders/', admin_orders, name='admin_orders'),
    path(
        'update-status/<int:order_id>/',
        update_order_status,
        name='update_order_status'
    ),
    path(
        'customer-orders/',
        customer_orders,
        name='customer_orders'
    ),
]