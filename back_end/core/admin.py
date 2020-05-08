from django.contrib import admin
from .models import Product, Order, OrderProduct, Category, SubCategory, Client, DeliveryMan, \
    Payment, ShippingAddress, Refund, AdditionalItem, ProductClient


def grant_refund(modeladmin, request, queryset):
    queryset.update(refund_requested=False, refund_granted=True)


grant_refund.short_description = 'grant refund'


class OrderAdmin(admin.ModelAdmin):
    list_display = ['user', 'ordered', 'received', 'refund_requested', 'refund_granted', 'shipping_address', 'payment']
    list_filter = ['user', 'ordered', 'received', 'refund_requested', 'refund_granted']
    list_display_links = ['user', 'shipping_address', 'payment']
    search_fields = ['user__username', 'ref_code']
    actions = [grant_refund]


# Register your models here.
admin.site.register(Product)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderProduct)
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Client)
admin.site.register(DeliveryMan)
admin.site.register(Payment)
admin.site.register(ShippingAddress)
admin.site.register(Refund)
admin.site.register(AdditionalItem)
admin.site.register(ProductClient)
