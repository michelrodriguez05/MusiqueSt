const API_PROXY = "https://corsproxy.io/?";
const DEEZER_GENRE_API = "https://api.deezer.com/genre";

// Función para llamar a la API usando proxy
async function obtenerGeneros() {
  try {
    const respuesta = await fetch(`${API_PROXY}${encodeURIComponent(DEEZER_GENRE_API)}`);
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error("Error al obtener géneros:", error);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("generos");
  contenedor.innerHTML = "<p>Cargando géneros...</p>";

  const resultado = await obtenerGeneros();

  if (!resultado || !resultado.data) {
    contenedor.innerHTML = "<p>No se pudieron cargar los géneros.</p>";
    return;
  }

  contenedor.innerHTML = ""; // Limpiar contenido previo

  resultado.data.forEach(genero => {
    if (genero.id !== 0) {
      const div = document.createElement("div");
      div.className = "genero-card";

      div.innerHTML = `
        <img src="${genero.picture_medium}" alt="${genero.name}">
        <h3>${genero.name}</h3>
      `;

      contenedor.appendChild(div);
    }
  });
});
