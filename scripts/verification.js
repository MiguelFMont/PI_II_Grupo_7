document.addEventListener("DOMContentLoaded", () => {
  const codeInputs = document.querySelectorAll(".code-input");

  codeInputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
      const key = e.key;

      // Permitir teclas de controle
      if (["Backspace", "Tab", "ArrowLeft", "ArrowRight"].includes(key)) {
        // Se apertar Backspace e o campo estiver vazio, volta pro anterior
        if (key === "Backspace" && !input.value && index > 0) {
          codeInputs[index - 1].focus();
        }
        return;
      }

      // Bloquear qualquer coisa que não seja número
      if (!/^[0-9]$/.test(key)) {
        e.preventDefault();
      }
    });

    input.addEventListener("input", () => {
      // Mantém só números e 1 dígito
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);

      // Se tiver um número e houver próximo input, foca nele
      if (input.value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData)
        .getData("text")
        .replace(/[^0-9]/g, "")
        .slice(0, codeInputs.length);

      // Distribui o texto colado pelos inputs
      paste.split("").forEach((char, i) => {
        if (codeInputs[index + i]) {
          codeInputs[index + i].value = char;
        }
      });

      // Foca no último input preenchido
      const lastFilled = index + paste.length - 1;
      if (codeInputs[lastFilled]) {
        codeInputs[lastFilled].focus();
      }
    });
  });
});
