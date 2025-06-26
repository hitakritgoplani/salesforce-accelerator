import {endpointsMap} from './endpoints.js';

document.addEventListener('DOMContentLoaded', function() {
    const newKeyInput = document.getElementById('new-key');
    const newValue = document.getElementById('new-picklist-value');
    const addShortcutButton = document.getElementById('add-shortcut-button');
    const shortcutsTableBody = document.querySelector('#shortcuts-table tbody');

    let shortcuts = {};

    chrome.storage.sync.get('userShortcuts', function(data) {
        shortcuts = data.userShortcuts || {};
        renderShortcuts();
    });

    function renderShortcuts() {
        shortcutsTableBody.innerHTML = '';
        for (const key in shortcuts) {
            const shortcut = shortcuts[key];
            const row = shortcutsTableBody.insertRow();

            const shortcutCell = row.insertCell();
            shortcutCell.textContent = `Alt + Shift + ${key.toUpperCase()}`;

            const nameCell = row.insertCell();
            nameCell.textContent = shortcut.name;

            const actionsCell = row.insertCell();
            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-button');
            removeButton.dataset.key = key;
            removeButton.innerHTML = '<i class="fas fa-times"></i>';
            removeButton.setAttribute('aria-label', 'Remove shortcut');
            actionsCell.appendChild(removeButton);
        }

        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const keyToRemove = this.dataset.key;
                delete shortcuts[keyToRemove];
                renderShortcuts();
                saveShortcutsToStorage(); // Save immediately after removal
            });
        });
    }

    function saveShortcutsToStorage() {
        chrome.storage.sync.set({ 'userShortcuts': shortcuts }, function() {
            console.log('Shortcuts saved.');
        });
    }

    addShortcutButton.addEventListener('click', function() {
        const key = newKeyInput.value.trim().toLowerCase();
        const picklistValue = newValue.value;

        if (key && key.length === 1 && /[a-z]/.test(key) && picklistValue && !shortcuts[key]) {
            shortcuts[key] = { name: picklistValue, endpoint: endpointsMap[picklistValue] };
            newKeyInput.value = '';
            newValue.value = '';
            renderShortcuts();
            saveShortcutsToStorage();
        } else if (shortcuts[key]) {
            alert(`Shortcut for key "${key.toUpperCase()}" already exists.`);
        } else if (!/[a-z]/.test(key) || key.length !== 1) {
            alert('Please enter a single letter (a-z) for the shortcut key.');
        }
    });
});