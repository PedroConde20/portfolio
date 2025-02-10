(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;
      let action = thisForm.getAttribute('action');

      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => response.json()) // Aseguramos que se procesa como JSON
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');

        if (data.status === 'success') {
          // Si la respuesta es 'success', mostramos el mensaje de éxito
          thisForm.querySelector('.sent-message').innerHTML = data.message;
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          // Si es un error, mostramos el mensaje de error
          thisForm.querySelector('.error-message').innerHTML = data.message;
          thisForm.querySelector('.error-message').classList.add('d-block');
        }
      })
      .catch(error => {
        displayError(thisForm, error);
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = 'Error: ' + error;  // Mostramos el error si algo sale mal
    thisForm.querySelector('.error-message').classList.add('d-block');
  }
})();