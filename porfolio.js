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

// --- LÓGICA MENÚ HAMBURGUESA ---
const menuHamburguesa = document.getElementById('menu-hamburguesa');
const navLinksContainer = document.getElementById('nav-links');

if (menuHamburguesa && navLinksContainer) {
    menuHamburguesa.addEventListener('click', () => {
        menuHamburguesa.classList.toggle('activo');
        navLinksContainer.classList.toggle('activo');
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(enlace => {
        enlace.addEventListener('click', () => {
            menuHamburguesa.classList.remove('activo');
            navLinksContainer.classList.remove('activo');
        });
    });
}

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

const frog1 = document.getElementById('frog1');
const frog2 = document.getElementById('frog2');
const frog3 = document.getElementById('frog3');

function atraparSapito(sapitoActual, sapitoSiguiente, claseSalto) {
    sapitoActual.classList.add(claseSalto);
    
    setTimeout(() => {
        sapitoActual.classList.add('oculto');
        sapitoActual.classList.remove(claseSalto);
        
        sapitoSiguiente.classList.remove('oculto');
    }, 400); 
}


frog1.addEventListener('click', () => atraparSapito(frog1, frog2, 'sapito-saltando-der'));

frog2.addEventListener('click', () => atraparSapito(frog2, frog3, 'sapito-saltando-izq'));
frog3.addEventListener('click', () => atraparSapito(frog3, frog1, 'sapito-saltando-izq'));
document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector('.hero-texto h1');
    titulo.innerHTML = '';

    const texto1 = "Hola, soy ";
    const texto2 = "Pablo Andrés";
    const texto3 = "Aguirre";
    
    const velocidad = 65; 

    async function maquinaDeEscribir() {
        for (let i = 0; i < texto1.length; i++) {
            titulo.innerHTML += texto1.charAt(i);
            await new Promise(r => setTimeout(r, velocidad));
        }

        const span = document.createElement('span');
        span.className = 'texto-violeta';
        titulo.appendChild(span);


        for (let i = 0; i < texto2.length; i++) {
            span.innerHTML += texto2.charAt(i);
            await new Promise(r => setTimeout(r, velocidad));
        }

        span.innerHTML += '<br>';

        for (let i = 0; i < texto3.length; i++) {
            span.innerHTML += texto3.charAt(i);
            await new Promise(r => setTimeout(r, velocidad));
        }

        setTimeout(() => {
            titulo.classList.add('sin-cursor');
        }, 1800);
    }

    setTimeout(maquinaDeEscribir, 500);
});