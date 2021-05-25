const createUser = async(string, body) => {
    const url = `http://localhost:3000/${string}`
    const data = await postData(url, body)
    console.log(data)

}

document.querySelector('#create-user-btn').addEventListener("click", (e) => {

    const nombres = document.querySelector('#add-user-input-nombres').value
    const apellidos = document.querySelector('#add-user-input-apellidos').value
    const correo = document.querySelector('#add-user-input-correo').value
    const password = document.querySelector('#add-user-input-npassword').value
    const newpassword = document.querySelector('#add-user-input-npassword2').value
    const body = { '_id': correo, 'nombre': nombres, 'apellido': apellidos, 'empresa': 'manuelita', 'password': password }
    if (nombres !== undefined && nombres !== "" && apellidos !== undefined && apellidos !== "" &&
        correo !== undefined && correo !== "" && password !== undefined && password !== "" &&
        newpassword !== undefined && newpassword !== "") {

        if (password === newpassword) {
            createUser('usuarios/', body)
            swal({
                title: "Felicidades",
                text: "¡Su usuario ha sido registrado exitosamente!",
                icon: "success",
                button: 'Ok',

            }).then((willAccept) => {
                if (willAccept) {

                    location.assign(`usuarios.html`)
                }
            });
        } else {
            swal({
                title: "Error",
                text: "La contraseña y su confirmación no coinciden",
                icon: "warning",
                button: 'Ok',
                dangerMode: true,
            })

        }



    } else {
        swal({
            title: "Error",
            text: "No se pueden dejar espacios en blanco",
            icon: "warning",
            button: 'Ok',
            dangerMode: true,
        })

    }


})