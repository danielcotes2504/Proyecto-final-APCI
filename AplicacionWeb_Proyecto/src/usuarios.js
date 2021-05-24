window.onload = function() {
    //sessionStorage.setItem("logged", "")
    loadData('usuarios')

}

const loadData = async(string) => {
    const url = `http://localhost:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    renderer(data)

}




const renderer = (data) => {
    const body = document.querySelector('#tabla-usuarios')

    data.forEach((element) => {
        const tr = document.createElement('tr')
        tr.setAttribute('id', 'tabla-filas')
        const col_correo = document.createElement('td')
        const col_nombres = document.createElement('td')
        const col_apellidos = document.createElement('td')
        const btn_editar = document.createElement('button')
        const btn_eliminar = document.createElement('button')


        //const col_funciones = tr.createElement('td')
        col_correo.innerHTML = element._id
        col_nombres.innerHTML = element.nombre
        col_apellidos.innerHTML = element.apellido
        btn_editar.innerHTML = "editar"
        btn_eliminar.innerHTML = "eliminar"
        body.appendChild(tr)
        tr.appendChild(col_correo)
        tr.appendChild(col_nombres)
        tr.appendChild(col_apellidos)
        tr.appendChild(btn_editar)
        tr.appendChild(btn_eliminar)

    })



}

document.querySelector('#btn-buscar-usuario').addEventListener("click", (e) => {
    document.querySelectorAll('#tabla-filas').forEach(e => e.parentNode.removeChild(e))
    const correo = document.querySelector('#user-search-correo').value
    if (correo != "") loadData(`usuarios/${correo}`)
    document.querySelector('#user-search-correo').value = ""

})

document.querySelector('#btn-quitar-filtro').addEventListener("click", (e) => {
    document.querySelectorAll('#tabla-filas').forEach(e => e.parentNode.removeChild(e))
    loadData(`usuarios`)

})