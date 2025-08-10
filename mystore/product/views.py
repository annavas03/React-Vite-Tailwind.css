from rest_framework.viewsets import ModelViewSet
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductCreateSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
import requests
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


class GoogleLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):

        id_token = request.data.get("id_token")
        if not id_token:
            return Response({"detail": "ID token required"}, status=status.HTTP_400_BAD_REQUEST)

        google_url = f'https://oauth2.googleapis.com/tokeninfo?id_token={id_token}'
        r = requests.get(google_url)
        if r.status_code != 200:
            return Response({"detail": "Invalid ID token"}, status=status.HTTP_400_BAD_REQUEST)

        userinfo = r.json()
        email = userinfo.get("email")
        first_name = userinfo.get("given_name")
        last_name = userinfo.get("family_name")
        picture = userinfo.get("picture")

        if not email:
            return Response({"detail": "Email not provided by Google"}, status=status.HTTP_400_BAD_REQUEST)

        user, created = User.objects.get_or_create(email=email, defaults={
            "username": email,
            "first_name": first_name or '',
            "last_name": last_name or '',
        })

        if not created:
            updated = False
            if first_name and user.first_name != first_name:
                user.first_name = first_name
                updated = True
            if last_name and user.last_name != last_name:
                user.last_name = last_name
                updated = True
            if updated:
                user.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "picture": picture,
        })

class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ProductSerializer
        return ProductCreateSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category_id = self.request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset
