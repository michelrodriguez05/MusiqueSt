// js/artistas.js

function buscarArtista() {
    const nombre = document.getElementById('busquedaArtista').value.trim();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (!nombre) {
        resultado.innerHTML = '<p>Por favor ingresa un nombre de artista.</p>';
        return;
    }

    fetch(`https://api.deezer.com/search/artist?q=${encodeURIComponent(nombre)}`)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                resultado.innerHTML = '<p>No se encontraron artistas con ese nombre.</p>';
                return;
            }

            data.data.forEach(artista => {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
            <img src="${artista.picture_medium}" alt="Imagen de ${artista.name}" />
            <h3>${artista.name}</h3>
            <p>Fans: ${artista.nb_fan.toLocaleString()}</p>
            <a href="${artista.link}" target="_blank">Ver en Deezer</a>
          `;

                resultado.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al buscar artista:', error);
            resultado.innerHTML = '<p>Ocurrió un error al obtener los datos.</p>';
        });
}