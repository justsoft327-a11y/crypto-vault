// App State Variables
let currentBalance = 20000.00;
let userName = "impute name";
let isMasked = false;
let pendingWithdrawAmount = 0;

// Dynamic Recipients Array (Starts empty / clean as requested)
let recipients = [];

// Navigation Functions
function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.bottom-nav .nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

function openScreen(screenId) {
    document.getElementById(screenId).classList.add('active');
    if(screenId === 'screen-recipients-list') renderRecipientsList();
    if(screenId === 'screen-select-recipient') renderWithdrawRecipients();
}

function closeScreen(screenId) {
    document.getElementById(screenId).classList.remove('active');
}

// Balance Masking & Triple Click Admin Trigger
let eyeClickCount = 0;
let eyeClickTimer = null;

function toggleBalanceMask() {
    eyeClickCount++;
    if (eyeClickCount === 1) {
        eyeClickTimer = setTimeout(() => {
            // Normal toggle behavior on single/double click
            isMasked = !isMasked;
            updateBalanceDisplay();
            eyeClickCount = 0;
        }, 400);
    } else if (eyeClickCount === 3) {
        // Triple click detected within window!
        clearTimeout(eyeClickTimer);
        eyeClickCount = 0;
        openScreen('screen-admin-tweak');
    }
}

function updateBalanceDisplay() {
    const displayBal = document.getElementById('display-balance');
    const displayUsd = document.getElementById('display-usd-balance');
    const eyeIcon = document.getElementById('eye-icon');

    if (isMasked) {
        displayBal.innerText = "********";
        displayUsd.innerText = "********";
        eyeIcon.className = "fa-solid fa-eye";
    } else {
        const formatted = "$" + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2});
        displayBal.innerText = formatted;
        displayUsd.innerText = formatted;
        eyeIcon.className = "fa-solid fa-eye-slash";
    }
}

// Profile Name Update
function saveProfileName() {
    const inputVal = document.getElementById('input-profile-name').value;
    if(inputVal.trim() !== "") {
        userName = inputVal;
        document.getElementById('card-holder-name').innerText = userName;
        alert("Profile name updated successfully!");
        closeScreen('screen-account-settings');
    }
}

// Deposit Flow
function selectDepositCurrency(code, name, symbol, flag) {
    document.getElementById('add-money-badge').innerText = code;
    document.getElementById('add-money-flag').innerText = flag;
    openScreen('screen-add-money');
}

function completeDeposit() {
    const amt = parseFloat(document.getElementById('deposit-amount-input').value);
    if(amt > 0) {
        currentBalance += amt;
        updateBalanceDisplay();
        alert("Deposit successful!");
        closeScreen('screen-add-money');
        closeScreen('screen-deposit-currency');
        document.getElementById('deposit-amount-input').value = "";
    } else {
        alert("Please enter a valid amount.");
    }
}

// Withdraw Flow
function proceedToRecipients() {
    const amt = parseFloat(document.getElementById('withdraw-amount-input').value);
    if(amt > 0 && amt <= currentBalance) {
        pendingWithdrawAmount = amt;
        openScreen('screen-select-recipient');
    } else {
        alert("Invalid amount or exceeds available balance.");
    }
}

// Recipient Management
function saveNewRecipient() {
    const bankName = document.getElementById('input-bank-name').value;
    const accNumber = document.getElementById('input-acc-number').value;
    const routingNumber = document.getElementById('input-routing-number').value;
    
    if(bankName && accNumber && routingNumber) {
        const newRecipient = {
            bank: bankName,
            account: accNumber,
            routing: routingNumber,
            initials: bankName.substring(0, 2).toUpperCase()
        };
        recipients.push(newRecipient);
        alert("New recipient saved successfully!");
        document.getElementById('input-acc-number').value = "";
        document.getElementById('input-routing-number').value = "";
        closeScreen('screen-bank-details');
        openScreen('screen-recipients-list');
    } else {
        alert("Please fill in all account details.");
    }
}

function renderRecipientsList() {
    const container = document.getElementById('saved-recipients-container');
    if (recipients.length === 0) {
        container.innerHTML = `<p style="color: #888; text-align: center; padding: 20px;">No saved recipients yet. Tap + to add one.</p>`;
        return;
    }
    container.innerHTML = "";
    recipients.forEach((rec, index) => {
        container.innerHTML += `
            <div class="card-item">
                <div class="avatar">${rec.initials}</div>
                <div style="flex: 1;">
                    <div class="card-title">${rec.bank}</div>
                    <div class="card-sub">Acc: ****${rec.account.slice(-4)} • Routing: ${rec.routing}</div>
                </div>
                <i class="fa-solid fa-trash" style="color: #ef4444; cursor: pointer;" onclick="deleteRecipient(${index})"></i>
            </div>
        `;
    });
}

function renderWithdrawRecipients() {
    const container = document.getElementById('withdrawal-recipients-list');
    if (recipients.length === 0) {
        container.innerHTML = `<p style="color: #888; text-align: center; padding: 20px;">No recipients available. Add a bank recipient first.</p>`;
        return;
    }
    container.innerHTML = "";
    recipients.forEach((rec) => {
        container.innerHTML += `
            <div class="card-item" onclick="executeWithdrawal('${rec.bank}', '${rec.account}')">
                <div class="avatar">${rec.initials}</div>
                <div style="flex: 1;">
                    <div class="card-title">${rec.bank}</div>
                    <div class="card-sub">Account: ${rec.account}</div>
                </div>
            </div>
        `;
    });
}

function deleteRecipient(index) {
    recipients.splice(index, 1);
    renderRecipientsList();
}

function executeWithdrawal(bank, account) {
    if(pendingWithdrawAmount <= currentBalance) {
        currentBalance -= pendingWithdrawAmount;
        updateBalanceDisplay();
        alert(`Successfully withdrew $${pendingWithdrawAmount.toFixed(2)} to ${bank} (${account})!`);
        // Close all sub screens and return to home
        document.querySelectorAll('.sub-screen').forEach(s => s.classList.remove('active'));
    }
}

// Crypto Actions
function copyBtcAddress() {
    const addressText = document.getElementById('btc-address-text').innerText;
    navigator.clipboard.writeText(addressText).then(() => {
        alert("Bitcoin address copied to clipboard!");
    });
}

function sendBitcoinTransaction() {
    const wallet = document.getElementById('send-wallet-input').value;
    const amount = document.getElementById('send-btc-amount').value;
    if(wallet && amount > 0) {
        alert(`Successfully sent ${amount} BTC to external wallet:\n${wallet}`);
        document.getElementById('send-wallet-input').value = "";
        document.getElementById('send-btc-amount').value = "";
        closeScreen('screen-crypto-send');
    } else {
        alert("Please enter a valid wallet address and amount.");
    }
}

// Admin Tweak Block
function applyAdminBalance() {
    const customVal = parseFloat(document.getElementById('admin-custom-balance').value);
    if (!isNaN(customVal)) {
        currentBalance = customVal;
        updateBalanceDisplay();
        alert("Admin balance updated successfully!");
        closeScreen('screen-admin-tweak');
        document.getElementById('admin-custom-balance').value = "";
    } else {
        alert("Please enter a valid numeric balance.");
    }
}
