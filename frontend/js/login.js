// /js/login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o envio padrão do formulário

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const spinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    // Reseta a mensagem de erro
    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    // Validação básica
    if (!username || !password) {
        errorMessage.innerText = 'Por favor, preencha ambos os campos.';
        errorMessage.style.display = 'block';
        return;
    }

    // Exibe o spinner de carregamento
    spinner.style.display = 'block';

    // Envia requisição de login para o API externo
    fetch('http://localhost:5000/api/v1/auth/login', { // Atualize o URL se necessário
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        // Oculta o spinner
        spinner.style.display = 'none';

        if (data.access_token) {
            // Armazena o token no localStorage
            localStorage.setItem('access_token', data.access_token);
            // Redireciona para form.html
            window.location.href = 'form.html';
        } else {
            errorMessage.innerText = 'Falha no login. Verifique suas credenciais.';
            errorMessage.style.display = 'block';
        }
    })
    .catch(error => {
        // Oculta o spinner
        spinner.style.display = 'none';
        console.error('Erro durante o login:', error);
        errorMessage.innerText = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
        errorMessage.style.display = 'block';
    });
});
