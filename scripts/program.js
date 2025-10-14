const createBody = document.querySelector(".createBody");
const closeBtn = document.querySelector(".closeCreateClass");
const criarTurmaBtn = document.getElementById("criarTurmaBtn");
const cancelar = document.querySelector(".bntNo")
const sim = document.querySelector(".bntYes")
const closedCreate = document.querySelector(".closedCreate")

criarTurmaBtn.addEventListener("click", () => {
    createBody.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    closedCreate.classList.add("active");
});

cancelar.addEventListener("click", () => {
    closedCreate.classList.remove("active")
});

sim.addEventListener("click", () => {
    closedCreate.classList.remove("active")
    createBody.classList.remove("active")

    const inputs = createBody.querySelectorAll("input, select");
    inputs.forEach(el => {
        if (el.tagName === "SELECT") {
            el.selectedIndex = 0;
        } else {
            el.value = "";
        }
    });
});