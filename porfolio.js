const elemento = document.querySelector('.scroll-indicador');

window.addEventListener('scroll', () => {
  
  if (window.scrollY > 200) {
    elemento.classList.add('oculto');
  } else {
    
    elemento.classList.remove('oculto');
  }
});

// 1. Seleccionamos las secciones de tu página
const secciones = document.querySelectorAll('section');

// 2. IMPORTANTE: Así seleccionamos tus enlaces con tu nueva estructura
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let seccionActual = '';

  // 3. Revisamos en qué sección estamos
  secciones.forEach(seccion => {
    const inicioSeccion = seccion.offsetTop;
    
    // El "150" es el margen para que cambie un poco antes de llegar
    if (window.scrollY >= (inicioSeccion - 150)) {
      seccionActual = seccion.getAttribute('id');
    }
  });

  // 4. Actualizamos la línea violeta
  navLinks.forEach(link => {
    // Primero le quitamos tu clase .active a todos
    link.classList.remove('active'); 
    
    // Si el href coincide con la sección actual, se la agregamos
    if (link.getAttribute('href') === `#${seccionActual}`) {
      link.classList.add('active');
    }
  });
});

// --- LÓGICA PARA MODALES DE PROYECTOS ---

// 1. Seleccionamos los elementos de Marvelcito
const modalMarvelcito = document.getElementById('modal-marvelcito');
const btnAbrirMarvelcito = document.getElementById('btn-abrir-marvelcito');
const btnCerrarMarvelcito = document.getElementById('btn-cerrar-marvelcito');

// 2. Seleccionamos los elementos de NumberBlocks
const modalNumberblocks = document.getElementById('modal-numberblocks');
const btnAbrirNumberblocks = document.getElementById('btn-abrir-numberblocks');
const btnCerrarNumberblocks = document.getElementById('btn-cerrar-numberblocks');

// Función genérica para abrir un modal
function abrirModal(modal) {
    modal.classList.add('activo');
    document.body.style.overflow = 'hidden';
}

// Función genérica para cerrar un modal
function cerrarModal(modal) {
    modal.classList.remove('activo');
    document.body.style.overflow = 'auto';
}

// Eventos Marvelcito
btnAbrirMarvelcito.addEventListener('click', () => abrirModal(modalMarvelcito));
btnCerrarMarvelcito.addEventListener('click', () => cerrarModal(modalMarvelcito));

// Eventos NumberBlocks
btnAbrirNumberblocks.addEventListener('click', () => abrirModal(modalNumberblocks));
btnCerrarNumberblocks.addEventListener('click', () => cerrarModal(modalNumberblocks));

// Cerrar haciendo clic afuera (aplica para ambos)
window.addEventListener('click', (evento) => {
    if (evento.target === modalMarvelcito) cerrarModal(modalMarvelcito);
    if (evento.target === modalNumberblocks) cerrarModal(modalNumberblocks);
});

// Cerrar con Escape (aplica para ambos)
window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        if (modalMarvelcito.classList.contains('activo')) cerrarModal(modalMarvelcito);
        if (modalNumberblocks.classList.contains('activo')) cerrarModal(modalNumberblocks);
    }
});

// 1. Seleccionamos a los TRES sapitos
const frog1 = document.getElementById('frog1');
const frog2 = document.getElementById('frog2');
const frog3 = document.getElementById('frog3');

// 2. Secuencia del Sapito 1 (Hace aparecer al 2)
frog1.addEventListener('click', () => {
    frog1.classList.add('oculto');
    frog2.classList.remove('oculto');
});

// 3. Secuencia del Sapito 2 (Hace aparecer al 3)
frog2.addEventListener('click', () => {
    frog2.classList.add('oculto');
    frog3.classList.remove('oculto');
});

// 4. Secuencia del Sapito 3 (Hace aparecer al 1 para reiniciar el juego)
frog3.addEventListener('click', () => {
    frog3.classList.add('oculto');
    frog1.classList.remove('oculto');
});
