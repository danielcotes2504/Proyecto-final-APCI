//función para que al cargar la página se ejecute una función
window.onload = function() {
        //sessionStorage.setItem("logged", "")
        // verificacion()
        loadData('datosm')

    }
    //función para obtener los datos del servidor
const loadData = async(string) => {
        const url = `http://${ipsv()}:3000/${string}`
        const data = await requestData(url)
        console.log(data)
        renderer(data)

    }
    //Creación de la tabla dinámica que posee la información de los usuarios
const renderer = (data) => {
        const body = document.querySelector('#tabla-horarios-body')
        body.innerHTML = " "
        data.forEach((element) => {
            const tr = document.createElement('tr')
            tr.setAttribute('id', 'tabla-filas')
            const col_Zona = document.createElement('td')
            const col_Fecha = document.createElement('td')
            const col_Hora_Inicial = document.createElement('td')
            const col_Hora_Final = document.createElement('td')
            const btn_editar = document.createElement('button')
            btn_editar.setAttribute('id', `btn-editar-horarios-${element._id}`)
            const btn_eliminar = document.createElement('button')
            btn_eliminar.setAttribute('id', `btn-eliminar-horarios-${element._id}`)
            btn_eliminar.addEventListener('click', (e) => {

                swal({
                        title: "¿Estas seguro que deseas eliminar este horario?",
                        text: "Una vez eliminado, no podrás recuperarlo",
                        icon: "warning",
                        buttons: ["No", "Eliminar"],
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {

                            swal("El Horario ha sido eliminado", {
                                icon: "success",

                            });


                            deleteData(element._id)


                        }
                    });



            })

            btn_editar.addEventListener('click', (e) => {
                location.assign(`horarios-programados-editar.html#${element._id}`)

            })
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const Fecha = new Date(element.HorasP.fechaInicialP).toLocaleDateString('es-CO', options)
            const Hora_I = new Date(element.HorasP.fechaInicialP).toLocaleTimeString('en-US')
            const Hora_F = new Date(element.HorasP.fechaFinalP).toLocaleTimeString('en-US')
                //const col_funciones = tr.createElement('td')
            col_Zona.innerHTML = element.ZonaP
            col_Fecha.innerHTML = Fecha
            col_Hora_Inicial.innerHTML = Hora_I
            col_Hora_Final.innerHTML = Hora_F
            btn_editar.innerHTML = "editar"
            btn_eliminar.innerHTML = "eliminar"
            body.appendChild(tr)
            tr.appendChild(col_Zona)
            tr.appendChild(col_Fecha)
            tr.appendChild(col_Hora_Inicial)
            tr.appendChild(col_Hora_Final)
            tr.appendChild(btn_editar)
            tr.appendChild(btn_eliminar)

        })




    }
    //evento que escucha al botón de buscar al usuario por correo 
document.querySelector('#btn-buscar-zona').addEventListener("click", (e) => {
    const zona = document.querySelector('#user-search-zona').value
    if (zona !== "") loadData(`datosm/${zona}`)
    document.querySelector('#user-search-zona').value = ""

})

document.querySelector('#btn-buscar-fecha').addEventListener("click", (e) => {
        const fecha = document.querySelector('#date-picker').value
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let fecha_ISO = new Date(fecha).toLocaleDateString('fr-CA', options)
        console.log(fecha_ISO)
        if (fecha_ISO !== "") loadData(`datosm/fecha_horario/${fecha_ISO}`)
        document.querySelector('#date-picker').value = ""

    })
    // evento que escucha al botón de quitar filtros
document.querySelector('#btn-quitar-filtro').addEventListener("click", (e) => {
    loadData(`datosm`)
})

document.querySelector('#btn-programar-horario').addEventListener("click", (e) => {
    location.assign(`horarios-programados-agregar.html`)
})

const deleteData = async(string) => {

    const url = `http://${ipsv()}:3000/datosm/${string}`
    const data = await removeData(url)
    loadData('datosm')
    console.log(data)



}