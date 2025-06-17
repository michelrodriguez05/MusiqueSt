const API_PROXY = "https://corsproxy.io/?";
const DEEZER_ALBUM_API = "https://api.deezer.com/artist/13/albums"; // Álbumes de Eminem

async function obtenerAlbumes() {
  try {
    const respuesta = await fetch(`${API_PROXY}${encodeURIComponent(DEEZER_ALBUM_API)}`);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al obtener álbumes:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("albumes");
  contenedor.innerHTML = "<p>Cargando álbumes...</p>";

  const resultado = await obtenerAlbumes();

  if (!resultado || !resultado.data) {
    contenedor.innerHTML = "<p>No se pudieron cargar los álbumes.</p>";
    return;
  }

  contenedor.innerHTML = ""; // Limpiar contenido previo

  resultado.data.forEach(album => {
    const div = document.createElement("div");
    div.className = "album-card";

    div.innerHTML = `
      <img src="${album.cover_medium}" alt="${album.title}">
      <h3>${album.title}</h3>
      <p>Fans: ${album.fans.toLocaleString()}</p>
    `;

    contenedor.appendChild(div);
  });
});
