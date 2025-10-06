
function main() {
    document.getElementById('btnCadastrar').addEventListener('click', async () => {
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('email').value;
  const senha = document.getElementById('email').value;

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, telefone, senha }),
  });

  const data = await res.json();
  document.getElementById('msg').textContent = data.message;
});
}