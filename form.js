const form_section = document.getElementById('form_section');
const inputs = document.querySelectorAll('#form_section input');

//const span_cb_validation = document.getElementById('checkbox_validaton');

//me traje el formulario completo y sus inputs

//expresiones regulares para los campos de los inputs guardados en un objeto
const expressions = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  phone: /^\d{7,14}$/, // 7 a 14 numeros.
};

// creo un objeto con los campos para despues validarlos

const fields = {
  usuario: false,
  name: false,
  password: false,
  email: false,
  phone: false,
};

// que me traiga las expressions

const validateForm = (e) => {
  switch (e.target.name) {
    case 'name':
      validateField(expressions.name, e.target, 'name');
      break;
    case 'email':
      validateField(expressions.email, e.target, 'email');
      break;
    case 'phone':
      validateField(expressions.phone, e.target, 'phone');
      break;
  }
};

// validando campos
const validateField = (expresion, input, field) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`group_${field}`)
      .classList.remove('form_group-incorrect');
    document
      .getElementById(`group_${field}`)
      .classList.add('form_group-correct');
    document
      .querySelector(`#group_${field} i`)
      .classList.add('fa-check-circle');
    document
      .querySelector(`#group_${field} i`)
      .classList.remove('fa-times-circle');
    document
      .querySelector(`#group_${field} .form_input-error`)
      .classList.remove('form_input-error-active');
    fields[field] = true;
  } else {
    document
      .getElementById(`group_${field}`)
      .classList.add('form_group-incorrect');
    document
      .getElementById(`group_${field}`)
      .classList.remove('form_group-correct');
    document
      .querySelector(`#group_${field} i`)
      .classList.add('fa-times-circle');
    document
      .querySelector(`#group_${field} i`)
      .classList.remove('fa-check-circle');
    document
      .querySelector(`#group_${field} .form_input-error`)
      .classList.add('form_input-error-active');
    fields[field] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validateForm); //dentro
  input.addEventListener('blur', validateForm); //fuera
});

form_section.addEventListener('submit', (e) => {
  e.preventDefault();
  // validacion de botones checkbox
  const cb = document.querySelectorAll(`label input:checked`);
  if (cb.length === 0) {
    e.preventDefault();
    console.log(cb);
    span_cb_validation.innerHTML = `You have chosen ${cb.length}`;
  }

  if (fields.name && fields.email && fields.phone) {
    form_section.reset();

    document
      .getElementById('form_message-exit')
      .classList.add('form_message-exit-active');

    setTimeout(() => {
      document
        .getElementById('form_message-exit')
        .classList.remove('form_message-exit-active');
    }, 5000);

    document.querySelectorAll('.form_group-correct').forEach((icono) => {
      icono.classList.remove('form_group-correct');
    });
    document
      .getElementById('form_message')
      .classList.remove('form_message-active');
  } else {
    document
      .getElementById('form_message')
      .classList.add('form_message-active');
  }
});
