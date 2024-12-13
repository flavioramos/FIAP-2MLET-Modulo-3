// /js/auth.js

// Função para verificar autenticação
function checkAuthentication() {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
        // Se não houver token, redireciona para a página de login
        window.location.href = 'login.html';
    } else {
        // Opcional: Validar o token (ex: verificar expiração se for JWT)
        console.log('Usuário autenticado.');
    }
}

// Executa a verificação quando o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Ignorar verificação em páginas index.html e login.html
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage !== 'login.html' && currentPage !== 'index.html') {
        checkAuthentication();
    }
});


document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('access_token');
    window.location.href = 'login.html';
});
