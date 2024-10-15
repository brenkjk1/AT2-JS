let registros = JSON.parse(sessionStorage.getItem('registros')) || [];

let btnRegistrar = document.querySelector('.btn-register');
let nomeInput = document.querySelector('input[placeholder="Name"]');
let emailInput = document.querySelector('input[placeholder="Email adress"]');
let senhaInput = document.querySelector('input[placeholder="Password"]');
let confirmarSenhaInput = document.querySelector('input[placeholder="Confirm passaword"]');

btnRegistrar.addEventListener('click', function () {
    let nome = nomeInput.value.trim();
    let email = emailInput.value.trim();
    let senha = senhaInput.value;
    let confirmarSenha = confirmarSenhaInput.value;

    if (nome.length < 1) {
        alert("O nome é obrigatório.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    if (isEmailRepetido(email)) {
        alert("Este email já está cadastrado.");
        return;
    }

    if (!senhaValida(senha)) {
        alert("A senha deve ter pelo menos 8 caracteres e conter pelo menos 2 números.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    if (registros.length < 2) {
        registros.push({ nome, email, senha });
        sessionStorage.setItem('registros', JSON.stringify(registros));
        nomeInput.value = '';
        emailInput.value = '';
        senhaInput.value = '';
        confirmarSenhaInput.value = '';
    }

    if (registros.length === 2) {
        exibirRegistros();
    } else {
        alert(`Registros: ${registros.length}/2. Continue preenchendo!`);
    }
});

function isEmailRepetido(email) {
    return registros.some(registro => registro.email === email);
}

function senhaValida(senha) {
    const regexNumeros = /.*\d.*\d/;
    return senha.length >= 8 && regexNumeros.test(senha);
}

function exibirRegistros() {
    alert("Cadastro concluído! Você pode iniciar o login.");

    let tabela = document.getElementById('tabelaRegistros');
    let tbody = tabela.querySelector('tbody');
    tbody.innerHTML = '';
    registros.forEach((registro, index) => {
        let row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'zebra' : '';
        row.innerHTML = `
            <td>${registro.nome}</td>
            <td>${registro.email}</td>
        `;
        tbody.appendChild(row);
    });

    tabela.style.display = 'table';
    bloquearCampos();
}

function bloquearCampos() {
    nomeInput.disabled = true;
    emailInput.disabled = true;
    senhaInput.disabled = true;
    confirmarSenhaInput.disabled = true;
    btnRegistrar.innerText = "Recomeçar";
    btnRegistrar.onclick = recomeçar;
}

function recomeçar() {
    registros = [];
    sessionStorage.removeItem('registros');
    nomeInput.value = '';
    emailInput.value = '';
    senhaInput.value = '';
    confirmarSenhaInput.value = '';
    nomeInput.disabled = false;
    emailInput.disabled = false;
    senhaInput.disabled = false;
    confirmarSenhaInput.disabled = false;
    btnRegistrar.innerText = "REGISTER";
    btnRegistrar.onclick = null;
}

function validateEmail(email) {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexEmail.test(email);
}