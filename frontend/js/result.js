// /js/result.js

document.addEventListener('DOMContentLoaded', function() {
    const resultImage = document.getElementById('resultImage');
    const resultText = document.getElementById('resultText');
    const confidenceLevel = document.getElementById('confidenceLevel');
    const backButton = document.getElementById('backButton');

    // Obtém o último resultado armazenado
    const latestResult = JSON.parse(localStorage.getItem('latest_result'));

    if (latestResult) {
        // Define o texto do resultado
        const resultado = latestResult.class === 'e' ? 'Comestível' : 'Venenoso';
        resultText.innerText = `Resultado: ${resultado}`;

        // Define o nível de confiança
        confidenceLevel.innerText = `Confiança: ${latestResult.confidence}%`;

        // Define a imagem com base no resultado
        if (latestResult.class === 'e') {
            resultImage.style.backgroundImage = "url('assets/mario_ok.webp')"; // Atualizado para assets/mario_ok.webp
        } else {
            resultImage.style.backgroundImage = "url('assets/mario_not_ok.webp')"; // Atualizado para assets/mario_not_ok.webp
        }

        // Ajusta o tamanho da imagem para ser responsiva
        resultImage.style.width = '100%';
        resultImage.style.height = 'auto';
        resultImage.style.paddingBottom = '100%'; // Mantém a proporção 1:1
    } else {
        // Se não houver resultado, redireciona para form.html
        window.location.href = 'form.html';
    }

    // Função para voltar ao formulário
    backButton.addEventListener('click', function() {
        window.location.href = 'form.html';
    });
});
