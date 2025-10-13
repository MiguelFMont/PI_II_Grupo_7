async function loadComponent(id, file) {
    const container = document.getElementById(id);

    if (container) {
        try {
            const response = await fetch(file);
            const html = await response.text();
            container.innerHTML = html;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            const scripts = tempDiv.querySelectorAll('script[src]');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                newScript.src = oldScript.src;
                newScript.defer = true;
                document.body.appendChild(newScript);
            });
        } catch (error) {
            console.error("Erro ao carregar componente:", file, error);
        }
    }
}
