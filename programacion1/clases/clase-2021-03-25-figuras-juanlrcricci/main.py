import operator
from operator import *
from contenedor import Contenedor
from datos_figuras import Circulo
from repositorios import Repositorios

if __name__ == '__main__':
    cont = Contenedor()
    repo = Repositorios()
    # circulos
    circ1 = cont.calculos_circulo(4)
    circ2 = cont.calculos_circulo(2)
    circ3 = cont.calculos_circulo(3)
    # rectangulos
    rect1 = cont.calculos_rectangulo(4, 2)
    rect2 = cont.calculos_rectangulo(3, 1)
    rect3 = cont.calculos_rectangulo(3, 4)
    # triangulos
    tria1 = cont.calculos_triangulo(2)
    tria2 = cont.calculos_triangulo(3)
    tria3 = cont.calculos_triangulo(4)
    # diccionario de figuras
    figuras = repo.figuras
    print('Figuras y sus caracteristicas: ')
    print(figuras)
    print('\nFiguras ordenadas por perimetro de mayor a menor: \n')
    print(sorted(figuras.items(), key=lambda x: x[1]['perimetro'], reverse=True))
    print('\nFiguras ordenadas por area de menor a mayor: \n')
    print(sorted(figuras.items(), key=lambda x: x[1]['area']))

    # escalando circulos
    cont.escalar_circulos(circ1.radio)
    cont.escalar_circulos(circ2.radio)
    cont.escalar_circulos(circ3.radio)
    # escalando rectangulos
    cont.escalar_rectangulos(rect1.base, rect1.altura)
    cont.escalar_rectangulos(rect2.base, rect2.altura)
    cont.escalar_rectangulos(rect3.base, rect3.altura)
    # escalando triangulos
    cont.escalar_triangulos(tria1.lado)
    cont.escalar_triangulos(tria2.lado)
    cont.escalar_triangulos(tria3.lado)
    print('\nFiguras escaladas un 50% mas grandes:\n')
    print(repo.figuras_escaladas)
