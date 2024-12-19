document.getElementById('flight-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    fetch(`http://api.aviationstack.com/v1/flights?access_key=YOUR_API_KEY&dep_iata=${origin}&arr_iata=${destination}&flight_date=${date}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            data.data.forEach(flight => {
                const flightElement = document.createElement('div');
                flightElement.classList.add('flight');
                flightElement.innerHTML = `
                    <p><strong>Vuelo:</strong> ${flight.flight.iata}</p>
                    <p><strong>Salida:</strong> ${flight.departure.scheduled}</p>
                    <p><strong>Llegada:</strong> ${flight.arrival.scheduled}</p>
                    <p><strong>Estado:</strong> ${flight.flight_status}</p>
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
