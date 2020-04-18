from django.urls import path
from . import views

app_name = 'core'
urlpatterns = [
    path('',views.ProductList,name='prduct_list'),
    path('product/',views.ProducDetail,name='ProducDetail'),
    path('check_out/',views.CheckOut,name='CheckOut')
]
