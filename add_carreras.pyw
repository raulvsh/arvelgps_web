from cgitb import text
from datetime import datetime
from email.policy import default
import tkinter as tk
from tkinter import *
import shutil


OptionList = [
    "Carreras a pie",
    "Ciclismo",
    "BTT",
    "Mushing"
]

titulos = ['Categoría', 'Título', 'Fecha', 'Hora',
           'Distancia', 'Organizador', 'Miniatura']


root = tk.Tk()
root.geometry("800x700")  # Tamaño por defecto
root.title("Añadir Clasificaciones RS-Sport")  # Titulo de ventana
root.iconbitmap("img/assets/RS_logo.ico")
# root.config(background="aliceblue")
"""entry = Entry()
entry.place(x=50, y=50)"""
# Esta segunda caja de texto no puede recibir el foco
# vía la tecla Tab.
"""entry2 = Entry(takefocus=False)
entry2.place(x=50, y=150)"""


"""print(entry.get())
entry.insert(0, "Hola mundo!")
entry.place(x=50, y=50)
button = Button(text="Obtener texto", command=lambda: print(entry.get()))
button.place(x=50, y=100)"""

entries = []
i = 0

categoriaResultado = StringVar()


def draw_categories():
    for i, titulo in enumerate(titulos):
        """entry = Entry()
        entry.place(x=50, y=50)
        button = Button(text="Obtener texto", command=print(entry.get()))"""

        label = Label(root, text=titulos[i])
        label.grid(column=0, row=i+2)
        if(titulo != "Categoría"):
            entry = Entry(root, width=50)
            entry.grid(column=1, row=i+2)

        else:
            categoriaResultado.set(OptionList[0])
            menu = OptionMenu(root, categoriaResultado, *OptionList)
            menu.config(indicatoron=False,)

            menu.grid(column=1, row=i+2)
            entry = Entry(textvariable=categoriaResultado)
        entries.append(entry)


def draw_buttons(num):
    # label=Label(root)
    # label.grid(column=2,row=i+2)
    for j in range(int(num)):
        label1 = Label(root, text="Título botón " + str(j+1))
        label1.grid(column=0, row=2*j+9)
        entry1 = Entry(root, width=50)
        entry1.grid(column=1, row=2*j+9)
        entries.append(entry1)

        label2 = Label(root, text="Link botón " + str(j+1))
        label2.grid(column=0, row=2*j+10)
        entry2 = Entry(root, width=50)
        entry2.grid(column=1, row=2*j+10)
        entries.append(entry2)


def print_all(entries):
    for i, entry in enumerate(entries):
        print("I: " + str(i) + ". Entrada: " + entry.get())


def draw_final_button():
    button = Button(text="Añadir Clasificaciones Evento",
                    command=lambda: lectura_escritura())
    button.grid(column=1, row=20)


def draw_instructions():
    label = Label(root, text="\nFecha: dd/mm/aaaa", justify=LEFT)
    label.grid(column=0, row=22, columnspan=1)
    label = Label(root, text="Miniatura: guardar imagen en su carpeta correspondiente, copiar solo nombre: image.jpg.\nNo usar ñ ni espacios.\n", justify=LEFT)
    label.grid(column=0, row=23, columnspan=2)
    label = Label(
        root, text="Link: escribir link completo, sea de PDF o web.\n Por ejemplo: clasificaciones/clasificacionesBTT2022.pdf, http://www.ogromaraton.com", justify=LEFT)
    label.grid(column=0, row=24, columnspan=2)


def start_app():
    draw_categories()
    draw_buttons(entradaNumBotones.get())
    draw_final_button()
    draw_instructions()


def lectura_escritura():
    print_all(entries)
    #print("lectura y escritura")
    mensaje = leer_archivo()
    mensaje = add_race(mensaje)
    guardar_archivo(mensaje)
    # copiar_img()
    label = Label(root, text="\nEvento Añadido", justify=LEFT)
    label.grid(column=3, row=20, columnspan=1)


def copiar_img():
    year = parse_date(entries[2].get())
    # descomentar para mover
    shutil.move(entries[6].get(), "img/"+year+"/"+entries[6].get())
    #print("año" + parse_date(entries[1].get()))


def parse_date(date):
    date_string = ""
    date_string = datetime.strptime(date, "%d/%m/%Y")
    return str(date_string.year)
    """m = str.find(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    alert("año " + m[3] + " mes (resto uno) " + (m[2] - 1) + " dia " +m[1] )
    alert("m completo " + m)
    alert ("fecha " +  Date(m[3], m[2] - 1, m[1]))
    return (m) ? new Date(m[3], m[2] - 1, m[1]) : null;"""


def leer_archivo():
    fichero = open('carreras.js', 'r', encoding="utf8")
    mensaje = ""
    i = 0
    for i, line in enumerate(fichero):
        # Elimino la primera línea
        if(i >= 1):
            mensaje += line
    fichero.close()
    # print(mensaje)
    return mensaje


def add_race(mensaje):
    year = parse_date(entries[2].get())

    #print("añadir carrera " + tituloResultado.get())
    #print("carreras = [\n\n" + "{\n\ttitulo: " + "\"" + tituloResultado.get() + "\"" + "}\n"+ mensaje)
    # return ("carreras = [\n\n" + "{\ntitulo: " + '"{tituloResultado.get()}"' + "}\n"+ mensaje)
    textoCompleto = ""
    textoCompleto += "carreras = [\n\n" + "{\n"
    """textoCompleto += "\ttitulo: " + "\"" + entries[0].get() + "\",\n"
    textoCompleto += "\tfecha: " + "\"" + entries[1].get() + "\",\n"
    textoCompleto += "\tcategoria: " + "\"" + entries[2].get() + "\",\n"
    textoCompleto += "\tminiatura: " + "\"img/" +year+"/" + entries[3].get() + "\",\n"""
    textoCompleto += "\ttitulo: " + "\"" + entries[1].get() + "\",\n"
    textoCompleto += "\tfecha: " + "\"" + entries[2].get() + "\",\n"
    textoCompleto += "\tcategoria: " + "\"" + entries[0].get() + "\",\n"
    textoCompleto += "\thora: " + "\"" + entries[3].get() + "\",\n"
    textoCompleto += "\tdistancia: " + "\"" + entries[4].get() + "\",\n"
    textoCompleto += "\torganizador: " + "\"" + entries[5].get() + "\",\n"
    textoCompleto += "\tminiatura: " + "\"img/" + \
        year+"/" + entries[6].get() + "\",\n"

    textoCompleto += "\tbotones:\n"+"\t\t[\n"

    for j in range(int(entradaNumBotones.get())):
        textoCompleto += "\t\t\t{\n"
        textoCompleto += "\t\t\t\ttitulo: \"" + entries[2*j+7].get() + "\",\n"
        textoCompleto += "\t\t\t\tarchivo: \"" + entries[2*j+8].get() + "\",\n"

        textoCompleto += "\t\t\t},\n"

        """label1=Label(root, text="Título botón " + str(j+1))
        label1.grid(column=0,row=2*j+6)
        entry1 = Entry(root, width=50)
        entry1.grid(column=1,row=2*j+6)
        entries.append(entry1)

        label2=Label(root, text="Link botón " + str(j+1))
        label2.grid(column=0,row=2*j+7)
        entry2 = Entry(root, width=50)
        entry2.grid(column=1,row=2*j+7)
        entries.append(entry2) """
    textoCompleto += "\n\t\t],"

    #textoCompleto+="\tbotones: " + "\"" + botonesResultado.get() + "\",\n"

    textoCompleto += "\n},\n"
    textoCompleto += mensaje

    # print(textoCompleto)
    return textoCompleto


def guardar_archivo(mensaje):
    fichero = open('carreras.js', 'w', encoding="utf8")
    fichero.write(mensaje)


labelCarreras = Label(root, text="CLASIFICACIONES\n\n\n",
                      font=('courier', 15, 'bold'))
labelCarreras.grid(column=0, row=0)
labelNumBotones = Label(root, text="Introduce el número de botones")
labelNumBotones.grid(column=0, row=0)

entradaNumBotones = Entry()
entradaNumBotones.grid(column=1, row=0)

#button = Button(text="Aceptar", command=lambda: draw_categories(entradaNumBotones.get()))
button = Button(text="Aceptar", command=lambda: start_app())
button.grid(column=2, row=0)


#button.place(x=50, y=100)


root.mainloop()
