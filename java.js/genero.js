// js/generos.js

document.addEventListener('DOMContentLoaded', function () {
    obtenerGeneros();
});

function obtenerGeneros() {
    const resultado = document.getElementById('resultadoGeneros');

    fetch('https://api.deezer.com/genre')
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data || data.data.length === 0) {
                resultado.innerHTML = '<p>No se encontraron géneros musicales.</p>';
                return;
            }

            data.data.forEach(genero => {
                // Ignorar el primer género (general/music) que Deezer usa como raíz
                if (genero.id === 0) return;

                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
            <img src="${genero.picture_medium}" alt="Imagen de ${genero.name}" />
            <h3>${genero.name}</h3>
            <a href="https://www.deezer.com/genre/${genero.id}" target="_blank">Ver en Deezer</a>
          `;

                resultado.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al obtener géneros:', error);
            resultado.innerHTML = '<p>Ocurrió un error al obtener los datos.</p>';
        });
}
