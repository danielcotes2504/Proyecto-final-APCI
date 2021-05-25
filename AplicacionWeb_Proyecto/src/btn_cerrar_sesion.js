document.querySelector('#btn-cerrar-sesion').addEventListener("click", (e) => {
    sessionStorage.setItem("logged", "")
    window.location.href = "../../index.html"

})