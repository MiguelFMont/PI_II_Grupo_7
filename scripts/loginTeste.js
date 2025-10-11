// loginTeste.js - versão final com redirecionamento

const emailPadrao = "teste123@gmail.com";
const senhaPadrao = "12345";

const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#password");
const botaoLogin = document.querySelector(".buttonLogin");

const originalLabels = {
    email: "Endereço de e-mail",
    password: "Senha"
};

const errorMessage = document.createElement("p");
errorMessage.textContent = "E-mail ou senha incorretos.";
errorMessage.style.color = "var(--color4)";
errorMessage.style.textAlign = "center";
errorMessage.style.display = "none";
errorMessage.style.marginTop = "10px";
document.querySelector(".buttonsCheck").after(errorMessage);

let loginComErro = false;

botaoLogin.addEventListener("click", (event) => {
    event.preventDefault();

    const emailDigitado = inputEmail.value.trim();
    const senhaDigitada = inputSenha.value.trim();

    limparErros(false);

    let erroEmail = false;
    let erroSenha = false;

    if (emailDigitado === "") {
        erroEmail = true;
        marcarErroCampo(inputEmail, "Campo não preenchido");
    }

    if (senhaDigitada === "") {
        erroSenha = true;
        marcarErroCampo(inputSenha, "Campo não preenchido");
    }

    if (erroEmail || erroSenha) return;

    if (emailDigitado === emailPadrao && senhaDigitada === senhaPadrao) {
        console.log("✅ Login correto!");
        errorMessage.style.display = "none";
        loginComErro = false;

        // Redirecionar para a página mainPages.html
        window.location.href = "pages/mainPage.html";
    } else {
        console.log("❌ E-mail ou senha incorretos.");
        marcarErroCampo(inputEmail, originalLabels.email);
        marcarErroCampo(inputSenha, originalLabels.password);
        errorMessage.style.display = "block";
        loginComErro = true;
    }
});

function marcarErroCampo(input, novoTextoLabel) {
    const parent = input.parentElement;
    const label = parent.querySelector("label");
    parent.classList.add("error");
    label.textContent = novoTextoLabel;
    label.style.color = "black";
}

function limparErros(limparCampos = true) {
    [inputEmail, inputSenha].forEach((input) => {
        const parent = input.parentElement;
        const label = parent.querySelector("label");

        label.textContent = originalLabels[input.id];
        label.style.color = "";

        if (limparCampos) input.value = "";
        input.parentElement.classList.remove("error");
    });

    errorMessage.style.display = "none";
}

[inputEmail, inputSenha].forEach((input) => {
    input.addEventListener("focus", () => {
        const label = input.parentElement.querySelector("label");

        if (label.textContent === "Campo não preenchido") {
            label.textContent = originalLabels[input.id];
        }

        if (loginComErro) {
            inputEmail.value = "";
            inputSenha.value = "";
            limparErros(false);
            inputEmail.parentElement.classList.remove("error");
            inputSenha.parentElement.classList.remove("error");
            loginComErro = false;
        }
    });

    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            input.parentElement.classList.remove("error");
        }
    });
});