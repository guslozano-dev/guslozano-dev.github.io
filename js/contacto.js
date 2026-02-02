(function(){
    emailjs.init("u9crik74I8kpGL9ml");
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  event.stopPropagation();

  const form = this;

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return;
  }

  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const phoneInput = document.getElementById('phone-input');
  const subjectInput = document.getElementById('subject-input');
  const messageInput = document.getElementById('message-input');

  const user_name = nameInput.value.trim();
  const user_phone = phoneInput.value.trim(); 
  const user_email = emailInput.value.trim();
  const user_subject = subjectInput.value.trim();  
  const user_message = messageInput.value.trim();

  const fecha = new Date();
  const hoy = fecha.getDate().toString().padStart(2, '0') + '/' +
              (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' +
              fecha.getFullYear();

  // 🔹 Sweet alert "procesando"
  Swal.fire({
    title: 'Enviando...',
    text: 'Por favor espera un momento.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // 🔹 Enviar datos a EmailJS
  emailjs.send("service_zgjmsrh", "template_h19erq5", {
    user_subject: user_subject,
    user_name: user_name,
    user_email: user_email,
    user_phone: user_phone,
    user_message: user_message,
    date: hoy
  })
  .then(() => {
    Swal.fire({
      icon: 'success',
      title: '¡Se envió tu mensaje exitosamente!',
      text: 'Gracias por contactarnos. 🩶',
      confirmButtonColor: '#8b6a4a'
    });
    form.reset();
    form.classList.remove('was-validated');
  })
  .catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Error al enviar mensaje',
      text: 'Hubo un problema al enviar tu solicitud.',
      confirmButtonColor: '#8b6a4a'
    });
    console.error("Error:", error);
  });
});