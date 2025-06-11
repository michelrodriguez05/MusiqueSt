// js/album.js

function buscarAlbum() {
    const nombre = document.getElementById('busquedaAlbum').value.trim();
    const resultado = document.getElementById('resultadoAlbum');
    resultado.innerHTML = '';

    if (!nombre) {
        resultado.innerHTML = '<p>Por favor ingresa un nombre de álbum.</p>';
        return;
    }

    fetch(`https://api.deezer.com/search/album?q=${encodeURIComponent(nombre)}`)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                resultado.innerHTML = '<p>No se encontraron álbumes con ese nombre.</p>';
                return;
            }

            data.data.forEach(album => {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
            <img src="${album.cover_medium}" alt="Imagen de ${album.title}" />
            <h3>${album.title}</h3>
            <p>Artista: ${album.artist.name}</p>
            <a href="${album.link}" target="_blank">Ver en Deezer</a>
          `;

                resultado.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al buscar álbum:', error);
            resultado.innerHTML = '<p>Ocurrió un error al obtener los datos.</p>';
        });
}