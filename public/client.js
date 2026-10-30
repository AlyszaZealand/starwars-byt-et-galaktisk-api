const list = document.getElementById('character-list');
const form = document.getElementById('character-form');
const message = document.getElementById('message');

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

function capitalize(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

async function loadCharacters() {
    try {
        const response = await fetch('/characters');
        if (!response.ok) throw new Error();
        const characters = await response.json();

        list.replaceChildren();
        for (const c of characters) {
            const row = document.createElement('tr');
            for (const value of [c.name, capitalize(c.role), c.planet]) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            }
            list.appendChild(row);
        }
    } catch {
        showMessage('Kunne ikke hente karakterer. Prøv igen senere.', 'error');
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    const data = Object.fromEntries(new FormData(form));
    button.disabled = true;

    try {
        const response = await fetch('/characters', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });

        if (response.ok) {
            form.reset();
            showMessage('Karakteren blev oprettet.', 'success');
            await loadCharacters();
        } else {
            const body = await response.json().catch(() => ({}));
            const fallback = response.status >= 500
                ? 'Serverfejl. Prøv igen senere.'
                : 'Oplysningerne blev afvist af serveren.';
            showMessage(body.error || fallback, 'error');
        }
    } catch {
        showMessage('Kan ikke kontakte serveren.', 'error');
    } finally {
        button.disabled = false;
    }
});

loadCharacters();
