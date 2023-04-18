"""
Leer los datos del archivo JSON y mostrar la siguiente información:
1- Mostrar la lista de cines definidos
2- Mostrar por cine que películas se están proyectando
3- Mostrar el cine que mas entradas ha vendido (suma de entradas del cine)
4- Mostrar cual es la película que mas entradas ha vendido (sumando los cines)
5- Mostrar ordenado de mayor a menor en entradas vendidas por pelicula y por cine
"""














import json

class MiJson:
    def __init__(self, archivo):
        self.archivo = archivo
        with open(archivo) as archivo_json:
            self.datos = json.load(archivo_json)


class Cine:
    def __init__(self, id, nombre):
        self.id = id
        self.nombre = nombre

    def to_string(self):
        return 'Cine id: {} - Nombre: {}'.format(self.id, self.nombre)

class Cines:
    def __init__(self, diccionario_json):
        self.diccionario_json = diccionario_json

    def obtener_cines(self):
        cines = []
        for dato in self.diccionario_json.items():
            if dato[0].startswith("cine") and dato[0] != "cines":
                c = Cine(id=dato[0], nombre=dato[1])
                cines.append(c)
        return cines

    def mostar_cines(self):
        cines = self.obtener_cines()
        for cine in cines:
            print("Cine {} - nombre: {}".format(cine.id, cine.nombre))

    def cines_por_pelicula(self, pelicula):

        pass

class Pelicula:
    def __init__(self, id, nombre, cine, entradas):
        self.id = id
        self.nombre = nombre
        self.cine = cine
        self.entradas = entradas

    def to_string(self):
        return 'Pelicula id: {} - Nombre: {} - Cine: {} - Entradas vendidas: {}'\
            .format(self.id, self.nombre, self.cine, self.entradas)

class Peliculas:
    def __init__(self, diccionario_json):
        self.diccionario_json = diccionario_json

    def obtener_peliculas(self):
        peliculas = []
        for dato in self.diccionario_json.items():
            if dato[0].startswith("pelicula"):
                if isinstance(dato[1], dict):
                    p = Pelicula(id=dato[0], nombre=dato[1]['nombre'],
                                 cine=dato[1]['cine'], entradas=dato[1]['entradas vendidas'])
                    peliculas.append(p)
        return peliculas

    def obtener_nombre_peliculas_sin_repetir(self):
        peliculas = []
        lista_total_peliculas = self.obtener_peliculas()
        for pelicula in lista_total_peliculas:
            if pelicula.nombre not in peliculas:
                peliculas.append(pelicula.nombre)
        return peliculas

    def peliculas_por_cine(self, cine):
        peliculas = self.obtener_peliculas()
        resultado = []
        for pel in peliculas:
            if pel.cine == cine.nombre:
                resultado.append(pel)
        # o lo que es lo mismo
        resultado = [pel for pel in peliculas if pel.cine == cine.nombre]
        return resultado


def main():
    yeison = MiJson('datos.json')
    cines = Cines(yeison.datos)
    peliculas = Peliculas(yeison.datos)
    lista_cines = cines.obtener_cines()
    #lista_peliculas = peliculas.obtener_peliculas()

    print("Parte a: Mostrar la lista de cines definidos")
    cines.mostar_cines()

    print("Parte b: Mostrar por cine que películas se están proyectando")
    for cine in lista_cines:
        print(cine.to_string())
        lista_peliculas = peliculas.peliculas_por_cine(cine)
        for pelicula in lista_peliculas:
            print("--- {}".format(pelicula.to_string()))

    print("Parte c: Mostrar el cine que mas entradas ha vendido (suma de entradas del cine)")
    cine_venta = {}
    for cine in lista_cines:
        lista_peliculas = peliculas.peliculas_por_cine(cine)
        suma = 0
        for pel in lista_peliculas:
            suma += int(pel.entradas)
        # o podemos hacer
        suma = sum(int(pel.entradas) for pel in lista_peliculas)
        cine_venta[suma] = cine
    for entrada in sorted(cine_venta, reverse=True):
        print("Cine: {} entradas vendidas: {}".format(cine_venta[entrada].nombre, entrada))

    print("Parte d: Mostrar cual es la película que mas entradas ha vendido (sumando los cines)")
    peliculas_nombre = peliculas.obtener_nombre_peliculas_sin_repetir()
    peliculas_lista = peliculas.obtener_peliculas()
    entradas_vendidas = {}
    for peli in peliculas_nombre:
        lista_temp = [pelicula for pelicula in peliculas_lista if pelicula.nombre == peli]
        entradas = sum(int(pel.entradas) for pel in lista_temp)
        entradas_vendidas[entradas] = peli
    for entrada in sorted(entradas_vendidas, reverse=True):
        print("Pelicula {} - entradas vendidas: {}".format(entradas_vendidas[entrada], entrada))
    pass


if __name__ == '__main__':
    main()