window.onload = function() {
    //sessionStorage.setItem("logged", "")
    // verificacion()
    loadData('datosnodo')

}

const loadData = async(string) => {
    const url = `http://${ipsv()}:3000/${string}`
    const data = await requestData(url)
    console.log(data)
    renderer(data)

}


const renderer = (data) => {
    let datos_quemas = [];
    data.forEach((element) => {
        let i = 0;


        datos_quemas.push(i)
        i++;
    })

    let ctx = document.getElementById('myChart').getContext('2d')

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];
    const data_chart = {
        labels: labels,
        datasets: [{
                label: 'Dataset 1',
                data: datos_quemas,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Dataset 2',
                data: [40, 30, 20, 32, 50, 21, 21],
                borderColor: '#78a6ff',
                backgroundColor: '#78a6ff',
            }
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