// /js/form.js

function mapValue(feature, value) {
    const mappings = {
        'bruises': { 't': 'Sim (t)', 'f': 'Não (f)' },
        'cap-shape': { 'b': 'Campanulada (b)', 'c': 'Côncava (c)', 'x': 'Plana (x)', 'f': 'Convexa-olíparo (f)', 'k': 'Conicamente (k)' },
        'cap-surface': { 's': 'Suave (s)', 'f': 'Fio (f)', 'g': 'Fibroso (g)', 'y': 'Liso (y)' },
        'cap-color': { 'w': 'Branco (w)', 'n': 'Marrom (n)', 'b': 'Azul (b)', 'c': 'Cinza (c)', 'g': 'Verde (g)', 'r': 'Vermelho (r)', 'p': 'Roxo (p)', 'u': 'Preto (u)', 'e': 'Outra (e)', 'y': 'Outra (y)' },
        'odor': { 'l': 'Anisado (l)', 'p': 'Pungente (p)', 'a': 'Alho (a)', 'f': 'Nenhum (f)', 'y': 'Frutado (y)', 'm': 'Acentuado (m)', 'n': 'Outro (n)' },
        'gill-attachment': { 'a': 'Aberto (a)', 'd': 'Em Peito (d)', 'f': 'Em Peito, Livre (f)', 'n': 'Livre (n)' },
        'gill-spacing': { 'w': 'Largo (w)', 'c': 'Cego (c)' },
        'gill-size': { 'n': 'Narrow (n)', 'b': 'Broad (b)' },
        'gill-color': { 'k': 'Preto (k)', 'n': 'Marrom (n)', 'b': 'Azul (b)', 'h': 'Verde (h)', 'g': 'Cinza (g)', 'r': 'Laranja (r)', 'o': 'Roxo (o)', 'p': 'Preto - Uma Tonalidade (p)', 'u': 'Marrom - Uma Tonalidade (u)', 'e': 'Branco (e)', 'w': 'Amarelo (w)', 'y': 'Outra (y)' },
        'stalk-shape': { 'e': 'Alargado (e)', 't': 'Afusado (t)' },
        'stalk-root': { 'e': 'Removível (e)', 'c': 'Removível, Com Pilhas (c)', 'u': 'Não Removível (u)', 'b': 'Embrenhado (b)', 'r': 'Amarrado (r)', '?': 'Desconhecido (?)' },
        'stalk-surface-above-ring': { 's': 'Suave (s)', 'f': 'Fio (f)', 'y': 'Liso (y)' },
        'stalk-surface-below-ring': { 's': 'Suave (s)', 'f': 'Fio (f)', 'y': 'Liso (y)' },
        'stalk-color-above-ring': { 'w': 'Branco (w)', 'y': 'Amarelo (y)', 'g': 'Cinza (g)', 'p': 'Pardo (p)', 'c': 'Cinza-Claro (c)', 'b': 'Azul (b)', 'n': 'Marrom (n)', 'e': 'Outra (e)' },
        'stalk-color-below-ring': { 'w': 'Branco (w)', 'y': 'Amarelo (y)', 'g': 'Cinza (g)', 'p': 'Pardo (p)', 'c': 'Cinza-Claro (c)', 'b': 'Azul (b)', 'n': 'Marrom (n)', 'e': 'Outra (e)' },
        'veil-type': { 'p': 'Parcial (p)', 'u': 'Outro (u)' },
        'veil-color': { 'w': 'Branco (w)', 'y': 'Amarelo (y)', 'u': 'Outro (u)' },
        'ring-number': { 'o': 'Um (o)', 't': 'Dois (t)' },
        'ring-type': { 'p': 'Pendente (p)', 'e': 'Interno (e)', 's': 'Sem Anel (s)', 'f': 'Firme (f)', 'l': 'Largo (l)', 'n': 'Outro (n)' },
        'spore-print-color': { 'n': 'Marrom (n)', 'k': 'Preto (k)', 'b': 'Azul (b)', 'h': 'Verde (h)', 'r': 'Vermelho (r)', 'o': 'Roxo (o)', 'u': 'Amarelo (u)', 'w': 'Branco (w)', 'y': 'Outra (y)' },
        'population': { 'n': 'Numeroso (n)', 'a': 'Aglomerado (a)', 'c': 'Contínuo (c)', 's': 'Espalhado (s)', 'v': 'Ausente (v)' },
        'habitat': { 'g': 'Grama (g)', 'l': 'Pastagem (l)', 'd': 'Deserto (d)', 'w': 'Floresta (w)', 'm': 'Montanha (m)', 'u': 'Outro (u)' }
    };

    return mappings[feature] && mappings[feature][value] ? mappings[feature][value] : value;
}

function loadHistory() {
    const accessToken = localStorage.getItem('access_token');
    const historyTableBody = document.querySelector('#historyTable tbody');

    fetch('http://localhost:5000/api/v1/mushroom/history', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na resposta do servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            data.forEach(entry => {
                const row = document.createElement('tr');

                // Coletar todas as features exceto datetime, class_value, confidence, id
                const features = Object.keys(entry)
                    .filter(key => !['datetime', 'class_value', 'confidence', 'id'].includes(key))
                    .map(key => `${mapValue(key, entry[key])}`)
                    .join(', ');

                // Classe
                const classe = entry['class_value'] === 'e' ? 'Comestível (e)' : 'Venenoso (p)';

                // Resultado
                const resultadoClass = entry['class_value'] === 'e' ? 'edible' : 'poisonous';
                const resultadoTexto = entry['class_value'] === 'e' ? 'Comestível' : 'Venenoso';
                const resultado = entry['confidence'] !== null ? `(${entry['confidence']}%)` : '(Confiança não disponível)';

                row.innerHTML = `
                    <td>${new Date(entry.datetime).toLocaleString('pt-BR')}</td>
                    <td>${classe}</td>
                    <td>${features}</td>
                    <td class="${resultadoClass}">
                        ${resultadoTexto} ${resultado}
                    </td>
                `;
                historyTableBody.appendChild(row);
            });
        } else {
            console.warn('Formato de histórico inválido recebido da API.');
        }
    })
    .catch(error => {
        console.error('Erro ao carregar histórico:', error);
    });
}

document.getElementById('mushroomForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const jsonInput = document.getElementById('jsonInput').value.trim();
    const spinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.style.display = 'none';
    errorMessage.innerText = '';

    let formData;
    try {
        formData = JSON.parse(jsonInput);
    } catch (error) {
        errorMessage.innerText = 'JSON inválido. Por favor, verifique a formatação.';
        errorMessage.style.display = 'block';
        return;
    }

    const requiredFields = [
        "cap-shape", "cap-surface", "cap-color", "bruises", "odor",
        "gill-attachment", "gill-spacing", "gill-size", "gill-color",
        "stalk-shape", "stalk-root", "stalk-surface-above-ring",
        "stalk-surface-below-ring", "stalk-color-above-ring",
        "stalk-color-below-ring", "veil-type", "veil-color",
        "ring-number", "ring-type", "spore-print-color",
        "population", "habitat"
    ];

    for (const field of requiredFields) {
        if (!formData.hasOwnProperty(field) || formData[field] === "") {
            errorMessage.innerText = `Por favor, preencha o campo "${field}".`;
            errorMessage.style.display = 'block';
            return;
        }
    }

    spinner.style.display = 'block';

    const accessToken = localStorage.getItem('access_token');

    fetch('http://localhost:5000/api/v1/mushroom/classify', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na resposta do servidor: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        spinner.style.display = 'none';

        if (data.class && data.confidence !== undefined) {
            const resultData = {
                class: data.class,
                confidence: data.confidence,
                timestamp: new Date().toLocaleString('pt-BR')
            };
            localStorage.setItem('latest_result', JSON.stringify(resultData));
            window.location.href = 'result.html';
        } else {
            errorMessage.innerText = 'Falha na classificação. Tente novamente.';
            errorMessage.style.display = 'block';
        }
    })
    .catch(error => {
        spinner.style.display = 'none';
        console.error('Erro na classificação:', error);
        errorMessage.innerText = 'Ocorreu um erro. Por favor, tente novamente mais tarde.';
        errorMessage.style.display = 'block';
    });
});

document.addEventListener('DOMContentLoaded', loadHistory);
