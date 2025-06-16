function buscarArtista() {
    const nombre = document.getElementById('busquedaArtista').value.trim();
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    if (!nombre) {
        resultado.innerHTML = '<p>Por favor ingresa un nombre de artista.</p>';
        return;
    }

    const url = `https://api.deezer.com/search/artist?q=${encodeURIComponent(nombre)}&output=jsonp&callback=mostrarArtistas`;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function mostrarArtistas(data) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

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
}
