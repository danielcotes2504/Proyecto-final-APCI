let hash = location.hash.substr(1)
window.onload = function() {

    //sessionStorage.setItem("logged", "")
    verificacion()
    loadData(`datosm/ID/${hash}`)

}


const updateData = async(string, body) => {
    const url = `http://${ipsv()}:3000/${string}`
    const data = await putData(url, body)
    console.log(data)

}

const loadData = async(string) => {
    const url = `http://${ipsv()}:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    fillInput(data)

}


const fillInput = (data) => {

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const Fecha = new Date(data[0].HorasP.fechaInicialP).toLocaleDateString('fr-CA', options)
    const Hora_I = new Date(data[0].HorasP.fechaInicialP).toLocaleTimeString('en-US')
    const Hora_F = new Date(data[0].HorasP.fechaFinalP).toLocaleTimeString('en-US')
    document.querySelector('#date-picker').value = Fecha
    document.querySelector('#input-hora-inicial').value = Hora_I
    document.querySelector('#input-hora-final').value = Hora_F
    document.querySelector('#input-zona').value = data[0].ZonaP
}
document.querySelector('#btn-actualizar-horario').addEventListener("click", (e) => {
    const Fecha = document.querySelector('#date-picker').value
    const HoraI = document.querySelector('#input-hora-inicial').value
    const HoraF = document.querySelector('#input-hora-final').value
    const Zona = document.querySelector('#input-zona').value
    let today = new Date().toString().toLocaleString('es-CO', { timeZone: "America/Bogota" });
    let fecha_selec = new Date(Fecha)
    let date = new Date(today)

    let Fecha_Completa_I = Fecha + " " + HoraI
    let Fecha_Completa_F = Fecha + " " + HoraF
    console.log(new Date(Fecha_Completa_I).getHours())
    if (Fecha !== "" && Zona !== "") {

        if (fecha_selec < date) {
            swal({
                title: "La fecha seleccionada ya pasó",

                icon: "warning",
                buttons: "Ok",

            })
        } else {
            if (new Date(Fecha_Completa_I).getHours() < 9 || new Date(Fecha_Completa_F).getHours() > 21) {
                swal({
                    title: "Las horas seleccionadas no están en el rango",
                    icon: "warning",
                    buttons: "Ok",

                })
            } else {
                //BODY
                const body = {
                    fechaInicialP: Fecha_Completa_I,
                    fechaFinalP: Fecha_Completa_F,
                    ZonaP: Zona
                }


                updateData(`datosm/put/${hash}`, body)
                swal({
                    title: "Felicidades",
                    text: "¡Su Horario de quema ha sido añadido!",
                    icon: "success",
                    button: 'Ok',

                }).then((willAccept) => {
                    if (willAccept) {

                        location.assign(`horarios-programados.html`)
                    }
                });
            }

        }

    } else if (Fecha === "" && Zona === "") {
        swal({
            title: "La fecha y la zona están vacía",

            icon: "warning",
            buttons: "Ok",

        })
    } else if (Fecha === "") {
        swal({
            title: "La fecha está vacía",

            icon: "warning",
            buttons: "Ok",

        })
    } else if (Zona === "") {
        swal({
            title: "La Zona está vacía",

            icon: "warning",
            buttons: "Ok",

        })
    }

})