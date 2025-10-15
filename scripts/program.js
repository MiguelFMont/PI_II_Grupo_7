const createBody = document.querySelector(".createBody");
const closeBtn = document.querySelector(".closeCreateClass");
const criarTurmaBtn = document.getElementById("criarTurmaBtn");
const cancelar = document.querySelector(".bntNo");
const sim = document.querySelector(".bntYes");
const closedCreate = document.querySelector(".closedCreate");
const saveDicipline = document.getElementById("saveDicipline");
const bodyWithDicipline = document.querySelector(".bodyWithDicipline");
const containerTurmas = document.querySelector(".containerTurmas");
const plusDicipline = document.querySelector(".plusDicipline"); // botão +

let diciplineCount = 1; // contador para imagens

// deixar bodyWithDicipline invisível no início
bodyWithDicipline.style.display = "none";

// abrir createBody ao clicar no botão "Criar disciplina"
criarTurmaBtn.addEventListener("click", () => {
    createBody.classList.add("active");
});

// abrir createBody ao clicar no "+"
plusDicipline.addEventListener("click", () => {
    createBody.classList.add("active");
});

// fechar createBody
closeBtn.addEventListener("click", () => {
    const inputs = createBody.querySelectorAll("input, select");
    let temPreenchido = false;

    inputs.forEach(el => {
        if (el.tagName === "SELECT") {
            if (el.selectedIndex !== 0) temPreenchido = true;
        } else {
            if (el.value.trim() !== "") temPreenchido = true;
        }
    });

    if (temPreenchido) {
        closedCreate.classList.add("active");
    } else {
        createBody.classList.remove("active");
    }
});

cancelar.addEventListener("click", () => {
    closedCreate.classList.remove("active");
});

sim.addEventListener("click", () => {
    closedCreate.classList.remove("active");
    createBody.classList.remove("active");

    const inputs = createBody.querySelectorAll("input, select");
    inputs.forEach(el => {
        if (el.tagName === "SELECT") {
            el.selectedIndex = 0;
        } else {
            el.value = "";
        }
    });
});

// salvar dados e criar card de disciplina
saveDicipline.addEventListener("click", () => {
    const nomeInput = document.getElementById("nomeDaTurma");
    const codigoInput = document.getElementById("codigoDaTurma");
    const periodoSelect = document.getElementById("quantTurmas");

    let valido = true;

    // resetar estilos e mensagens
    [nomeInput, codigoInput, periodoSelect].forEach(el => {
        el.style.borderColor = "";
        if (el.previousElementSibling) el.previousElementSibling.textContent = "";
    });

    // valida nome obrigatório
    if (nomeInput.value.trim() === "") {
        nomeInput.style.borderColor = "var(--color4)";
        if (nomeInput.previousElementSibling) nomeInput.previousElementSibling.textContent = "Campo não preenchido";
        valido = false;
    }

    // valida código com exatamente 4 dígitos
    if (!/^\d{4}$/.test(codigoInput.value.trim())) {
        codigoInput.style.borderColor = "var(--color4)";
        if (codigoInput.previousElementSibling) codigoInput.previousElementSibling.textContent = "Código deve ter 4 dígitos";
        valido = false;
    }

    // valida select (value > 0)
    if (parseInt(periodoSelect.value) <= 0) {
        periodoSelect.style.borderColor = "var(--color4)";
        if (periodoSelect.previousElementSibling) periodoSelect.previousElementSibling.textContent = "Campo não preenchido";
        valido = false;
    }

    if (!valido) return;

    // primeira disciplina
    if (diciplineCount === 1) {
        const codeCard = document.getElementById("codeDiciplineCard");
        const nameCard = document.getElementById("nameDiciplineCard");
        const titleCard = document.querySelector(".imgDicipline h1");
        const img = document.querySelector(".imgDicipline img");

        codeCard.textContent = codigoInput.value.trim();
        nameCard.textContent = nomeInput.value.trim();
        titleCard.textContent = nomeInput.value.trim();
        img.src = `../assets/diciplina/um.png`;

        containerTurmas.style.display = "none";
        bodyWithDicipline.style.display = "flex";
    } else {
        const originalCard = document.querySelector(".dicipline");
        const newCard = originalCard.cloneNode(true);

        newCard.querySelector(".imgDicipline h1").textContent = nomeInput.value.trim();
        newCard.querySelector("#codeDiciplineCard").textContent = codigoInput.value.trim();
        newCard.querySelector("#nameDiciplineCard").textContent = nomeInput.value.trim();

        const img = newCard.querySelector(".imgDicipline img");
        img.src = `../assets/diciplina/${numeroEmPalavra(diciplineCount)}.png`;

        // inserir antes do plusDicipline para manter o + por último
        bodyWithDicipline.insertBefore(newCard, plusDicipline);
    }

    diciplineCount++;

    // fechar createBody e limpar campos
    createBody.classList.remove("active");
    const inputs = createBody.querySelectorAll("input, select");
    inputs.forEach(el => {
        if (el.tagName === "SELECT") el.selectedIndex = 0;
        else el.value = "";
    });
});

// função para converter número em palavra para imagens
function numeroEmPalavra(num) {
    const map = ["um","dois","tres","quatro","cinco","seis","sete","oito","nove","dez"];
    return map[num-1] || "um";
}