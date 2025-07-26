from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Category
from .models import Product
from .serializers import CategorySerializer
from .serializers import ProductSerializer

# Create your views here.
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer