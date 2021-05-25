//función para que al cargar la página se ejecute una función
window.onload = function() {
        //sessionStorage.setItem("logged", "")
        verificacion()
        loadData('usuarios')

    }
    //función para obtener los datos del servidor
const loadData = async(string) => {
        const url = `http://localhost:3000/${string}`
        const data = await requestData(url)
        console.log(data)
        renderer(data)

    }
    //Creación de la tabla dinámica que posee la información de los usuarios
const renderer = (data) => {
        const body = document.querySelector('#tabla-usuarios-body')
        body.innerHTML = " "
        data.forEach((element) => {
            let i = 0
            const tr = document.createElement('tr')
            tr.setAttribute('id', 'tabla-filas')
            const col_correo = document.createElement('td')
            const col_nombres = document.createElement('td')
            const col_apellidos = document.createElement('td')
            const btn_editar = document.createElement('button')
            btn_editar.setAttribute('id', `btn-editar-usuarios-${element._id}`)
            const btn_eliminar = document.createElement('button')
            btn_eliminar.setAttribute('id', `btn-eliminar-usuarios-${element._id}`)
            btn_eliminar.addEventListener('click', (e) => {
                swal({
                        title: "¿Estas seguro que deseas eliminar este usuario?",
                        text: "Una vez eliminado, no podrás recuperar este usuario",
                        icon: "warning",
                        buttons: ["No", "Eliminar"],
                        confirmButtonColor: '#64B257',
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal("El usuario ha sido eliminado", {
                                icon: "success",

                            });
                            deleteData(element._id)
                        }
                    });



            })

            btn_editar.addEventListener('click', (e) => {
                location.assign(`.usuarios-editar.html#${element._id}`)

            })


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
    //evento que escucha al botón de buscar al usuario por correo
document.querySelector('#btn-buscar-usuario').addEventListener("click", (e) => {
        const correo = document.querySelector('#user-search-correo').value
        if (correo != " ") loadData(`usuarios/${correo}`)
        document.querySelector('#user-search-correo').value = ""

    })
    // evento que escucha al botón de quitar filtros
document.querySelector('#btn-quitar-filtro').addEventListener("click", (e) => {
    loadData(`usuarios`)
})

const deleteData = async(string) => {
    const url = `http://localhost:3000/usuarios/${string}`
    const data = await removeData(url)
    console.log(data)
    loadData('usuarios')


}