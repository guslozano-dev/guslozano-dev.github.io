
let showTimeout;
let navVisible = true; // Controla si el navbar está visible

window.addEventListener('scroll', function () {

  const openDropdown = document.querySelector('.dropdown-menu.show');
    if (openDropdown) {
        // Cierra el menú desplegable
        const dropdownToggle = document.querySelector('.dropdown-toggle[aria-expanded="true"]');
        if (dropdownToggle) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        }
        openDropdown.classList.remove('show');
    }

  const navbar = document.querySelector('.navbar');
  const logo = document.querySelector('.navbar-brand img'); // 👈 logo dentro del navbar
  const videoSection = document.querySelector('.video-section');
  const triggerStart = videoSection.offsetHeight * 0.95;
  const triggerEnd = videoSection.offsetHeight;

  clearTimeout(showTimeout);

  // 🔻 Dentro del rango del video → ocultar solo si está visible
  if (window.scrollY > triggerStart && window.scrollY < triggerEnd) {
    if (navVisible) {
      navbar.classList.add('hidden');
      navbar.classList.remove('scrolled', 'showing');
      navVisible = false;
    }
  } 
  // 🔻 Después del video → mostrar solo si no está visible
  else if (window.scrollY >= triggerEnd) {
    if (!navVisible) {
      showTimeout = setTimeout(() => {
        navbar.classList.remove('hidden');
        navbar.classList.add('scrolled', 'showing');
        navVisible = true;

        // 👇 Cambia el logo al oscuro cuando se activa el navbar scrolled
        if (logo) logo.src = "images/LOGO VINTAGE W.png";

        setTimeout(() => {
          navbar.classList.remove('showing');
        }, 150); // duración de la animación
      }, 50); // retardo antes de mostrar
    }
  } 
  // 🔻 Antes del video → mostrar solo si está oculto
  else if (window.scrollY <= triggerStart) {
    if (!navVisible) {
      navbar.classList.remove('hidden', 'scrolled', 'showing');
      navVisible = true;
    }

    // 👇 Restaurar el logo claro antes del video
    if (logo) logo.src = "images/LOGO VINTAGE W.png";
  }  
});

document.getElementById("vestido-card").addEventListener("click", function() {
    Swal.fire({
      title: 'Para que tengas en cuenta...',
      html: `
        <p style="text-align: justify; font-size: 15px; color: #5a4636;">
          En <b>Vintage Novias</b> manejamos tres modalidades para adquirir tu vestido:
          <b>compra</b>, <b>alquiler nuevo</b> y <b>alquiler seminuevo</b>.
        </p>

        <ul style="text-align: left; font-size: 15px; color: #5a4636; list-style: none; padding-left: 0;">
          <li>🩶 Compra desde <b>$8.900.000</b></li>
          <li>🩶 Alquiler nuevo desde <b>$5.500.000</b></li>
          <li>🩶 Alquiler seminuevo desde <b>$1.700.000</b> hasta <b>$5.400.000</b></li>
        </ul>

        <p style="text-align: justify; font-size: 15px; color: #5a4636;">
          Los diseños que encuentras en nuestro catálogo corresponden a últimas colecciones.
          En nuestra Tienda podrás encontrar más diseños disponibles.
        </p>        
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#8b6a4a',
      width: 700,
      background: '#fffdf8',
    });
  });

  document.getElementById("asesoria-card").addEventListener("click", function() {
    Swal.fire({
      title: 'Recomendaciones',
      html: `
        <p style="text-align: justify; font-size: 15px; color: #5a4636;">
          Ten en cuenta que lo mejor siempre será tu <b>cita personalizada</b>, de esa manera, no solo podrás ver 
          y probar diferentes cortes y diseños, sino que podremos brindarte toda la <b>asesoría especializada</b> que requieres.
        </p>

        <p style="text-align: justify; font-size: 15px; color: #5a4636;">
          De nuestra parte, te recibiremos en nuestra Tienda con todo el amor y la  disposición para que la elección 
          de tu vestido de novia sea una experiencia linda e inolvidable.  
        </p>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#8b6a4a',
      width: 700,
      background: '#fffdf8',
    });
  });

  document.getElementById("entrega-card").addEventListener("click", function() {
    Swal.fire({
      title: 'Complementos que elevan tu look',
      html: `
         <ul style="text-align: left; font-size: 15px; color: #5a4636; list-style: none; padding-left: 0;">
          <li>🩶 Velos en diferentes estilos y tamaños (corto. mediano y largo).</li>
          <li>🩶 Tocados, coronas y accesorios para el cabello.</li>
          <li>🩶 Aretes delicados para novia.</li>
        </ul>

        <p style="text-align: justify; font-size: 15px; color: #5a4636;">
          ✨ Te asesoramos para que cada detalle armonice con tu vestido, peinado y estilo de boda.
          👰 Puedes probarlos junto con tu vestido para ver el look completo.</b> 
        </p>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#8b6a4a',
      width: 700,
      background: '#fffdf8',
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', function(event) {
        event.preventDefault(); // evita que el enlace navegue
        btn.classList.toggle('active');
      });
    });
  });

const galleryModal = document.getElementById("galleryModal");
const carouselInner = galleryModal.querySelector(".carousel-inner");
const dressTitle = document.getElementById("dressTitle");
const counter = document.getElementById("imageCounter");
const dressCarousel = document.getElementById("dressCarousel");

galleryModal.addEventListener("show.bs.modal", function (event) {

  const trigger = event.relatedTarget;
  const images = trigger.getAttribute("data-images").split(",");
  const title = trigger.getAttribute("data-title");

  dressTitle.textContent = title;
  carouselInner.innerHTML = "";

  images.forEach((src, index) => {
    const activeClass = index === 0 ? "active" : "";

    const slide = document.createElement("div");
    slide.className = "carousel-item " + activeClass;
    slide.innerHTML = `
      <div class="zoom-wrapper">
        <img src="${src.trim()}" class="d-block w-100">
      </div>
    `;
    carouselInner.appendChild(slide);
  });

  counter.textContent = `1 / ${images.length}`;
});

/* Contador dinámico */
dressCarousel.addEventListener("slid.bs.carousel", function () {
  const items = carouselInner.querySelectorAll(".carousel-item");
  const activeIndex = [...items].findIndex(el => el.classList.contains("active"));
  counter.textContent = `${activeIndex + 1} / ${items.length}`;
});

/* Zoom al tocar */
document.addEventListener("click", function(e){
  if(e.target.closest(".zoom-wrapper")){
    const wrapper = e.target.closest(".zoom-wrapper");
    wrapper.classList.toggle("zoomed");
  }
});





