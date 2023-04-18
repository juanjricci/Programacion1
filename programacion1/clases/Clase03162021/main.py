import json
import urllib.request


def main():
    print("Leyendo datos del archivo")
    # Forma 1
    with open('datos.json') as archivo_json:
        datos = json.load(archivo_json)
        # print(json.dumps(datos,indent=1))
        # 1. Mostrar la lista de cines definidos
        cine1 = datos['cine1']
        cine2 = datos['cine2']
        cine3 = datos['cine3']
        print(cine1)
        print(cine2)
        print(cine3)
        # 2. Mostrar por cine que películas se están proyectando
        print("\n", cine1, ": ")
        for key in datos:
            if 'nombre' in datos[key]:         
                if datos[key]['cine'] == cine1:
                    print(datos[key]['nombre'])
        print("\n", cine2, ": ")
        for key in datos:
            if 'nombre' in datos[key]:         
                if datos[key]['cine'] == cine2:
                    print(datos[key]['nombre'])
        print("\n", cine3, ": ")
        for key in datos:
            if 'nombre' in datos[key]:         
                if datos[key]['cine'] == cine3:
                    print(datos[key]['nombre'])
        # 3. Mostrar el cine que mas entradas ha vendido (suma de entradas del cine)
        # print("\n", cine1, ": ")
        total_cine1 = 0
        for key in datos:
            if 'nombre' in datos[key]:         
                if datos[key]['cine'] == cine1:
                    total_cine1 += int(datos[key]['entradas vendidas'])
        # print (total, "entradas vendidas")
        masventas = total_cine1
        mayorvendedor = cine1

        # print("\n", cine2, ": ")
        total_cine2 = 0
        for key in datos:
            if 'nombre' in datos[key]:         
                if datos[key]['cine'] == cine2:
                    total_cine2 += int(datos[key]['entradas vendidas'])
        # print (total, "entradas vendidas")
        if total_cine2 > masventas:
            masventas = total_cine2
            mayorvendedor = cine2

        # print("\n", cine3, ": ")
        total_cine3 = 0
        for key in datos:
            if 'nombre' in datos[key]:         
                if datos[key]['cine'] == cine3:
                    total_cine3 += int(datos[key]['entradas vendidas'])
        # print (total, "entradas vendidas")
        if total_cine3 > masventas:
            masventas = total_cine3
            mayorvendedor = cine3

        print ("\nEl cine que mas entradas vendio fue:", mayorvendedor, "con", masventas, "entradas vendidas")

        # 4. Mostrar cual es la película que mas entradas ha vendido (sumando los cines)
        # print("\nMad Max: ")
        entradas_madmax = 0
        for key in datos:
            if 'nombre' in datos[key]:
                if datos[key]['nombre'] == "Mad Max":
                    entradas_madmax += int(datos[key]['entradas vendidas'])
        # print (entradas_madmax, "entradas vendidas")
        masvendidas = entradas_madmax
        pelicula_masventas = "Mad Max"

        # print("\nMaximo riesgo: ")
        entradas_maximoriesgo = 0
        for key in datos:
            if 'nombre' in datos[key]:
                if datos[key]['nombre'] == "Maximo riesgo":
                    entradas_maximoriesgo += int(datos[key]['entradas vendidas'])
        # print (entradas_maximoriesgo, "entradas vendidas")
        if entradas_maximoriesgo > masvendidas:
            masvendidas = entradas_maximoriesgo
            pelicula_masventas = "Maximo riesgo"

        # print("\nMemoria letal: ")
        entradas_memorialetal = 0
        for key in datos:
            if 'nombre' in datos[key]:
                if datos[key]['nombre'] == "Memoria letal":
                    entradas_memorialetal += int(datos[key]['entradas vendidas'])
        # print (entradas_memorialetal, "entradas vendidas")
        if entradas_memorialetal > masvendidas:
            masvendidas = entradas_memorialetal
            pelicula_masventas = "Memoria letal"

        # print("\nMonster House: ")
        entradas_monsterhouse = 0
        for key in datos:
            if 'nombre' in datos[key]:
                if datos[key]['nombre'] == "Monster House":
                    entradas_monsterhouse += int(datos[key]['entradas vendidas'])
        # print (entradas_monsterhouse, "entradas vendidas")
        if entradas_monsterhouse > masvendidas:
            masvendidas = entradas_monsterhouse
            pelicula_masventas = "Monster House"

        # print("\nMortal Kombat: ")
        entradas_mortalkombat = 0
        for key in datos:
            if 'nombre' in datos[key]:
                if datos[key]['nombre'] == "Mortal Kombat":
                    entradas_mortalkombat += int(datos[key]['entradas vendidas'])
        # print (entradas_mortalkombat, "entradas vendidas")
        if entradas_mortalkombat > masvendidas:
            masvendidas = entradas_mortalkombat
            pelicula_masventas = "Mortal Kombat"
        
        print ("La pelicula que mas entradas vendio fue:", pelicula_masventas, "con", masvendidas, "entradas vendidas")

        # 5. Mostrar ordenado de mayor a menor en entradas vendidas por pelicula y por cine
        pelis = {}
        pelis["Mad Max"] = entradas_madmax
        pelis["Maximo riesgo"] = entradas_maximoriesgo
        pelis["Memoria letal"] = entradas_memorialetal
        pelis["Monster House"] = entradas_monsterhouse
        pelis["Mortal Kombat"] = entradas_mortalkombat
        sorted_values = sorted(pelis.values(), reverse=True)
        sorted_dict = {}
        for i in sorted_values:
            for k in pelis.keys():
                if pelis[k] == i:
                    sorted_dict[k] = pelis[k]
                    break
        print(sorted_dict)

        cines = {}
        cines["cinepolis"] = total_cine1
        cines["cinemark"] = total_cine2
        cines["cinemacenter"] = total_cine3
        sorted_values = sorted(cines.values(), reverse=True)
        sorted_dict = {}
        for i in sorted_values:
            for k in cines.keys():
                if cines[k] == i:
                    sorted_dict[k] = cines[k]
                    break
        print(sorted_dict)


    # Forma 2
    with open('datos.json') as archivo_json:
        contenido = archivo_json.read()
        datos = json.loads(contenido)
        # print(datos)
    # Forma A
    dato_json = '{"nombre":"pepe", "apellido":"hongo"}'
    datos = json.loads(dato_json)
    datosweb = urllib.request.urlopen('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    datos = json.loads(datosweb.read())
    # print(datos)
    print("Terminado")
if __name__ == '__main__':
    main()
