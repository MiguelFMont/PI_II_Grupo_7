

// auth.js — Login e Cadastro unificados com localStorage

// --- Chave localStorage ---
const STORAGE_KEY = "usuariosNotaDez";

// --- Carrega usuários do localStorage ou inicializa com padrão ---
let usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { email: "teste123@gmail.com", senha: "12345", nome: "João Teste", telefone: "(11)12345-6789" }
];

// --- Seleção de inputs ---
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#password");
const inputNome = document.querySelector("#name");
const inputTelefone = document.querySelector("#telefone");

const telefoneInput = document.getElementById('telefone');

// telefoneInput.addEventListener('input', (e) => {
//     let valor = e.target.value.replace(/\D/g, ''); // só números

//     // Se o campo estiver vazio, não mostra nada
//     if (valor.length === 0) {
//         e.target.value = '';
//         return;
//     }

//     // Remove tudo que não for número
//     valor = valor.replace(/\D/g, '');

//     // Aplica a máscara (99) 99999-9999 ou (99) 9999-9999
//     if (valor.length > 10) {
//         // Celular com 11 dígitos
//         valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
//     } else if (valor.length > 6) {
//         // Telefone fixo com 10 dígitos
//         valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
//     } else if (valor.length > 2) {
//         // Só DDD e começo do número
//         valor = valor.replace(/(\d{2})(\d{0,5})/, '($1) $2');
//     } else {
//         // Apenas começando a digitar o DDD
//         valor = valor.replace(/(\d*)/, '($1');
//     }

//     e.target.value = valor;
// });

// --- Botões ---
const botaoLogin = document.querySelector(".buttonLogin");
const botaoCadastro = document.querySelector(".buttonSignUp");

// --- Labels originais ---
const originalLabels = {
    email: "Endereço de e-mail",
    password: "Senha",
    name: "Nome",
    telefone: "Telefone"
};

// --- Mensagem de erro centralizada ---
let errorMessage = document.querySelector(".auth-error-message");
if (!errorMessage) {
    errorMessage = document.createElement("p");
    errorMessage.className = "auth-error-message";
    errorMessage.textContent = "Dados incorretos ou incompletos.";
    errorMessage.style.color = "var(--color4)";
    errorMessage.style.textAlign = "center";
    errorMessage.style.display = "none";
    errorMessage.style.marginTop = "10px";
    const buttonsCheck = document.querySelector(".buttonsCheck");
    if (buttonsCheck) buttonsCheck.after(errorMessage);
}

// estado de erro
let erroAtivo = false;

// --- Helpers ---
function marcarErroCampo(input, msg) {
    if (!input || !input.parentElement) return;
    const parent = input.parentElement;
    const label = parent.querySelector("label");
    parent.classList.add("error");
    if (label) {
        label.textContent = msg;
        label.style.color = "var(--color4)";
    }
}

function limparErroCampo(input) {
    if (!input || !input.parentElement) return;
    const parent = input.parentElement;
    const label = parent.querySelector("label");
    parent.classList.remove("error");
    if (label) {
        label.textContent = originalLabels[input.id] || originalLabels[input.name] || label.textContent;
        label.style.color = "";
    }
}

function salvarUsuarios() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
}

function validarCamposVazios(campos) {
    let erro = false;
    campos.forEach((input) => {
        if (!input) return;
        if (input.value.trim() === "") {
            marcarErroCampo(input, "Campo não preenchido");
            erro = true;
        }
    });
    return erro;
}

// --- LOGIN ---
if (botaoLogin) {
    botaoLogin.addEventListener("click", (e) => {
        if (e) e.preventDefault();
        [inputEmail, inputSenha].forEach(limparErroCampo);
        if (validarCamposVazios([inputEmail, inputSenha])) return;

        const emailDigitado = inputEmail.value.trim();
        const senhaDigitada = inputSenha.value.trim();

        const usuario = usuarios.find(u => u.email === emailDigitado && u.senha === senhaDigitada);

        if (usuario) {
            errorMessage.style.display = "none";
            erroAtivo = false;

            // 🟢 Salva nome e email do usuário logado
            localStorage.setItem("usuarioLogado", JSON.stringify({
                nome: usuario.nome,
                email: usuario.email
            }));

            window.location.href = "pages/mainPage.html";
        } else {
            marcarErroCampo(inputEmail, originalLabels.email);
            marcarErroCampo(inputSenha, originalLabels.password);
            errorMessage.style.display = "block";
            erroAtivo = true;
        }
    });
}

// --- CADASTRO ---
if (botaoCadastro) {
    botaoCadastro.addEventListener("click", (e) => {
        if (e) e.preventDefault();

        const campos = [inputNome, inputEmail, inputTelefone, inputSenha];
        let algumErro = false;

        // limpa erros anteriores
        campos.forEach(limparErroCampo);

        if (validarCamposVazios(campos)) return;

        const nomeDigitado = inputNome.value.trim();
        const emailDigitado = inputEmail.value.trim();
        const telefoneDigitado = inputTelefone.value.trim();
        const senhaDigitada = inputSenha.value.trim();

        // validações individuais
        const nomeValido = nomeDigitado.split(" ").filter(p => p.length > 0).length >= 2;
        if (!nomeValido) { marcarErroCampo(inputNome, "Digite nome e sobrenome"); algumErro = true; }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailDigitado);
        if (!emailValido) { marcarErroCampo(inputEmail, "Email inválido"); algumErro = true; }

        const telefoneLimpo = telefoneDigitado.replace(/[^\d]/g, "");
        const telefoneValido = telefoneLimpo.length >= 8;
        if (!telefoneValido) { marcarErroCampo(inputTelefone, "Telefone inválido"); algumErro = true; }

        const senhaValida = senhaDigitada.length >= 8;
        if (!senhaValida) { marcarErroCampo(inputSenha, "Senha deve ter 8+ caracteres"); algumErro = true; }

        // email já cadastrado
        if (usuarios.some(u => u.email === emailDigitado)) {
            marcarErroCampo(inputEmail, "Email já cadastrado");
            algumErro = true;
        }

        if (algumErro) {
            errorMessage.style.display = "block";
            erroAtivo = true;
            return;
        }

        // // cadastro válido
        // usuarios.push({ nome: nomeDigitado, email: emailDigitado, telefone: telefoneDigitado, senha: senhaDigitada });


        // salvarUsuarios();

        // errorMessage.style.display = "none";
        // alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
        // window.location.href = "../index.html";

        fetch("http://localhost:3000/enviar-codigo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nomeDigitado,
                email: emailDigitado
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.message);
                alert("Cadastro realizado e e-mail enviado com sucesso!");
                // redireciona após o sucesso
                window.location.href = "../pages/pageVerification.html";
            })
            .catch(err => {
                console.error("Erro ao enviar e-mail:", err);
                alert("Cadastro feito, mas ocorreu erro ao enviar o e-mail.");
            });

    });
}

// --- Foco e digitação ---
[inputEmail, inputSenha, inputNome, inputTelefone].forEach((input) => {
    if (!input) return;

    input.addEventListener("focus", () => {
        const label = input.parentElement ? input.parentElement.querySelector("label") : null;
        if (label && label.textContent.includes("Campo não preenchido")) {
            label.textContent = originalLabels[input.id] || originalLabels[input.name] || label.textContent;
            label.style.color = "";
        }

        if (erroAtivo) {
            // limpa somente o campo que o usuário clicou
            if (input.parentElement) input.parentElement.classList.remove("error");
            if (input) input.value = "";
            if (label) label.style.color = "";
        }
    });

    input.addEventListener("input", () => {
        if (input.value.trim() !== "" && input.parentElement) {
            input.parentElement.classList.remove("error");
            const label = input.parentElement.querySelector("label");
            if (label) label.style.color = "";
        }
    });
});