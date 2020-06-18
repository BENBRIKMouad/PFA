from django.urls import path, include
# from .views import ProductList, ProductDetail, ProductCreate, ProductUpdate, ProductDelete
from .views import ProductViewSet, OrderProductViewSet, OrderViewSet, CategoryViewSet, SubCategoryViewSet, \
    RefundViewSet, OrderView, ProfitView, OrderGraph, AdditionalItemViewSet, RefundHandler, ClientViewSet, OrderByDate, \
    ProductView, ClientView, CreateAuth, TokenView, AddToCart, RemoveFromCart, RemoveSingleProductFromCart
from rest_framework.routers import DefaultRouter
from .views import cart_item_count,  \
    payment, total

router = DefaultRouter()
router.register(r'product', ProductViewSet, basename='product')
router.register(r'order_product', OrderProductViewSet, basename='order_product')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'subcategory', SubCategoryViewSet, basename='subcategory')
router.register(r'RefundView', RefundViewSet, basename='refund')
router.register(r'additional_item', AdditionalItemViewSet, basename='additional_item')
router.register(r'ClientHandler', ClientViewSet, basename='client')

app_name = 'api'
urlpatterns = [
    path('add_to_cart/', AddToCart.as_view()),
    path('remove_from_cart/', RemoveFromCart.as_view(), name="remove_from_cart"),
    path('cart_item_count/', cart_item_count),
    path('remove_single_product_from_cart/', RemoveSingleProductFromCart.as_view(), name="remove"),
    path('payment/<pk>', payment),
    path('total/', total),
    # path('request_refund/', request_refund),
    path('admin_order/', OrderByDate.as_view()),
    path('profit/', ProfitView.as_view()),
    path('OrderGraph/', OrderGraph.as_view()),
    path('RefundHandler/', RefundHandler.as_view()),
    path('OrderView/', OrderView.as_view()),
    path('OrderView/<pk>', OrderView.as_view()),
    path('ProductView/', ProductView.as_view()),
    path('ProductView/<pk>', ProductView.as_view()),
    path('ClientView/', ClientView.as_view()),
    path('CreateAuth/', CreateAuth.as_view()),
    path('TokenView/', TokenView.as_view()),
]
urlpatterns += router.urls
