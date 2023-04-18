import math

class Circulo():
    def __init__(self, radio=0):
        self.radio = radio

    def perimetro(self):
        return math.pi * self.radio * self.radio

    def mostrar(self):
        print("Tipo: circulo - Radio: {} - Perimetro: {}".format(self.radio, self.perimetro()))

    def __eq__(self, other):
        return self.radio == other.radio

    def __lt__(self, other):
        return self.radio < other.radio


class Rectangulo():
    def __init__(self, lado_mayor=0, lado_menor=0):
        self.lado_mayor = lado_mayor
        self.lado_menor = lado_menor

    def perimetro(self):
        return 2*self.lado_menor+2*self.lado_mayor

    def mostrar(self):
        print("Tipo: rectangulo - Lado mayor: {} - Lado menor: {} - Perimetro: {}"
              .format(self.lado_mayor, self.lado_menor, self.perimetro()))

class Contenedor():
    def __init__(self):
        self.elementos = []

    def agregar(self, elemento):
        self.elementos.append(elemento)

    def mostrar(self):
        for elemento in self.elementos:
            print("perimetro: {}".format(elemento.perimetro()))

    def ordenar_mayor_a_menor(self):
        self.elementos.sort(key=lambda x: x.perimetro(), reverse=True)

    def ordenar_menor_a_mayor(self):
        self.elementos.sort(key=lambda x: x.perimetro(), reverse=False)

    def ordenar2(self):
        self.elementos = sorted(self.elementos)

def main1():
    c = Contenedor()
    c1 = Circulo(3)
    c2 = Circulo(2)
    c3 = Circulo(10)
    c.agregar(c1)
    c.agregar(c2)
    c.agregar(c3)
    print("Original")
    c.mostrar()
    print("Mayor a menor")
    c.ordenar_mayor_a_menor()
    c.mostrar()
    print("Menor a mayor")
    c.ordenar_menor_a_mayor()
    c.mostrar()

def main2():
    c = Contenedor()
    c1 = Circulo(3)
    c2 = Circulo(2)
    c3 = Circulo(10)
    c.agregar(c1)
    c.agregar(c2)
    c.agregar(c3)
    print("Original")
    c.mostrar()
    print("Menor a mayor")
    c.ordenar2()
    c.mostrar()

if __name__ == '__main__':
    main2()
