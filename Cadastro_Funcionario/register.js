document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;

    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name: name, email: email, password: password }));
        alert('Registro bem-sucedido! Redirecionando para o login.');
        window.location.href = 'login.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

document.querySelector('form').addEventListener('input', function(event) {
    const input = event.target;
    if (input.value.trim() === '') {
        input.style.borderColor = 'red';
    } else {
        input.style.borderColor = '#007bff';
    }
});