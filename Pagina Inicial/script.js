document.addEventListener('DOMContentLoaded', function () {
    function exibirFuncionario(id, status, nome, trabalho, email, telefone, horario) {
        const tableBody = document.querySelector('tbody');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${id}</td>
            <td><span class="status ${status.toLowerCase()}">${status}</span></td>
            <td>${nome}</td>
            <td>${trabalho}</td>
            <td>${email}</td>
            <td>${telefone}</td>
            <td>${horario}</td>
            <td>
                <button class="edit-button" data-id="${id}">Editar</button>
                <button class="delete-button" data-id="${id}">Excluir</button>
            </td>
        `;

        tableBody.appendChild(row);

        row.querySelector('.edit-button').addEventListener('click', function () {
            editarFuncionario(id);
        });

        row.querySelector('.delete-button').addEventListener('click', function () {
            excluirFuncionario(id);
        });
    }

    function editarFuncionario(id) {
        const row = document.querySelector(`button[data-id='${id}']`).closest('tr');
        const colunas = row.querySelectorAll('td');

        const novoNome = prompt("Digite um novo nome:", colunas[2].innerText);
        const novoTrabalho = prompt("Digite um novo trabalho:", colunas[3].innerText);
        const novoEmail = prompt("Digite um novo Email:", colunas[4].innerText);
        const novoTelefone = prompt("Digite um novo telefone:", colunas[5].innerText);
        const novoHorario = prompt("Digite um novo horário:", colunas[6].innerText);
        const novoStatus = prompt("Digite um novo status (Ativo, Inativo):", colunas[1].innerText);

        if (novoNome) colunas[2].innerText = novoNome;
        if (novoTrabalho) colunas[3].innerText = novoTrabalho;
        if (novoEmail) colunas[4].innerText = novoEmail;
        if (novoTelefone) colunas[5].innerText = novoTelefone;
        if (novoHorario) colunas[6].innerText = novoHorario;

        if (novoStatus) {
            const statusSpan = colunas[1].querySelector('.status');
            statusSpan.classList.remove('ativo', 'inativo');
            if (novoStatus.toLowerCase() === 'ativo') {
                statusSpan.classList.add('ativo');
                statusSpan.innerText = 'Ativo';
            } else if (novoStatus.toLowerCase() === 'inativo') {
                statusSpan.classList.add('inativo');
                statusSpan.innerText = 'Inativo';
            }
        }

        salvarLocalStorage();
    }

    function excluirFuncionario(id) {
        const row = document.querySelector(`button[data-id='${id}']`).closest('tr');
        row.remove();

        salvarLocalStorage();
    }

    function salvarLocalStorage() {
        const funcionarios = [];
        const tableRows = document.querySelectorAll('tbody tr');

        tableRows.forEach(row => {
            const columns = row.querySelectorAll('td');
            const funcionario = {
                id: columns[0].innerText,
                status: columns[1].innerText,
                nome: columns[2].innerText,
                trabalho: columns[3].innerText,
                email: columns[4].innerText,
                telefone: columns[5].innerText,
                horario: columns[6].innerText
            };
            funcionarios.push(funcionario);
        });

        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
    }

    function carregarLocalStorage() {
        const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
        funcionarios.forEach(funcionario => {
            exibirFuncionario(funcionario.id, funcionario.status, funcionario.nome, funcionario.trabalho, funcionario.email, funcionario.telefone, funcionario.horario);
        });
    }

    function processarCSV(csvContent) {
        const linhas = csvContent.split('\n');
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = ''; 

        linhas.forEach((linha, index) => {
            if (index > 0 && linha.trim() !== '') {
                const colunas = linha.split(',');
                exibirFuncionario(...colunas.map(coluna => coluna.trim()));
            }
        });
        
        salvarLocalStorage();
    }

    carregarLocalStorage();

    document.getElementById('importCsvButton').addEventListener('click', function () {
        const inputFile = document.getElementById('csvFileInput').files[0];
        if (inputFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                processarCSV(e.target.result);
            };
            reader.readAsText(inputFile);
        } else {
            alert('Por favor, selecione um arquivo CSV!');
        }
    });

    document.getElementById('saveCsvButton').addEventListener('click', salvarCSV);

    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();
        const tableRows = document.querySelectorAll('tbody tr');

        tableRows.forEach(function (row) {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? '' : 'none';
        });
    });

    exibirFuncionario(1, 'Ativo', 'João Silva', 'Segurança', 'joao.silva@example.com', '123456789', '08:00 - 17:00');
    exibirFuncionario(2, 'Inativo', 'Maria Santos', 'Recepcionista', 'maria.santos@example.com', '987654321', '09:00 - 18:00');
    exibirFuncionario(3, 'Ativo', 'Carlos Souza', 'Manutenção', 'carlos.souza@example.com', '456789123', '10:00 - 19:00');
});
