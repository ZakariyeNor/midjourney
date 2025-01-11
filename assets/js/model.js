API_CODE = "zwF3qlgEkeiylVP4ltnxHwWRt6w";
URL_CODE = "https://ci-jshint.herokuapp.com/api";

const modalbo = new bootstrap.Modal(document.getElementById('staticBackdrop'));

document.getElementById('checkform').addEventListener('click', (e) => check_key(e));

async function check_key(e) {
    try {
        //try to fetch 
        const check_key_time = `${URL_CODE}?api_key=${API_CODE}`;

        //then declare response to wait the fetch 
        const response = await fetch(check_key_time);

        const data = await response.json()

        if (response.ok) {
            displayKey(data)
        } else {
            console.log(data.error);
        }
    } catch (error) {

        console.error("Error:", error);
        displayError({ error: "An unexpected error occurred. Please try again." });
    }
}

function displayKey(data) {
    let heading = "API Key Status";
    results = `<div>Your key is valid unitil</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById('staticBackdropLabel').innerText = heading;
    document.getElementById('modal-body').innerHTML = results;

    modalbo.show();

}

