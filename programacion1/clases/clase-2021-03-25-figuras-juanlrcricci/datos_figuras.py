import math

class Circulo():
    def __init__(self, radio=0):
        self.radio = radio

    @property
    def radio(self):
        return self.__radio
    
    @radio.setter
    def radio(self, value):
        self.__radio = value


class Rectangulo():
    def __init__(self, base=0, altura=0):
        self.base = base
        self.altura = altura
    
    @property
    def base(self):
        return self.__base
    
    @base.setter
    def base(self, value):
        self.__base = value

    @property
    def altura(self):
        return self.__altura
    
    @altura.setter
    def altura(self, value):
        self.__altura = value

class Triangulo(): # equilatero
    def __init__(self, lado=0, altura=0):
        self.lado = lado
        self.altura = altura

    @property
    def lado(self):
        return self.__lado
    
    @lado.setter
    def lado(self, value):
        self.__lado = value

    @property
    def altura(self):
        return self.__altura
    
    @altura.setter
    def altura(self, value):
        value = (math.sqrt(3)*self.lado)/2
        self.__altura = value