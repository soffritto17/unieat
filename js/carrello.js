// Funzione per aggiungere un prodotto al carrello
function addToCart(nomeProdotto, prezzo) {
    // Recupera il carrello dal localStorage o inizializza un nuovo array
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    // Aggiungi il prodotto al carrello
    carrello.push({ nome: nomeProdotto, prezzo: prezzo });

    // Salva il carrello aggiornato nel localStorage
    localStorage.setItem('carrello', JSON.stringify(carrello));

    // Mostra un messaggio di conferma nella pagina
    showConfirmationMessage(`${nomeProdotto} è stato aggiunto al carrello!`);
}

// Funzione per mostrare un messaggio di conferma
function showConfirmationMessage(message) {
    // Crea o seleziona l'elemento del messaggio
    let messageContainer = document.getElementById('confirmation-message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'confirmation-message';
        document.body.appendChild(messageContainer);
    }

    // Stile del messaggio
    messageContainer.textContent = message;
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '20px'; /* Posizionato in alto */
    messageContainer.style.left = '50%'; /* Allinea al centro orizzontale */
    messageContainer.style.transform = 'translateX(-50%)'; /* Centra il contenitore */
    messageContainer.style.backgroundColor = '#20947D';
    messageContainer.style.color = '#fff';
    messageContainer.style.padding = '10px 20px';
    messageContainer.style.borderRadius = '5px';
    messageContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    messageContainer.style.zIndex = '1000';
    messageContainer.style.fontSize = '16px';
    messageContainer.style.fontWeight = 'bold';
    messageContainer.style.textAlign = 'center';

    // Rimuovi il messaggio dopo 3 secondi
    setTimeout(() => {
        messageContainer.remove();
    }, 3000);
}

// Funzione per mostrare i prodotti del carrello nella pagina "Carrello"
function showCart() {
    const carrelloContainer = document.getElementById('carrello-container');
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    if (carrello.length === 0) {
        carrelloContainer.innerHTML = '<p>Il carrello è vuoto.</p>';
        return;
    }

    let totale = 0;
    carrelloContainer.innerHTML = `
        <div class="cart-grid">
            ${carrello.map((prodotto, index) => {
                totale += prodotto.prezzo;
                return `
                    <div class="cart-item">
                        <div class="cart-item-details">
                            <h4>${prodotto.nome}</h4>
                            <p>Prezzo: €${prodotto.prezzo}</p>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${index})">Rimuovi</button>
                    </div>
                `;
            }).join('')}
        </div>
        <h3 class="cart-total">Totale: €${totale}</h3>
    `;
}
// Funzione per rimuovere un prodotto dal carrello
function removeFromCart(index) {
    let carrello = JSON.parse(localStorage.getItem('carrello')) || [];

    // Rimuove l'elemento selezionato
    carrello.splice(index, 1);

    // Aggiorna il localStorage
    localStorage.setItem('carrello', JSON.stringify(carrello));

    // Ricarica il carrello
    showCart();
}

// Mostra il carrello se siamo nella pagina del carrello
if (document.getElementById('carrello-container')) {
    showCart();
}
