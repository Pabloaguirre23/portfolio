// --- TILT 3D EN IMÁGENES ---
const tiltHabilitado = window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// zonaTilt: elemento cuyo área dispara el efecto (área de detección del mouse)
// objetivo: elemento que efectivamente rota
// incluirPerspectiva: agrega perspective() al propio transform cuando zonaTilt y objetivo son el mismo elemento
function habilitarTilt(zonaTilt, objetivo, { gradosMax = 10, incluirPerspectiva = false } = {}) {
    if (!zonaTilt || !objetivo) return;

    const base = incluirPerspectiva ? 'perspective(900px) ' : '';

    zonaTilt.addEventListener('mousemove', (evento) => {
        const rect = zonaTilt.getBoundingClientRect();
        const x = (evento.clientX - rect.left) / rect.width - 0.5;
        const y = (evento.clientY - rect.top) / rect.height - 0.5;
        objetivo.style.transform = `${base}rotateY(${x * gradosMax * 2}deg) rotateX(${-y * gradosMax * 2}deg)`;
    });

    zonaTilt.addEventListener('mouseleave', () => {
        objetivo.style.transform = `${base}rotateY(0deg) rotateX(0deg)`;
    });
}

if (tiltHabilitado) {
    document.querySelectorAll('.tarjeta-proyecto').forEach(tarjeta => {
        habilitarTilt(tarjeta.querySelector('.aside'), tarjeta.querySelector('.proyecto-imagen-wrapper'), { gradosMax: 10 });
    });

    const heroImagenWrapper = document.querySelector('.hero-imagen-wrapper');
    habilitarTilt(heroImagenWrapper, heroImagenWrapper, { gradosMax: 3, incluirPerspectiva: true });

    const sobreMiImagenWrapper = document.querySelector('.sobre-mi-imagen-wrapper');
    habilitarTilt(sobreMiImagenWrapper, sobreMiImagenWrapper, { gradosMax: 3, incluirPerspectiva: true });
}

// --- ANIMACIÓN DE ENTRADA AL HACER SCROLL ---
const elementosRevelables = document.querySelectorAll('.reveal');

if (elementosRevelables.length) {
    const observadorScroll = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observadorScroll.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    elementosRevelables.forEach(elemento => observadorScroll.observe(elemento));
}

const elemento = document.querySelector('.scroll-indicador');

window.addEventListener('scroll', () => {

  if (window.scrollY > 200) {
    elemento.classList.add('oculto');
  } else {

    elemento.classList.remove('oculto');
  }
});

// --- NAVBAR CONDENSADA AL HACER SCROLL ---
const topNavbar = document.querySelector('.top-navbar');

window.addEventListener('scroll', () => {
  topNavbar.classList.toggle('scrolled', window.scrollY > 30);
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

// 1. Seleccionamos los elementos de Qubo
const modalQubo = document.getElementById('modal-Qubo');
const btnAbrirQubo = document.getElementById('btn-abrir-Qubo');
const btnCerrarQubo = document.getElementById('btn-cerrar-Qubo');

// 2. Seleccionamos los elementos de Marvelcito
const modalMarvelcito = document.getElementById('modal-marvelcito');
const btnAbrirMarvelcito = document.getElementById('btn-abrir-marvelcito');
const btnCerrarMarvelcito = document.getElementById('btn-cerrar-marvelcito');

// 3. Seleccionamos los elementos de NumberBlocks
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

// Eventos Qubo
btnAbrirQubo.addEventListener('click', () => abrirModal(modalQubo));
btnCerrarQubo.addEventListener('click', () => cerrarModal(modalQubo));

// Eventos Marvelcito
btnAbrirMarvelcito.addEventListener('click', () => abrirModal(modalMarvelcito));
btnCerrarMarvelcito.addEventListener('click', () => cerrarModal(modalMarvelcito));

// Eventos NumberBlocks
btnAbrirNumberblocks.addEventListener('click', () => abrirModal(modalNumberblocks));
btnCerrarNumberblocks.addEventListener('click', () => cerrarModal(modalNumberblocks));

// Cerrar haciendo clic afuera (aplica para ambos)
window.addEventListener('click', (evento) => {
    if(evento.target === modalQubo) cerrarModal(modalQubo);
    if (evento.target === modalMarvelcito) cerrarModal(modalMarvelcito);
    if (evento.target === modalNumberblocks) cerrarModal(modalNumberblocks);
});

// Cerrar con Escape (aplica para ambos)
window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        if (modalQubo.classList.contains('activo')) cerrarModal(modalQubo);
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