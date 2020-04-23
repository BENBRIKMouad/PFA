from django.urls import path, include
# from .views import ProductList, ProductDetail, ProductCreate, ProductUpdate, ProductDelete
from .views import ProductViewSet, OrderProductViewSet, OrderViewSet, CategoryViewSet, SubCategoryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'product', ProductViewSet, basename='product')
router.register(r'order_product', OrderProductViewSet, basename='order_product')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'subcategory', SubCategoryViewSet, basename='subcategory')
urlpatterns = router.urls

# urlpatterns = [
#     path('', ProductList.as_view()),
#     path('<pk>', ProductDetail.as_view()),
#     path('create_product/', ProductCreate.as_view()),
#     path('<pk>/update_product/', ProductUpdate.as_view()),
#     path('<pk>/delete_product/', ProductDelete.as_view()),
# ]