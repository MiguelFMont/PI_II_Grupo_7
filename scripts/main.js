// main.js
document.addEventListener("DOMContentLoaded", () => {
    // --- LOGIN ---
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuario) {
        const nomeEl = document.querySelector(".titleUser h1");
        const emailEl = document.querySelector(".titleUser p");

        if (nomeEl) {
            const partesNome = usuario.nome.trim().split(/\s+/);

            let primeiro = partesNome[0];
            let segundoMenor = "";

            if (partesNome.length > 1) {
                const restantes = partesNome.slice(1);

                // filtra só nomes com 4 ou mais letras
                const nomesValidos = restantes.filter(n => n.length >= 4);

                if (nomesValidos.length > 0) {
                    // pega o menor entre os válidos (pelo tamanho)
                    segundoMenor = nomesValidos.reduce((menor, atual) =>
                        atual.length < menor.length ? atual : menor
                    );
                } else {
                    // se nenhum tiver 4+ letras, usa o último nome
                    segundoMenor = partesNome[partesNome.length - 1];
                }
            }

            // função para deixar a primeira letra maiúscula
            const formatarNome = (nome) =>
                nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();

            const nomeFormatado = segundoMenor
                ? `${formatarNome(primeiro)} ${formatarNome(segundoMenor)}`
                : formatarNome(primeiro);

            nomeEl.textContent = nomeFormatado;
            nomeEl.style.whiteSpace = "nowrap"; // impede quebra de linha
        }

        if (emailEl) emailEl.textContent = usuario.email;
    } else {
        window.location.href = "../index.html";
        return;
    }

    // --- LOGOUT ---
    const logoutBtn = document.querySelector("#logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.href = "../index.html";
        });
    }

    // --- VARIÁVEIS GERAIS ---
    const links = document.querySelectorAll(".content ul li a");
    const paginas = {
        "dashboard": "./components/dashboard.html",
        "instituições": "./components/instituicoes.html",
        "diciplinas": "./components/diciplina.html",
        "turmas": "./components/turmas.html"
    };

    // --- FUNÇÃO PARA CARREGAR UMA PÁGINA ---
    async function carregarPagina(nome) {
        links.forEach(l => l.classList.remove("ativo"));

        const link = Array.from(links).find(l =>
            l.querySelector("p").textContent.trim().toLowerCase() === nome
        );
        if (link) link.classList.add("ativo");

        document.querySelectorAll(".pagesContent > div").forEach(div => {
            div.style.display = "none";
        });

        const divAtual = document.querySelector(`.${nome}`);
        if (divAtual) {
            divAtual.style.display = "block";

            try {
                const res = await fetch(paginas[nome]);
                const html = await res.text();
                divAtual.innerHTML = html;
            } catch (error) {
                console.error("Erro ao carregar página:", error);
                divAtual.innerHTML = "<p>Erro ao carregar página.</p>";
            }
        }
    }

    // --- EVENTOS DOS LINKS ---
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const nome = link.querySelector("p").textContent.trim().toLowerCase();
            carregarPagina(nome);
        });
    });

    // --- AO INICIAR: CARREGAR "DASHBOARD" ---
    carregarPagina("dashboard");

    // --- LINK "CADASTRAR INSTITUIÇÃO" ---
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const texto = link.textContent.toLowerCase();

        if (texto.includes("cadastrar instituição") || link.id === "instituicoes") {
            e.preventDefault();
            carregarPagina("instituições");
        }
    });
});