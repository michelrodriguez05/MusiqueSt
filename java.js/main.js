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
