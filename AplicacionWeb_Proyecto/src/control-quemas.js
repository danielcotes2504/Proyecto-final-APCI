window.onload = function() {
    //sessionStorage.setItem("logged", "")
    verificacion()
    loadData(`datosquema/Quema no controlada/3/2021-05-16 00:00:00/2021-05-16 23:59:00`)

}

const loadData = async(string) => {
    const url = `http://${ipsv()}:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    renderer(data)

}


const renderer = (data) => {
    let datos_quemas = [];
    let labels_quemas = []
    data.forEach((element) => {
        let i = 0;

        //element.alertas.quema_controlada
        datos_quemas.push(element.alertas.quema_controlada)
        labels_quemas.push(new Date(element.fecha_hora))

    })

    let ctx = document.getElementById('myChart').getContext('2d')
    console.log(labels_quemas)
    const labels = labels_quemas
    const data_chart = {
        labels: labels,
        datasets: [{
                label: 'Dataset 1',
                data: datos_quemas,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
            },

        ]
    }

    const config = {
        type: 'line',
        data: data_chart,
        options: {}
    }
    let myChart = new Chart(ctx, config)
        // col_quemacontrolada.innerHTML = element.alertas.quema_controlada







}