const listaUsuariosElement = document.createElement('ul');
document.body.appendChild(listaUsuariosElement);

// Carregar os usuários do arquivo JSON
fetch('js/usuarios.json') // Caminho correto para o arquivo JSON
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(usuarios => {
    for (let usuario of usuarios) {
      inserirUsuarioNaLista(usuario);
    }
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error));

function inserirUsuario() {
    const inputNome = document.querySelector('#nome');
    const inputIdade = document.querySelector('#idade');
    const inputCpf = document.querySelector('#cpf');

    if (inputNome.value && inputIdade.value && inputCpf.value) {
        const usuario = {
            nome: inputNome.value,
            idade: parseInt(inputIdade.value),
            cpf: inputCpf.value
        };

        inserirUsuarioNaLista(usuario);

        // Limpar os campos após a inserção
        inputNome.value = '';
        inputIdade.value = '';
        inputCpf.value = '';
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function inserirUsuarioNaLista(usuario) {
    const liElement = document.createElement('li');
    const botaoRemoverElement = document.createElement('button');
    botaoRemoverElement.textContent = 'X';
    botaoRemoverElement.addEventListener('click', () => {
        liElement.remove();
    });

    const spanElement = document.createElement('span');
    spanElement.innerHTML = `Nome: ${usuario.nome}<br>Idade: ${usuario.idade}<br>CPF: ${usuario.cpf}<br><br>`;

    spanElement.addEventListener('click', () => {
        const inputNome = document.createElement('input');
        inputNome.value = usuario.nome;
        const inputIdade = document.createElement('input');
        inputIdade.type = 'number';
        inputIdade.value = usuario.idade;
        const inputCpf = document.createElement('input');
        inputCpf.value = usuario.cpf;

        const saveEdit = (event) => {
            if (event.key === "Enter") {
                usuario.nome = inputNome.value;
                usuario.idade = parseInt(inputIdade.value);
                usuario.cpf = inputCpf.value;
                spanElement.innerHTML = `Nome: ${usuario.nome}<br>Idade: ${usuario.idade}<br>CPF: ${usuario.cpf}<br><br>`;
                liElement.insertBefore(spanElement, botaoRemoverElement);
                inputNome.remove();
                inputIdade.remove();
                inputCpf.remove();
            }
        };

        inputNome.addEventListener('keydown', saveEdit);
        inputIdade.addEventListener('keydown', saveEdit);
        inputCpf.addEventListener('keydown', saveEdit);

        liElement.insertBefore(inputNome, botaoRemoverElement);
        liElement.insertBefore(inputIdade, botaoRemoverElement);
        liElement.insertBefore(inputCpf, botaoRemoverElement);
        spanElement.remove();
        inputNome.focus();
    });

    liElement.appendChild(spanElement);
    liElement.appendChild(botaoRemoverElement);
    listaUsuariosElement.appendChild(liElement);
}
