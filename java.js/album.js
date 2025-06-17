function buscarAlbum() {
    const nombre = document.getElementById('busquedaAlbum').value.trim();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (!nombre) {
        resultado.innerHTML = '<p>Por favor ingresa un nombre de álbum.</p>';
        return;
    }

    const url = `https://api.deezer.com/search/album?q=${encodeURIComponent(nombre)}`;

    fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(res => res.json())
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                resultado.innerHTML = '<p>Álbum no encontrado.</p>';
                return;
            }

            const album = data.data[0];
            resultado.innerHTML = `
                <div style="text-align:center">
                    <h2>${album.title}</h2>
                    <img src="${album.cover_medium}" alt="Portada del álbum" style="max-width:200px;">
                    <p>Artista: ${album.artist.name}</p>
                    <a href="${album.link}" target="_blank">Escuchar en Deezer</a>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            resultado.innerHTML = '<p>Ocurrió un error al buscar el álbum.</p>';
        });
}
