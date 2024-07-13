//Definimos las variables de ámbito general:
var contenedorTareas;//variable para la lista donde se mostrarán las tareas
var inputText;//variable para el campo de texto de nuevas tareas
var tareasArray = [];//Variable que almacenará las tareas


//Constructor de objeto tarea (guardaremos en localStorage como JSON):
function Tarea(numero, texto, check){
    this.numero = numero;
    this.texto = texto;
    this.check = check;
}

//Esta función se cumple nada más cargar el DOM de la página
document.addEventListener("DOMContentLoaded", () => {
    //Una vez ha cargado la página, referenciamos los elementos a cada variable global:
    contenedorTareas = document.getElementById("contenedorTareas");
    inputText = document.getElementById("tareaNueva");
    inputText.value = "";//vaciamos el texto de nueva tarea
    CargarTareas();//Comprobamos si hay tareas previas
})

//funcion que mira si hay tareas en localStorage y las obtiene, en su caso
function CargarTareas() {
    //recuperamos cada clave de localStorage y la guardamos en "tareasArray"
    tareasArray = [];
    for (let i = 0; i < localStorage.length; i++){
        //Las claves tienen la forma "tarea--n", donde n empieza en 1
        let tareaComoCadena = localStorage.getItem("tarea--" + (i + 1));
        let tareaJava = JSON.parse(tareaComoCadena);//Convertimos de JSON a java
        tareasArray.push(tareaJava);//Almacenamos las tareas en una lista
    }
    //Escribimos las tareas de tareasArray en la lista HTML (si hay alguna)
    if(tareasArray.length > 0){
        MuestraTareas();
    }
}


//funcion que muestra las tareasArray en la lista HTML
function MuestraTareas(){
    VaciarTareas_li();//Eliminamos las tareas de la lista HTML (si hay alguna)
    //Para cada tarea almacenada:
    for(let i = 0; i < tareasArray.length; i++){
        let li = document.createElement("li");//Creamos un elemento li (list item) en el DOM
        li.innerHTML = tareasArray[i].texto;//Le damos el contenido de la tarea
        li.classList.add("tarea");//Le añadimos la clase tarea
        li.id = "tarea--" + tareasArray[i].numero;//Le asignamos como id "tarea--" y el numero propio

        //Creamos una imagen para poder eliminar tareas
        let imgClose = document.createElement("img");
        imgClose.src = "images/close.png";//Enlazamos con nuestra imagen icono
        imgClose.classList.add("close");//Añadimos la clase "close"
        imgClose.id = "close--" + i;//Añadimos un id

        //Añadimos el eventHandler de eliminar la tarea al hacer clic sobre ella
        imgClose.addEventListener("click", (e) => {
            if(e.target.className == "close"){
                e.target.parentElement.remove();//Elimino el li de esta tarea
                tareasArray.splice(i, 1);//Elimino 1 elemento a partir de la posicion i
                GuardarTareas();
            }
        }, false);//Aunque es la opción por defecto, ponemos false para remarcar el burbujeo
                //porque no queremos hacer check sobre la tarea si vamos a eliminarla


        //Creamos una imagen para poder marcar la tarea como completada
        let imgCheck = document.createElement("img");
        imgCheck.classList.add("checkIcon");//Añadimos la clase "checkIcon"
        imgCheck.id = "check--" + i;//Añadimos un id
        if(tareasArray[i].check == true){//Si la tarea está marcada como completada
            li.classList.add("check");//Añadimos clase "check"
            imgCheck.src = "images/tick2.png";//tick de tarea completada
        } else {
            imgCheck.src = "images/tick1.png";//tick de tarea no completada
            li.classList.remove("check");//Eliminamos la clase "check"
        }

        li.appendChild(imgCheck);//Añadimos el icono
        li.appendChild(imgClose);//Añadimos la imagen como elemento hijo de li
        contenedorTareas.appendChild(li);//Y ubicamos la tarea li al final de nuestra lista de tareas
        inputText.value = "";//vaciamos el texto de nueva tarea

        //Añadimos el eventHandler clic para checkear las tareas:
        imgCheck.addEventListener("click", (e) => {
            //Al hacer clic en el icono de esta tarea, se marca como check/uncheck
            if(e.target.className == "checkIcon"){
                e.target.parentElement.classList.toggle("check");
                //Según el nuevo estado de check/uncheck, actualizamos el icono
                if(e.target.parentElement.classList.contains("check")){
                    //Relacionamos la tarea a checkear en tareasArray por la id que le dimos al icono check
                    tareasArray[ (e.target.id).split("--")[1] ].check = true;
                    imgCheck.src = "images/tick2.png";//tick de tarea  completada
                } else {
                    tareasArray[ (e.target.id).split("--")[1] ].check = false;
                    imgCheck.src = "images/tick1.png";//tick de tarea no completada
                }
                GuardarTareas();//Guardamos los cambios
            }
        })
    }
}


//Almacenamos en localStorage las tareas en su estado actual
function GuardarTareas() {
    //Borramos todas las tareas de localStorage
    localStorage.clear();
    //Y guardamos las actuales a partir de la lista de li en el DOM
    let tareas_li = document.getElementsByTagName("li");
    for (let i = 0; i < tareas_li.length; i++){
        let n = i + 1;//Guardamos las tareas a partir del 1 en localStorage
        let tarea = new Tarea(n, tareasArray[i].texto, tareasArray[i].check);
        localStorage.setItem("tarea--" + n, JSON.stringify(tarea));//Convertimos a JSON
    }
}

//Funcion que elimina todas las tareas li de la lista HTML
function VaciarTareas_li(){
    //Mientras quede alguna li, eliminamos la de la última posición
    while (contenedorTareas.firstChild) {
        contenedorTareas.removeChild(contenedorTareas.lastChild);
    }
}

//funcion que crea una nueva tarea introducida desde la interfaz de la web
function Añadir() {
    if(inputText.value != ""){
        //Creamos la nueva tarea:
        let n = localStorage.length + 1;
        let tarea = new Tarea(n, inputText.value, false);//Por defecto no están checkeadas
        //Añadimos la tarea a localStorage
        localStorage.setItem("tarea--" + tarea.numero, JSON.stringify(tarea));
        //Añadimos la tarea a nuestra tareasArray:
        tareasArray.push(tarea);
        //Añadimos la tarea al contenedor HTML:
        MuestraTareas();
    }
}

//funcion que elimina todas las tareas:
function Limpiar() {
    localStorage.clear();//borramos todas las claves de localStorage
    contenedorTareas.innerHTML = "";//Vacíamos el contenido de la lista de tareas a mostrar
    tareasArray = [];//Vaciamos la lista de tareas interna
}
