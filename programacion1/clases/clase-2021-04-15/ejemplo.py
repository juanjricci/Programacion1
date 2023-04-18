import json
import urllib.request

def main():
    print("Leyendo datos del archivo")
    # Forma 1
    with open('datos.json') as archivo_json:
        datos = json.load(archivo_json)
        print(datos)
    # Forma 2
    with open('datos.json') as archivo_json:
        contenido = archivo_json.read()
        datos = json.loads(contenido)
        print(datos)
    # Forma A
    dato_json = '{"nombre":"pepe", "apellido":"hongo"}'
    datos = json.loads(dato_json)

    datosweb = urllib.request.urlopen('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    datos = json.loads(datosweb.read())
    print(datos)
    print("Terminado")


if __name__ == '__main__':
    main()

