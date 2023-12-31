const categorias = ["Carreras a pie", "Ciclismo", "BTT", "Mushing"];

let carreras_local;
let resultados_busqueda;
//let enlace_inscripciones;
let isClicked = [false, false, false, false, false, false, false, false];

// VISTAS
const indexView = (carreras, seccion) => {
	let i = 0;
	let view = "";
	//Discrimino entre servicios y el resto, si hubiese que hacer más categorías separar en if / else if
	let show = seccion == "servicios" ? "showServicios" : "show";
	view += `<div class=gridGeneral>`;
	while (i < carreras.length) {
		view += `
        <div class="${show} carrera "  data-my-id="${i}">
        
          <div class="carrera-img">
               <img data-my-id="${i}" src="${
			carreras[i].miniatura
		}" onerror="this.src='assets/placeholder.png'" class="${show}"/>
          </div>
          <div class="title" >
            <div class="${show}" data-my-id="${i}">
            ${carreras[i].titulo || "<em>Sin título</em>"}
            </div>
          </div>
          <div class="subtitle">
            <div class="${show}" data-my-id="${i}">
            ${carreras[i].fecha || ""}
            </div>
          </div>
          </div>\n
          `;
		i = i + 1;
	}
	view += `</div>`;
	return view;
};

/*const editView = (i, carrera) => {

  /*<div class="field">
  Fecha <br>
  <input  type="text" id="fecha" placeholder="Fecha" 
  value="${carrera.fecha}">
  </div>
  return `<h2>Editar Película </h2>
        <div class="field">
        Título <br>
        <input  type="text" id="titulo" placeholder="Título" 
                value="${carrera.titulo}">
        </div>
        
        </div>
        <div class="field">
        Miniatura <br>
        <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                value="${carrera.miniatura}">
        </div>
        <div class="actionsEvento">
            <button class="update" data-my-id="${i}">
                Actualizar
            </button>
            <button class="index">
                Volver
            </button></div>
       `;
};*/

const showView = (carrera) => {
	view = `
  <div class="detalleevento">
  <div class="tituloDetalle">${carrera.titulo}</div>
  <div class="contenedorDetalle">
    <img id="miniaturaShow" src=${carrera.miniatura}></img>

    <div class="contentTitle">
             <div class="elementoTitulo">Fecha:</div>
             <div class="elementoTitulo">Categoría:</div>
             <div class="elementoTitulo">Hora: </div>
             <div class="elementoTitulo">Distancia: </div>             
             <div class="elementoTitulo">Organizador: </div>
             
    </div>

    <div class="contentDescription">
      <div class="elementoDescripcion">${formatDate(
				parseDate(carrera.fecha)
			)}</div>
      <div class="elementoDescripcion">${carrera.categoria}</div>
      <div class="elementoDescripcion">${
				carrera.hora || "Según categoría"
			}</div>
      <div class="elementoDescripcion">${
				carrera.distancia || "Según categoría"
			}</div>
      <div class="elementoDescripcion">${carrera.organizador || ""}</div>
      
    </div>
    <div class="actionsEvento">`;

	/*if (carrera.inscripciones != undefined) {
		enlace_inscripciones = carrera.inscripciones;
		view += `<button class="inscripciones botondetallecarrera">Inscripciones</button>`;
	}*/
	for (let j = 0; j < carrera.botones.length; j++) {
		view += `<a href=${carrera.botones[j].archivo} target=_blank><button class=botondetallecarrera>${carrera.botones[j].titulo}</button></a> `;
	}

	view += `</div>`; //Cierre actionsEvento
	view += `</div>`; //Cierre contenedorDetalle
	view += `</div>`; //Cierre detalleevento

	return view;
};

const showServiciosView = (carrera) => {
	view = `
  <div class="detalleServicios">

  <div class="tituloDetalle">${carrera.titulo}</div>
  <div class="contenedorDetalleServicios">
  <img id="miniaturaShowServicios" src=${carrera.miniatura}></img>
  <div class="descServicios">

    <!--<h2>Descripcion 1</h2>

    <h2>Descripcion 2</h2>
    <p></p>
    <p>Introducir descripción en campo de servicios.js</p>
    <p>Contenido de archivo a continuación</p>-->
    ${carrera.descripcion}
  </div></div></div>`;

	return view;
};

/*const inscripcionesView = (enlace_inscripciones) => {
	view = "";
	view += `<object class="htmlinscripciones" type="text/html" data="${enlace_inscripciones}" ></object>`;
	//view += `<iframe class="htmlinscripciones" src="${enlace_inscripciones}"frameborder="0"></iframe>`;

	return view;
};*/



const menuView = () => {
	view = "";

	view += `<ul class="listabotones">
            <li class="home" onmouseover="ocultar([3,5,7])">
              <p class="home">inicio </p>
            </li>

            <li class="servicios" onmouseover="ocultar([3,5,7])">
            <p class="servicios">servicios</p>
            </li>

          

            <!--<li  onmouseover="ver(3), ver(5), ver(7)" onclick="clickMenu(3)">-->
            <!--<li onmouseover="ver(3), ver(5), ver(7)" >-->
            <li onmouseover="ver([3,5,7])" >

                <p onmouseout="ocultar([3,5,7])" onclick="clickMenu([3, 5, 7])">Blog</p>
                <div  id="subseccion3"  onmouseover="ver([4]), ocultar(6)" onmouseout="ocultar([3,4,5,6,7])">
                  <button class="botonmenu" onclick="clickMenu([4])" >por año</button>
                </div>
                <div id="subseccion4" onmouseover="ver([3,4]), ocultar(6)" onmouseout="ocultar([3,4,5,6,7])" >
                  <ul class="listasubapartados" onclick="ocultar([3,4,5,6,7]), reset()">
                  <button class="searchDate botonmenu" data-my-id="${2023}" >2023</button>
                  <button class="searchDate botonmenu" data-my-id="${2022}" >2022</button>
                  <button class="searchDate botonmenu" data-my-id="${2021}" >2021</button>
                  <button class="searchDate botonmenu" data-my-id="${2020}" >2020</button>
                  <button class="searchDate botonmenu" data-my-id="${2019}" >2019</button>
                  <button class="searchDate botonmenu" data-my-id="${2018}" >2018</button>
                  <button class="searchDate botonmenu" data-my-id="${2017}" >2017</button>
                  <button class="searchDate botonmenu" data-my-id="${2016}" >2016</button>
                  <button class="searchDate botonmenu" data-my-id="${2015}" >2015</button>
                  </ul> 
                </div>
                <div id="subseccion5" onmouseover="ver([6]), ocultar(4)", onmouseout="ocultar([3,4,5,6,7])" >
                  <button class="botonmenu" onclick="clickMenu([6])">por categoría</button>
                </div>
                <div id="subseccion6" onmouseover="ver([5,6])" onmouseout="ocultar([3,4,5,6,7])" >
                  <ul class="listasubapartados" onclick="ocultar([3,4,5,6,7]), reset()">
                    <button class="searchCat botonmenu" data-my-id="${0}">Caza</button>
                    <button class="searchCat botonmenu" data-my-id="${1}">Mascotas</button>
                    <button class="searchCat botonmenu" data-my-id="${2}">BTT</button>
                    <button class="searchCat botonmenu" data-my-id="${3}">mushing</button>
                  </ul>
                </div>
                <div id="subseccion7" onmouseover="ocultar(6)" onmouseout="ocultar([3,4,5,6,7])">
                  <button class="reset botonmenu" onclick="ocultar([3,4,5,6,7]), reset()">Listado Completo</button>
                </div>
              
               </li>
               
            <li class="contacto" onmouseover="ocultar([3,5,7])">
              <p class="contacto">contacto</p>
            </li>
            
          </ul>`;

	return view;
};

const contactoView = () => {
	view = "";

	view += `
  <div class="formulariocontacto">
    
    <h1 class="h1contacto">Formulario de contacto</h1>

    <img class="miniaturaContacto" src ="img/contacto/adrian.jfif">
    <img class="miniaturaContacto" src ="img/contacto/raul.jfif">

  
    <p>Si quiere ponerse en contacto con nosotros hágalo a través de cualquiera de estos medios:
    teléfono, e-mail o rellene el formulario que tiene a continuación.</p>
    <p>**Buscar cómo agregarlos evitando el spam**</p>
    <h3>Adrián: 666666666</h3>
    <h3>Raúl: 699999999</h3>
    <h3>email: arvelgps@666666666</h3>

  </div>`;

	return view;
};

const homeView = () => {
  view="";

  view+=`<div class="indexblock" id="homecontent">
  
  <p>En el vasto y emocionante mundo de la caza, los lazos entre un cazador y su fiel compañero de cuatro patas son inquebrantables. La lealtad de un perro en el campo es inigualable, y juntos, cazador y canino, forjan una relación que va más allá de palabras. Pero, en el corazón de esta pasión, se esconde un temor que persigue a todo cazador: la pérdida de su inseparable amigo. La idea de perder a un perro en medio de una jornada de caza es un dolor que solo aquellos que lo han vivido pueden comprender.</p>

  <p>En ARVEL, entendemos el profundo vínculo que une a un cazador con su perro. Compartimos la pasión por la caza y la admiración por estos leales compañeros, y es por eso que hemos dedicado nuestros esfuerzos a brindar una solución que alivia el corazón de todo cazador: nuestros collares de localización GPS para perros.
  
  <p>Nuestra misión es asegurar que ningún cazador tenga que experimentar el angustioso sentimiento de perder a su fiel amigo en medio de una cacería. Ofrecemos una gama de collares de localización de vanguardia que utilizan tecnología GPS de última generación para rastrear la ubicación de su perro en tiempo real. Estos dispositivos, diseñados específicamente para el ambiente exigente de la caza, son robustos, resistentes al agua y confiables en las condiciones más extremas.
  
  <p>Más que un producto, nuestros collares de localización GPS representan la tranquilidad y seguridad de saber que su perro está siempre a su lado, sin importar lo lejos que lo lleve la caza. Cuando un perro se extravía, nuestro sistema de seguimiento le permite recuperarlo rápidamente, evitando que se convierta en una triste estadística de compañeros perdidos en el campo.
  
  <!--<p>En ARVEL, compartimos su pasión por la caza y su amor por los perros. Estamos comprometidos a ayudar a preservar la relación especial que comparte con su compañero canino y a evitar el dolor de una pérdida innecesaria. Únase a nosotros en la búsqueda de la seguridad y la tranquilidad, y déjenos ser su aliado en esta apasionante aventura cinegética.-->
  
  <p>Descubra nuestros collares de localización GPS y permita que su próximo viaje de caza sea no solo emocionante, sino también un reencuentro con su mejor amigo de cuatro patas. En ARVEL sabemos que en la caza, la amistad y la seguridad son prioridades.</p>

  <p><img class="homeimg" src="img/index/1.jpg"></p>


</div>`

  /*fetch('home_view.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('main').innerHTML = data;
      });
*/

	return view;
};

// CONTROLADORES
/*const indexContr = () => {
	carreras_local = carreras;
	resetContr(carreras_local);
};*/

const homeContr = () => {
	document.getElementById("main").innerHTML = homeView();
};

/*const proximosContr = () => {
	//Igualo la lista de resultados búsqueda al archivo de próximos eventos
	resultados_busqueda = proximos;
	document.getElementById("main").innerHTML = indexView(proximos, "proximos");
};*/

const serviciosContr = () => {
	resultados_busqueda = servicios;
	document.getElementById("main").innerHTML = indexView(servicios, "servicios");
};

const showContr = (i) => {
	let carrera = resultados_busqueda[i];
	document.getElementById("main").innerHTML = showView(carrera);
};

const showServiciosContr = (i) => {
	let carrera = resultados_busqueda[i];
	document.getElementById("main").innerHTML = showServiciosView(carrera);
};

const resetContr = (carreras) => {
	resultados_busqueda = carreras;
	document.getElementById("main").innerHTML = indexView(
		resultados_busqueda,
		"clasificaciones"
	);
};

const searchDateContr = (year) => {
	let resultado = [];

	for (i = 0; i < carreras.length; i++) {
		if (parseDate(carreras[i].fecha).getFullYear() == year) {
			//Encontrado
			resultado.push(carreras[i]);
		}
	}
	resultados_busqueda = resultado;

	document.getElementById("main").innerHTML = indexView(
		resultado,
		"clasifDate"
	);
};

const searchCatContr = (cat) => {
	let resultado = [];
	for (i = 0; i < carreras.length; i++) {
		if (carreras[i].categoria == categorias[cat]) {
			//Encontrado
			resultado.push(carreras[i]);
		}
	}
	resultados_busqueda = resultado;
	document.getElementById("main").innerHTML = indexView(resultado, "clasifCat");
};

const menuContr = () => {
	document.getElementById("navegador").innerHTML = menuView();
};

const contactoContr = () => {
	document.getElementById("main").innerHTML = contactoView();
};

//CONTROLADORES SIN USAR
/*const inscripcionesContr = () => {
	document.getElementById(
		"main"
		//).innerHTML = `<object class="htmlinscripciones" type="text/html" data="${enlace_inscripciones}" ></object>`;
	).innerHTML = inscripcionesView(enlace_inscripciones);
};*/

/*const createContr = () => {
  let mis_carreras = JSON.parse(localStorage.mis_carreras);

  mis_carreras.push({
    titulo: document.getElementById("titulo").value,
    //fecha: document.getElementById("fecha").value,
    miniatura: document.getElementById("miniatura").value,
  });
  localStorage.mis_carreras = JSON.stringify(mis_carreras);
  //mis_peliculas_iniciales.push(JSON.stringify(mis_peliculas))

  indexContr();
};*/

/*const editContr = (i) => {
  let carrera = JSON.parse(localStorage.mis_carreras)[i];
  document.getElementById("main").innerHTML = editView(i, carrera);
};*/

/*const updateContr = (i) => {
  let mis_carreras = JSON.parse(localStorage.mis_carreras);
  mis_carreras[i].titulo = document.getElementById("titulo").value;
  //mis_carreras[i].fecha = document.getElementById("fecha").value;
  mis_carreras[i].miniatura = document.getElementById("miniatura").value;
  localStorage.mis_carreras = JSON.stringify(mis_carreras);
  indexContr();
};*/

/*const deleteContr = (i) => {
  let mis_carreras = JSON.parse(localStorage.mis_carreras);

  if (
    confirm(
      `¿Está seguro de que desea borrar la película ${mis_carreras[i].titulo}?`
    )
  ) {
    mis_carreras.splice(i, 1);
    localStorage.mis_carreras = JSON.stringify(mis_carreras);
  }
  indexContr();

};*/

// Inicialización
document.addEventListener("DOMContentLoaded", homeContr);
document.addEventListener("DOMContentLoaded", menuContr);

// ROUTER de eventos
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener("click", (ev) => {
	if (matchEvent(ev, ".reset")) resetContr(carreras);
	//else if (matchEvent(ev, ".proximos")) proximosContr();
	else if (matchEvent(ev, ".servicios")) serviciosContr();
	else if (matchEvent(ev, ".show")) showContr(myId(ev));
	else if (matchEvent(ev, ".showServicios")) showServiciosContr(myId(ev));
	else if (matchEvent(ev, ".searchDate")) searchDateContr(myId(ev));
	else if (matchEvent(ev, ".searchCat")) searchCatContr(myId(ev));
	else if (matchEvent(ev, ".contacto")) contactoContr();
	//else if (matchEvent(ev, ".inscripciones")) inscripcionesContr();
  else if (matchEvent(ev, ".home")) homeContr();
  //else if (matchEvent(ev, ".proximos")) homeContr();

	//Controladores no usados en esta versión
	//if (matchEvent(ev, ".index")) indexContr();
	//else if (matchEvent(ev, ".create")) createContr();
	//else if (matchEvent(ev, ".delete")) deleteContr(myId(ev));
	//else if (matchEvent(ev, ".edit")) editContr(myId(ev));
	//else if (matchEvent(ev, ".update")) updateContr(myId(ev));
});

//Formateo de fechas
const formatDate = (current_datetime) => {
	const months = [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];
	let formatted_date =
		current_datetime.getDate() +
		" de " +
		months[current_datetime.getMonth()] +
		" de " +
		current_datetime.getFullYear();
	return formatted_date;
};

function parseDate(str) {
	//var m = str.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
	//Formato dd/mm/aaaa o dd-mm-aaaa
	var m = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
	return m ? new Date(m[3], m[2] - 1, m[1]) : null;
}

/*MENÚ DESPLEGABLE*/
//Se recorre la lista de índices y se muestra en pantalla
function ver(lista) {
	for (i in lista) {
		document.getElementById("subseccion" + lista[i]).style.display = "block";
	}
}
//Se recorre la lista de índices y se oculta
function ocultar(lista) {
	for (i in lista) {
		document.getElementById("subseccion" + lista[i]).style.display = "none";
	}
}
//Resetea los booleanos para mostrar/ocultar los botones del menú
function reset() {
	for (i in isClicked) {
		isClicked[i] = false;
	}
}
//Función que se activa al hacer click en un menú
function clickMenu(indiceMenus) {
	for (i in indiceMenus) {
		//Al hacer click, invierte el estado del booleano
		isClicked[indiceMenus[i]] = !isClicked[indiceMenus[i]];
		//Dependiendo del booleano isClicked, se muestra/oculta el botón corrrespondiente
		if (isClicked[indiceMenus[i]]) {
			ver(indiceMenus);
		} else {
			ocultar(indiceMenus);
		}
	}
}
