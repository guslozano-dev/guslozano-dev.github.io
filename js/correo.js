(function(){
    emailjs.init("u9crik74I8kpGL9ml");
  })();

  document.getElementById('subscribe-btn').addEventListener('click', function() {
  const emailInput = document.getElementById('email-input');
  const phoneInput = document.getElementById('phone-input');

  const user_email = emailInput.value.trim();
  const user_phone = phoneInput.value.trim();

  // 📌 Validar email
  if (!user_email) {
    Swal.fire({
      icon: 'warning',
      title: 'Correo requerido',
      text: 'Por favor ingresa tu dirección de correo electrónico.',
      confirmButtonColor: '#8b6a4a'
    });
    return;
  }

  // 📌 Validar teléfono vacío
  if (!user_phone) {
    Swal.fire({
      icon: 'warning',
      title: 'Teléfono requerido',
      text: 'Por favor ingresa tu número de teléfono.',
      confirmButtonColor: '#8b6a4a'
    });
    return;
  }

  // 📌 Validar SOLO números
  const phoneRegex = /^[0-9]+$/;
  if (!phoneRegex.test(user_phone)) {
    Swal.fire({
      icon: 'error',
      title: 'Teléfono inválido',
      text: 'El número de teléfono solo debe contener números.',
      confirmButtonColor: '#8b6a4a'
    });
    return;
  }

  // 🔹 Sweet alert "procesando"
  Swal.fire({
    title: 'Suscribiendo...',
    text: 'Por favor espera un momento.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // 🔹 Enviar datos a EmailJS
  emailjs.send("service_zgjmsrh", "template_mpzsl62", {
    user_email: user_email,
    user_phone: user_phone
  })
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Suscripción exitosa!',
      text: 'Gracias por unirte a nuestro boletín. 🩶',
      confirmButtonColor: '#8b6a4a'
    });
    emailInput.value = "";
    phoneInput.value = "";
  })
  .catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error al suscribirse',
      text: 'Hubo un problema al enviar tu solicitud.',
      confirmButtonColor: '#8b6a4a'
    });
    console.error("Error:", error);
  });
});