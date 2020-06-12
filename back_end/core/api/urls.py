from django.urls import path, include
# from .views import ProductList, ProductDetail, ProductCreate, ProductUpdate, ProductDelete
from .views import ProductViewSet, OrderProductViewSet, OrderViewSet, CategoryViewSet, SubCategoryViewSet, \
    RefundViewSet, OrderView, ProfitView, OrderGraph, AdditionalItemViewSet, RefundView, ClientViewSet, OrderDetail
from rest_framework.routers import DefaultRouter
from .views import add_to_cart, remove_from_cart, cart_item_count, order_summary, remove_single_product_from_cart, \
    payment, total

router = DefaultRouter()
router.register(r'product', ProductViewSet, basename='product')
router.register(r'order_product', OrderProductViewSet, basename='order_product')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'subcategory', SubCategoryViewSet, basename='subcategory')
router.register(r'refund', RefundViewSet, basename='refund')
router.register(r'additional_item', AdditionalItemViewSet, basename='additional_item')
router.register(r'client', ClientViewSet, basename='client')

app_name = 'api'
urlpatterns = [
    path('add_to_cart/<slug>', add_to_cart),
    path('remove_from_cart/<slug>', remove_from_cart, name="remove_from_cart"),
    path('cart_item_count/', cart_item_count),
    path('order_summary/', order_summary),
    path('remove_single_product_from_cart/<slug>', remove_single_product_from_cart, name="remove"),
    path('payment/<pk>', payment),
    path('total/', total),
    # path('request_refund/', request_refund),
    path('admin_order/', OrderView.as_view()),
    path('profit/', ProfitView.as_view()),
    path('OrderGraph/', OrderGraph.as_view()),
    path('RefundView/', RefundView.as_view()),
    path('OrderDetail/', OrderDetail.as_view()),
]
urlpatterns += router.urls
