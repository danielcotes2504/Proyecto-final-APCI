//función para que al cargar la página se ejecute una función
window.onload = function() {
        //sessionStorage.setItem("logged", "")
        // verificacion()
        loadData('datosnodo')
        loadAlert('alertaquemaWeb')

    }
    //función para obtener los datos del servidor

const loadData = async(string) => {
    const url = `http://${ipsv()}:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    renderer(data)

}
const loadAlert = async(string) => {
    const url = `http://${ipsv()}:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    putAlert(data)

}

const putAlert = (data) => {
        const body = document.querySelector('#body-aviso')
        const id_aviso = createElement('div')
        id_aviso.setAttribute('style', 'margin-top: 50px;margin-left: 50px;')
        id_aviso.setAttribute('role', 'alert')
        const alert_heading = createElement('h4')
        const alert_body = createElement('p')
        const btn = createElement('button')
        const span = createElement('span')
        const id_nodo = data[0].id_nodo
        const id_zona = data[0].id_zona
        const fecha_hora = new Date(data[0].fecha_hora)
        const quema_controlada = data[0].alertas.quema_controlada

        if (quema_controlada === 'Quema controlada') {

        } else if (quema_controlada == 'Quema no controlada') {

        } else {
            body.setAttribute('class', '"alert alert-danger alert-dismissible fade show"')
        }



    }
    //Creación de la tabla dinámica que posee la información de los usuarios
const renderer = (data) => {
        const body = document.querySelector('#tabla-usuarios-body')
        body.innerHTML = " "
        data.forEach((element) => {
            let i = 0
            const tr = document.createElement('tr')
            tr.setAttribute('id', 'tabla-filas')
            const col_zona = document.createElement('td')
            const col_idnodo = document.createElement('td')
            const col_temperatura = document.createElement('td')
            const col_concentracion = document.createElement('td')
            const col_quemadetectada = document.createElement('td')
            const col_quemacontrolada = document.createElement('td')

            col_zona.innerHTML = element.id_zona
            col_idnodo.innerHTML = element.id_nodo
            col_temperatura.innerHTML = element.datos_nodo.temperatura + " °C"
            col_concentracion.innerHTML = element.datos_nodo.concentracion
            col_quemadetectada.innerHTML = element.alertas.quema_detectada
            if (element.alertas.quema_controlada == undefined) col_quemacontrolada.innerHTML = "-"
            else col_quemacontrolada.innerHTML = element.alertas.quema_controlada

            body.appendChild(tr)
            tr.appendChild(col_zona)
            tr.appendChild(col_idnodo)
            tr.appendChild(col_temperatura)
            tr.appendChild(col_concentracion)
            tr.appendChild(col_quemadetectada)
            tr.appendChild(col_quemacontrolada)

        })




    }
    //evento que escucha al botón de buscar al usuario por correo
document.querySelector('#btn-buscar').addEventListener("click", (e) => {
        const zona = document.querySelector('#user-search-zona').value
        const idnodo = document.querySelector('#user-search-idnodo').value
        if (zona !== "" && idnodo !== "") loadData(`datosnodo/${zona}/${idnodo}`)
        else if (zona !== "") loadData(`datosnodo/${zona}`)
        else if (idnodo !== "") {
            idnodoNum = parseInt(idnodo)
            loadData(`datosnodoid/${idnodoNum}`)
        }
    })
    // evento que escucha al botón de quitar filtros
document.querySelector('#btn-quitar-filtro').addEventListener("click", (e) => {
    document.querySelector('#user-search-zona').value = ""
    document.querySelector('#user-search-idnodo').value = ""

    loadData(`datosnodo`)
})