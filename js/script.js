document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout-button');
    const logoutMenu = document.getElementById('logout-menu');
    const logoutSubmit = document.getElementById('logout-submit'); // Pulsante Esci

    
    logoutButton.addEventListener('click', (event) => {
        event.preventDefault(); // Evita il comportamento predefinito del link
        logoutMenu.classList.toggle('hidden'); // Mostra o nasconde il menù
    });

 // Chiudi il menù se clicchi fuori
    document.addEventListener('click', (event) => {
        if (!logoutButton.contains(event.target) && !logoutMenu.contains(event.target)) {
            logoutMenu.classList.add('hidden');
        }
    });

    logoutSubmit.addEventListener('click', () => {
        localStorage.removeItem('jwt'); 
        localStorage.removeItem('username'); 

        window.location.href = 'Untitled-1.html';
    });
});

