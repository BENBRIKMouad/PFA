from django.contrib import admin
from .models import Product, Order, OrderProduct, Category, SubCategory, Client, DeliveryMan

# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Client)
admin.site.register(DeliveryMan)
