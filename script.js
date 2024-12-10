document.getElementById('flight-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    fetch(`https://airlabs.co/api/v9/flights?api_key=YOUR_API_KEY&dep_iata=${origin}&arr_iata=${destination}&date=${date}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            data.response.forEach(flight => {
                const flightElement = document.createElement('div');
                flightElement.classList.add('flight');
                flightElement.innerHTML = `
                    <p><strong>Vuelo:</strong> ${flight.flight_number}</p>
                    <p><strong>Salida:</strong> ${flight.dep_time}</p>
                    <p><strong>Llegada:</strong> ${flight.arr_time}</p>
                    <p><strong>Estado:</strong> ${flight.status}</p>
                `;
                resultsDiv.appendChild(flightElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '<p>Ocurrió un error al buscar los vuelos. Intenta nuevamente.</p>';
        });
});
