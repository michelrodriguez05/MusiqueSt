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
  

  // js/main.js

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a');
    const secciones = document.querySelectorAll('section');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        const id = this.getAttribute('href').substring(1);
  
        secciones.forEach(sec => {
          sec.style.display = 'none';
        });
  
        document.getElementById(id).style.display = 'block';
  
        navLinks.forEach(l => l.classList.remove('activo'));
        this.classList.add('activo');
      });
    });
  
    // Mostrar la sección de artistas por defecto
    document.querySelector('section').style.display = 'block';
    document.querySelector('nav a').classList.add('activo');
  });
  