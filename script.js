function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

function openScreen(screenId) {
    document.getElementById(screenId).classList.add('active');
}

function closeScreen(screenId) {
    document.getElementById(screenId).classList.remove('active');
}

function closeAllSubScreens() {
    document.querySelectorAll('.sub-screen').forEach(s => s.classList.remove('active'));
}

function selectDepositCurrency(code, name, symbol, flag) {
    document.getElementById('add-money-badge').innerText = code;
    document.getElementById('add-money-flag').innerText = flag;
    openScreen('screen-add-money');
}

function saveNewRecipient() {
    const bankName = document.getElementById('input-bank-name').value;
    const accNumber = document.getElementById('input-acc-number').value;
    
    if(bankName && accNumber) {
        const list = document.getElementById('recipients-list');
        const newDiv = document.createElement('div');
        newDiv.className = 'card-item';
        newDiv.onclick = closeAllSubScreens;
        newDiv.innerHTML = `
            <div class="avatar">NR</div>
            <div>
                <div class="card-title">New Recipient</div>
                <div class="card-sub">${bankName} • ${accNumber}</div>
            </div>
        `;
        list.prepend(newDiv);
        closeScreen('screen-bank-details');
        openScreen('screen-select-recipient');
    }
}
