import requests
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from productos.models import Producto
from productos.serializers import ProductoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


class CartItemViews(APIView):
    def patch(self, request, id=None):
        item = Producto.objects.get(id=id)
        serializer = ProductoSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})
