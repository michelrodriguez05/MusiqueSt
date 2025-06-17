document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById('generos');

    fetch('https://api.allorigins.win/get?url=https://api.deezer.com/genre')
        .then(response => response.json())
        .then(data => {
            const contenido = JSON.parse(data.contents);
            contenido.data.forEach(genero => {
                if (genero.id !== 0) { // ID 0 es "All", lo ignoramos
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <img src="${genero.picture_medium}" alt="${genero.name}">
                        <p>${genero.name}</p>
                    `;
                    contenedor.appendChild(div);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener géneros:', error);
            contenedor.innerHTML = '<p>No se pudieron cargar los géneros.</p>';
        });
});
