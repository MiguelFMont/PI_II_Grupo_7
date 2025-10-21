// main.js
document.addEventListener("DOMContentLoaded", () => {
    // --- LOGIN ---
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuario) {
        const nomeEl = document.querySelector(".titleUser h1");
        const emailEl = document.querySelector(".titleUser p");
        if (nomeEl) nomeEl.textContent = usuario.nome;
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
        // Remove o "ativo" de todos os links
        links.forEach(l => l.classList.remove("ativo"));

        // Acha o link correspondente e marca como ativo
        const link = Array.from(links).find(l =>
            l.querySelector("p").textContent.trim().toLowerCase() === nome
        );
        if (link) link.classList.add("ativo");

        // Esconde todas as divs
        document.querySelectorAll(".pagesContent > div").forEach(div => {
            div.style.display = "none";
        });

        // Mostra e carrega a div correta
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
});
// main.js
document.addEventListener("DOMContentLoaded", () => {
    // --- LOGIN ---
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuario) {
        const nomeEl = document.querySelector(".titleUser h1");
        const emailEl = document.querySelector(".titleUser p");
        if (nomeEl) nomeEl.textContent = usuario.nome;
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
        // Remove o "ativo" de todos os links
        links.forEach(l => l.classList.remove("ativo"));

        // Acha o link correspondente e marca como ativo
        const link = Array.from(links).find(l =>
            l.querySelector("p").textContent.trim().toLowerCase() === nome
        );
        if (link) link.classList.add("ativo");

        // Esconde todas as divs
        document.querySelectorAll(".pagesContent > div").forEach(div => {
            div.style.display = "none";
        });

        // Mostra e carrega a div correta
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
});