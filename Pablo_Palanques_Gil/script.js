//Esta línea se cumple nada más cargar la página
document.addEventListener("DOMContentLoaded", () => {
    CargarModoOscuroLocal();//Comprobamos si se debe activar el modo oscuro
})

//Funcion switch del modo oscuro:
function CambiarModo() {
    //Como sólo hay un botón de modo oscuro por página, siempre será el primero que encuentre ([0])
    document.getElementsByClassName("switchTema")[0].classList.toggle("oscuro");
    document.body.classList.toggle("oscuro");

        //Comprobamos si ahora estamos en modo oscuro:
    var estado = document.body.classList.contains("oscuro");
    console.log(estado);
    GuardarModoOscuroLocal(estado);

    //Actualizamos el texto del botón del Tema Oscuro:
    ActualizarTextoBoton(estado);
}

function GuardarModoOscuroLocal(estado){
    localStorage.setItem("modoOscuro", estado);
}

//Función que comprueba si hay que cargar el modo oscuro
function CargarModoOscuroLocal(){
    //Si la clave del modo oscuro existe y es true, la almacenamos en "modoOscuro":
    const modoOscuro = localStorage.getItem("modoOscuro") === "true";
    //Si modoOscuro es true, lo activamos
    if(modoOscuro){
        document.getElementsByClassName("switchTema")[0].classList.add("oscuro");
        document.body.classList.add("oscuro");
    }

    //Actualizamos el texto del botón del Tema Oscuro:
    ActualizarTextoBoton(modoOscuro);
}

//Método que actualiza el texto del botón que cambia el tema oscuro/claro
function ActualizarTextoBoton(estado){
    const botonTema = document.getElementsByClassName("switchTema")[0];//Referenciamos el boton
    if(estado){
        botonTema.innerHTML = "Modo Claro";
    } else{
        botonTema.innerHTML = "Modo Oscuro";
    }
}
