from django.urls import path
from . import views
from core.views import *
from . import views
from MyFood import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
app_name = 'core'
urlpatterns = [
    path('',ProductList.as_view(),name='prduct_list'),
    path('product/<slug>/',ProductDetail.as_view(),name='product'),
    path('check_out/',CheckOut.as_view(),name='CheckOut'),
    path('add_to_cart/<slug>',views.AddToCart,name='add_to_cart')
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)