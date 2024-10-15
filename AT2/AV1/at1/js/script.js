let registros = JSON.parse(sessionStorage.getItem('registros')) || [];

let btnAdicionar = document.querySelector('.btn-primary');
let nomeInput = document.querySelector('#nome');
let idadeInput = document.querySelector('#idade');
let salarioInput = document.querySelector('#salario');
let sexoSelect = document.querySelector('#login');
btnAdicionar.addEventListener('click', function () {
    let nome = nomeInput.value.trim();
    let idade = parseInt(idadeInput.value);
    let salario = parseFloat(salarioInput.value);
    let sexo = sexoSelect.value;

    if (nome.split(' ').length < 2) {
        alert("O nome completo deve conter pelo menos um nome e um sobrenome.");
        return;
    }

    if (idade < 15 || idade > 119) {
        alert("A idade deve ser maior que 14 e menor que 120.");
        return;
    }

    if (salario < 1500 || salario > 15000) {
        alert("O salário deve ser entre 1500 e 15000.");
        return;
    }

    if (registros.length < 3) {
        registros.push({ nome, idade, salario, sexo });
        sessionStorage.setItem('registros', JSON.stringify(registros));
        nomeInput.value = '';
        idadeInput.value = '';
        salarioInput.value = '';
        sexoSelect.value = '';
    }

    if (registros.length === 3) {
        exibirRegistros();
    } else {
        alert(`Registros: ${registros.length}/3. Continue preenchendo!`);
    }
});

function exibirRegistros() {
    let tabelaCorpo = document.querySelector('#tabelaCorpo');
    tabelaCorpo.innerHTML = '';

    registros.forEach(registro => {
        let row = `<tr>
                        <td>${registro.nome}</td>
                        <td>${registro.idade}</td>
                        <td>${registro.salario.toFixed(2)}</td>
                        <td>${registro.sexo}</td>
                     </tr>`;
        tabelaCorpo.innerHTML += row;
    });

    document.querySelector('#registros').style.display = 'table';
    bloquearCampos();

    console.log("Registros armazenados no sessionStorage:", sessionStorage.getItem('registros'));
}

function bloquearCampos() {
    nomeInput.disabled = true;
    idadeInput.disabled = true;
    salarioInput.disabled = true;
    sexoSelect.disabled = true;
    btnAdicionar.innerText = "Recomeçar";
    btnAdicionar.onclick = recomeçar;
}

function recomeçar() {
    registros = [];
    sessionStorage.removeItem('registros');
    document.querySelector('#tabelaCorpo').innerHTML = '';
    document.querySelector('#registros').style.display = 'none';
    nomeInput.value = '';
    idadeInput.value = '';
    salarioInput.value = '';
    sexoSelect.value = '';
    nomeInput.disabled = false;
    idadeInput.disabled = false;
    salarioInput.disabled = false;
    sexoSelect.disabled = false;
    btnAdicionar.innerText = "+";
    btnAdicionar.onclick = null;
}
