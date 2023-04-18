"""
1- Leer los datos desde https://www.dolarsi.com/api/api.php?type=valoresprincipales y:
1- buscar cual es la casa que tiene el valor de dolar mas caro para la venta y mostrar los siguientes datos de la casa:
    Nombre, agencia, valor compra, valor venta y variación
"""
import json
import urllib.request
from functools import total_ordering

class MiJson:
    def __init__(self, url):
        self.url = url
        datosweb = urllib.request.urlopen(url)
        self.datos = json.loads(datosweb.read())

class Casa:
    def __init__(self, compra, venta, agencia, nombre, variacion):
        self.compra = compra
        self.venta = venta
        self.agencia = agencia
        self.nombre = nombre
        self.variacion = variacion

    def __lt__(self, other):
        return self.venta < other.venta

    def __eq__(self, other):
        return self.venta == other.venta

    def to_string(self):
        return 'Casa: {} - agencia: {} - venta: {} - compra: {} - variacion: {}'\
            .format(self.nombre, self.agencia, self.venta, self.compra, self.variacion)

class CasaCambio:
    def __init__(self, datos_crudos):
        self.datos_crudos = datos_crudos
        self.datos = self.datos_crudos_a_casas()

    def datos_crudos_a_casas(self):
        datos = []
        for casa in self.datos_crudos.datos:
            nombre = ""
            compra = 0
            venta = 0
            agencia = ""
            variacion = 0
            if 'nombre' in casa['casa']:
                nombre = casa['casa']['nombre']
            if 'compra' in casa['casa']:
                if casa['casa']['compra'].replace("'", "").replace(',', '').isdigit():
                    compra = float(casa['casa']['compra'].replace("'", "").replace(',', '.'))
            if 'venta' in casa['casa']:
                if casa['casa']['venta'].replace("'", "").replace(',', '').isdigit():
                    venta = float(casa['casa']['venta'].replace("'", "").replace(',', '.'))
            if 'agencia' in casa['casa']:
                agencia = casa['casa']['agencia']
            if 'variacion' in casa['casa']:
                if casa['casa']['variacion'].replace("'", "").replace(',', '').isdigit():
                    variacion = float(casa['casa']['variacion'].replace("'", "").replace(',', '.'))
            nueva_casa = Casa(nombre=nombre, compra=compra, venta=venta, agencia=agencia, variacion=variacion)
            datos.append(nueva_casa)
        return datos

    def buscar_mas_caro(self):
        maximo = max(self.datos)
        return maximo




def main():
    yeison = MiJson('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    casas = CasaCambio(yeison)
    maximo = casas.buscar_mas_caro()
    print("El mas caro para la venta es: {}".format(maximo.to_string()))

if __name__ == '__main__':
    main()


