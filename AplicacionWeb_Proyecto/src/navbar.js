document.querySelector('#nav-div-text-Inicio').addEventListener("click", (e) => {
    window.location.href = "home.html"

})

document.querySelector('#nav-div-text-Nodos').addEventListener("click", (e) => {
    window.location.href = "datos-nodo.html"


})
document.querySelector('#nav-div-text-Alertas').addEventListener("click", (e) => {
    // window.location.href = "Alertas.html"

})
document.querySelector('#nav-div-text-Usuarios').addEventListener("click", (e) => {
    window.location.href = "usuarios.html"

})
document.querySelector('#nav-div-text-Horario').addEventListener("click", (e) => {
    window.location.href = "horarios-programados.html"

})
document.querySelector('#nav-div-text-Salir').addEventListener("click", (e) => {
    swal({
            title: "¿Estas seguro que deseas cerrar sesión?",
            icon: "warning",
            buttons: ["Continuar en mi sesión", "Salir"],

        })
        .then((logout) => {
            if (logout) {
                swal("¡Hasta luego!", {
                        icon: "success",
                        button: "Ok"
                    })
                    .then((finalmsg) => {
                        if (finalmsg) {
                            sessionStorage.setItem("logged", "")
                            window.location.href = "../../index.html"
                        }
                    })


            }
        })


})