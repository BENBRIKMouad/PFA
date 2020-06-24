from django.urls import path, include
from . import views
from core.views import *
from . import views
from MyFood import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

app_name = 'core'
urlpatterns = [
    path('', index, name='home_page'),
    # path('',ProductList.as_view(),name='prduct_list'),
    path('product/<slug>/', ProductDetail.as_view(), name='product'),
    path('check_out/', CheckOut.as_view(), name='CheckOut'),
    path('add_to_cart/<slug>', views.AddToCart, name='add_to_cart'),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('core.api.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
