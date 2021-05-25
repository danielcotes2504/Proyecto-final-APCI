let hash = location.hash.substr(1)
    //función para que al cargar la página se ejecute una función
window.onload = function() {
        //sessionStorage.setItem("logged", "")
        verificacion()

        loadData(`usuarios/${hash}`)

    }
    //función para obtener los datos del servidor
const loadData = async(string) => {
    const url = `http://localhost:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    fillInput(data)

}

const updateData = async(string, body) => {
    const url = `http://localhost:3000/${string}`
    const data = await putData(url, body)
    console.log(data)

}

const fillInput = (data) => {

    const h3_correo = document.querySelector('#h3-correo')
    h3_correo.innerHTML = `correo electrónico: ${data[0]._id}`
    document.querySelector('#edit-user-input-nombres').value = data[0].nombre
    document.querySelector('#edit-user-input-apellidos').value = data[0].apellido

}

document.querySelector('#update-user-btn').addEventListener("click", (e) => {

    const nombres = document.querySelector('#edit-user-input-nombres').value
    const apellidos = document.querySelector('#edit-user-input-apellidos').value
    const password = document.querySelector('#edit-user-input-npassword').value
    const newpassword = document.querySelector('#edit-user-input-npassword2').value
    let body = {}
    if (nombres !== undefined && nombres !== "" && apellidos !== undefined && apellidos !== "") {
        if ((password === "" && newpassword === "")) {
            body = { 'nombre': nombres, 'apellido': apellidos, 'empresa': 'manuelita' }
        } else if (password !== "" && password !== undefined) {
            if (password === newpassword) {
                body = { 'nombre': nombres, 'apellido': apellidos, 'empresa': 'manuelita', 'password': password }
                updateData(`usuarios/${hash}`, body)
                swal({
                    title: "Actualizado",
                    text: "¡Su usuario ha sido actualizado exitosamente!",
                    icon: "success",
                    button: 'Ok',

                }).then((willAccept) => {
                    if (willAccept) {

                        location.assign(`usuarios.html`)
                    }
                })
            } else {
                swal({
                    title: "Error",
                    text: "La contraseña y su confirmación no coinciden",
                    icon: "warning",
                    button: 'Ok',
                    dangerMode: true,
                })
            }

        }



    } else {
        swal({
            title: "Error",
            text: "no se pueden dejar los campos de nombres y apellidos vacíos",
            icon: "warning",
            button: 'Ok',
            dangerMode: true,
        })

    }


})