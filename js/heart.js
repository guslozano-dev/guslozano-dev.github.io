document.addEventListener('DOMContentLoaded', function() {
    const wishlistBtns = document.querySelectorAll('.btn-wishlist');
    wishlistBtns.forEach(btn => {
      btn.addEventListener('click', function(event) {
        event.preventDefault(); // evita que el enlace navegue
        btn.classList.toggle('active');
      });
    });
  });