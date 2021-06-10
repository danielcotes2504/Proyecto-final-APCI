window.onload = function() {
    verificacion()
}
const bienvenida = document.querySelector('#h1-welcome')
bienvenida.innerHTML = `¡Bienvenido ${sessionStorage.nombre_usuario}!`

document.querySelector('#btn-usuario').addEventListener("click", (e) => {
    window.location.href = "usuarios.html"

})
document.querySelector('#btn-dispositivo').addEventListener("click", (e) => {
    window.location.href = "datos-nodo.html"

})
document.querySelector('#btn-horario').addEventListener("click", (e) => {
    window.location.href = "horarios-programados.html"

})