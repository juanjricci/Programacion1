from datos_figuras import Circulo
from datos_figuras import Rectangulo
from datos_figuras import Triangulo
from repositorios import Repositorios
import math

class Contenedor():

# CIRCULOS

    def perimetro_circulo(self, radio):
        # perimetro = 2*pi*r
        perimetro = 2*math.pi*radio
        return perimetro

    def area_circulo(self, radio):
        # area = pi * r^2
        area = math.pi*radio**2
        return area
    
    def calculos_circulo(self, radio):
        circ = Circulo(radio)
        perimetro = self.perimetro_circulo(radio)
        area = self.area_circulo(radio)
        lastKey = -1
        for key in Repositorios.figuras:
            lastKey = key
        id_new = int(lastKey) + 1
        Repositorios.figuras[id_new] = circ.__dict__
        Repositorios.figuras[id_new]["perimetro"] = perimetro
        Repositorios.figuras[id_new]["area"] = area
        return circ

# RECTANGULOS

    def perimetro_rectangulo(self, base, altura):
        # perimetro = 2*base + 2*altura
        perimetro = 2*base + 2*altura
        return perimetro

    def area_rectangulo(self, base, altura):
        # area = base * altura
        area = base*altura
        return area

    def calculos_rectangulo(self, base, altura):
        rect = Rectangulo(base, altura)
        perimetro = self.perimetro_rectangulo(base, altura)
        area = self.area_rectangulo(base, altura)
        lastKey = -1
        for key in Repositorios.figuras:
            lastKey = key
        id_new = int(lastKey) + 1
        Repositorios.figuras[id_new] = rect.__dict__
        Repositorios.figuras[id_new]["perimetro"] = perimetro
        Repositorios.figuras[id_new]["area"] = area
        return rect

# TRIANGULOS EQUILATEROS

    def perimetro_triangulo(self, lado):
        # perimetro = 3*lado
        perimetro = 3*lado
        return perimetro

    def area_triangulo(self, lado):
        # area = (base*altura)/2
        altura = (math.sqrt(3)*lado)/2
        area = (lado*altura)/2
        return area

    def calculos_triangulo(self, lado):
        tria = Triangulo(lado)
        perimetro = self.perimetro_triangulo(lado)
        area = self.area_triangulo(lado)
        lastKey = -1
        for key in Repositorios.figuras:
            lastKey = key
        id_new = int(lastKey) + 1
        Repositorios.figuras[id_new] = tria.__dict__
        Repositorios.figuras[id_new]["perimetro"] = perimetro
        Repositorios.figuras[id_new]["area"] = area
        return tria

    def escalar_circulos(self, radio):
        new_radio = radio + radio/2
        circ = Circulo(new_radio)
        perimetro = self.perimetro_circulo(new_radio)
        area = self.area_circulo(new_radio)
        lastKey = -1
        for key in Repositorios.figuras_escaladas:
            lastKey = key
        id_new = int(lastKey) + 1
        Repositorios.figuras_escaladas[id_new] = circ.__dict__
        Repositorios.figuras_escaladas[id_new]["perimetro"] = perimetro
        Repositorios.figuras_escaladas[id_new]["area"] = area

    def escalar_rectangulos(self, base, altura):
        new_base = base + base/2
        new_altura = altura + altura/2
        rect = Rectangulo(new_base, new_altura)
        perimetro = self.perimetro_rectangulo(new_base, new_altura)
        area = self.area_rectangulo(new_base, new_altura)
        lastKey = -1
        for key in Repositorios.figuras_escaladas:
            lastKey = key
        id_new = int(lastKey) + 1
        Repositorios.figuras_escaladas[id_new] = rect.__dict__
        Repositorios.figuras_escaladas[id_new]["perimetro"] = perimetro
        Repositorios.figuras_escaladas[id_new]["area"] = area

    def escalar_triangulos(self, lado):
        new_lado = lado + lado/2
        tria = Triangulo(new_lado)
        perimetro = self.perimetro_triangulo(new_lado)
        area = self.area_triangulo(new_lado)
        lastKey = -1
        for key in Repositorios.figuras_escaladas:
            lastKey = key
        id_new = int(lastKey) + 1
        Repositorios.figuras_escaladas[id_new] = tria.__dict__
        Repositorios.figuras_escaladas[id_new]["perimetro"] = perimetro
        Repositorios.figuras_escaladas[id_new]["area"] = area