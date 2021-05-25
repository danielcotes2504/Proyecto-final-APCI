const verificacion = () => {
    console.log(sessionStorage.logged)
    if (sessionStorage.logged === undefined || sessionStorage.logged === "") {
        {

            window.location.href = "../../index.html"
        }
    }
}