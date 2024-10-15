let registerButton = document.querySelector('.btn-register');
registerButton.addEventListener('click', function () {

    let nameInput = document.querySelector('input[placeholder="Name"]');
    let emailInput = document.querySelector('input[placeholder="Email adress"]');
    let passwordInput = document.querySelector('input[placeholder="Password"]');
    let confirmPasswordInput = document.querySelector('input[placeholder="Confirm passaword"]');

    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value.trim();
    let confirmPassword = confirmPasswordInput.value.trim();

    if (!name || !email || !password || !confirmPassword) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    let passwordPattern = /^(?=.*\d.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("A senha deve ter pelo menos 8 caracteres e pelo menos 2 números.");
        return;
    }

    let users = JSON.parse(sessionStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert("Email já cadastrado.");
        return;
    }

    users.push({ name, email });
    sessionStorage.setItem('users', JSON.stringify(users));

    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';

    showTable(users);
    registerButton.innerText = "UNLOCKER";
});

function showTable(users) {
    let table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            ${users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    document.body.appendChild(table);
    document.querySelectorAll('input').forEach(input => {
        input.disabled = true;
    });
}
