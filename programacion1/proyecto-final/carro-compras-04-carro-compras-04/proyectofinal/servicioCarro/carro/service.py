from carro.serializers import CantidadSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import json



@api_view(['GET', 'POST'])
def actualizarCantidad(request, idProducto):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'POST':
        serializer = CantidadSerializer(data=request.data)
        if serializer.is_valid():

            url = f"http://127.0.0.1:8000/api/productos/{idProducto}/"

            r = requests.get(url, params=request.GET)

            r_data = r.json()
            cantidad = r_data.get('cantidadVendido')

            cantVendido=request.data.get('cantidadVendido') + cantidad

            payload = {
                "cantidadVendido": cantVendido
            }
            headers = {
                'Content-Type': 'application/json'
            }

            response = requests.request("PATCH", url, headers=headers, data=json.dumps(payload))

            #serializer.save()
            return Response(payload, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# request.data.get('cantidadVendido')