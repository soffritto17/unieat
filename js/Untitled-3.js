const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');


document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impedisce l'invio predefinito del form

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Mostra un messaggio di conferma
            window.location.href = '/home'; // Reindirizza alla pagina home
        } else {
            const error = await response.json();
            alert(error.message || 'Errore durante la registrazione');
        }
    } catch (error) {
        console.error('Errore:', error); // Stampa il messaggio di errore, se disponibile
        alert('Errore imprevisto. Riprova più tardi.');
    }    
});


document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impedisce l'invio predefinito del form

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); // Converte i dati in un oggetto JSON

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            // Salva il token in localStorage
            localStorage.setItem('token', result.token);
            alert(result.message); // Mostra un messaggio di successo
            window.location.href = '/home'; // Reindirizza alla pagina protetta
        } else {
            // Mostra il messaggio di errore dal server
            alert(result.message || 'Errore durante il login');
        }
    } catch (error) {
        console.error('Errore imprevisto:', error);
        alert('Errore imprevisto. Riprova più tardi.');
    }
});


registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
})

