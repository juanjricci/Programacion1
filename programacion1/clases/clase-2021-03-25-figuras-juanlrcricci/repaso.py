# una clase es una plantilla
# esta compuesta por atributos y metodos
# atiubutos: valores privados
# metodos: acciones realizadas sobre los atributos
# los atributos se definen en el constructor de la clase
# instanciar es dar existencia a un objeto de la clase
class Persona():
    def __init__(self, apellido='', nombre='', edad=70): # contructor
        self.apellido = apellido
        self.nombre = nombre
        self.edad = edad

    def __str__(self):
        return self.apellido + ', ' + self.nombre + '(' + str(self.edad) + ')'

    @property # me da el getter y convierte los atributos en funciones
    def apellido(self):
        return self.__apellido # con doble _ me muestra tmb la clase a la que pertenece el atributo
    
    @apellido.setter
    def apellido(self, value):
        self.__apellido = value

    @property
    def nombre(self):
        return self.__nombre
    
    @nombre.setter
    def nombre(self, value):
        self.__nombre = value

    @property
    def edad(self):
        return self.__edad
    
    @edad.setter # puedo definir una restriccion
    def edad(self, value):
        if value < 18:
            raise ValueError('Edad no permitida')
        self.__edad = value

if __name__ == '__main__':
    pers1 = Persona('Ricci', 'Juan', 23) # aca estoy instanciando un objeto de la clase persona
    print(pers1.__dict__)

    pers2 = Persona(nombre='Persona', edad=17)
    pers2.apellido = 'Otra'
    # pers2.nombre = 'Persona'
    print(pers2) # me va a devolver lo del __str__