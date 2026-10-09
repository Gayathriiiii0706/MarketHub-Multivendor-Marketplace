from django.urls import path
from . import views

urlpatterns = [
    path(
        "profile/<int:vendor_id>/",
        views.vendor_profile,
        name="vendor_profile"
    ),

    path(
        "list/",
        views.vendor_list,
        name="vendor_list"
    ),

    path(
        "register/",
        views.vendor_register,
        name="vendor_register"
    ),
]