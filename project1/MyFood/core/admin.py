from django.contrib import admin
from .models import Product,Order,OrderProduct,Category,SubCategory
# Register your models here.
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Category)
admin.site.register(SubCategory)
