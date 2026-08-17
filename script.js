let currentBalance = 20000;
let btcHeld = 0;
const BTC_PRICE = 65420;

// Navigation switching
document.querySelectorAll('.nav-item').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.view-content').forEach(view => view.classList.remove('active'));
        
        button.classList.add('active');
        const targetView = document.getElementById(button.getAttribute('data-target'));
        if (targetView) targetView.classList.add('active');
    });
});

// Settings Modal Toggle
const settingsModal = document.getElementById('settings-modal');
document.getElementById('open-settings').addEventListener('click', () => {
    settingsModal.classList.add('active');
});
document.getElementById('close-settings').addEventListener('click', () => {
    settingsModal.classList.remove('active');
});

// Name Customization Sync
const usernameInput = document.getElementById('username-input');
const cardHolderDisplay = document.getElementById('card-holder-display');
usernameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'YOUR NAME';
    cardHolderDisplay.textContent = val.toUpperCase();
});

// Settings items alerts
document.getElementById('set-account').addEventListener('click', () => {
    alert('Account settings: Personal details, invite friends, account limits.');
});
document.getElementById('set-recipients').addEventListener('click', () => {
    alert('Recipients: Manage bank accounts and mobile money.');
});
document.getElementById('set-security').addEventListener('click', () => {
    alert('Security Center: 2FA Authentication is Active, App lock, Biometrics & Passcode configured.');
});
document.getElementById('set-preferences').addEventListener('click', () => {
    alert('Preferences: Notifications, display currency & themes.');
});
document.getElementById('set-about').addEventListener('click', () => {
    alert('About us: FAQs, privacy policy, blog & contact.');
});

// Financial Actions
document.getElementById('deposit-btn').addEventListener('click', () => {
    const amountStr = prompt('Add Bank & Deposit Funds: Enter USD amount to deposit:');
    if (!amountStr) return;
    const amt = Number(amountStr);
    if (amt > 0) {
        currentBalance += amt;
        updateUI();
        alert('Successfully deposited $' + amt.toFixed(2));
    }
});

document.getElementById('withdraw-btn').addEventListener('click', () => {
    const amountStr = prompt('Withdraw: Enter bank account and USD amount to withdraw:');
    if (!amountStr) return;
    const amt = Number(amountStr);
    if (amt > 0 && amt <= currentBalance) {
        currentBalance -= amt;
        updateUI();
        alert('Successfully withdrew $' + amt.toFixed(2));
    } else {
        alert('Invalid amount or insufficient balance.');
    }
});

document.getElementById('convert-btn').addEventListener('click', () => {
    alert('Currency conversion feature opened.');
});

// Crypto Actions
document.getElementById('buy-btc-btn').addEventListener('click', () => {
    const amountStr = prompt('Enter USD amount from cash balance to buy BTC:');
    if (!amountStr) return;
    const usdSpend = Number(amountStr);
    if (usdSpend <= 0 || usdSpend > currentBalance) {
        alert('Invalid amount or insufficient cash balance.');
        return;
    }
    currentBalance -= usdSpend;
    const btcBought = usdSpend / BTC_PRICE;
    btcHeld += btcBought;
    updateUI();
    alert('Successfully traded $' + usdSpend.toFixed(2) + ' for BTC!');
});

document.getElementById('receive-btn').addEventListener('click', () => {
    alert('Receive Crypto - My Bitcoin Wallet Address: bc1qxy2kgdygjrsqtzu2n0yr12493p83hkfjhx0wlh');
});

document.getElementById('send-btn').addEventListener('click', () => {
    const recipient = prompt('Enter external recipient BTC address:');
    if (!recipient) return;
    const amount = prompt('Enter BTC amount to send:');
    if (!amount) return;
    const btcToSend = Number(amount);
    if (btcToSend <= 0 || btcToSend > btcHeld) {
        alert('Invalid amount or insufficient BTC balance.');
        return;
    }
    btcHeld -= btcToSend;
    updateUI();
    alert('Successfully sent ' + btcToSend.toFixed(6) + ' BTC!');
});

// Admin Tweak: Triple click blur/eye icon
let eyeClickCount = 0;
let eyeTimer = null;
document.getElementById('blur-eye-btn').addEventListener('click', () => {
    eyeClickCount++;
    if (eyeClickCount === 1) {
        eyeTimer = setTimeout(() => {
            eyeClickCount = 0;
        }, 1000);
    } else if (eyeClickCount === 3) {
        clearTimeout(eyeTimer);
        eyeClickCount = 0;
        alert('ADMIN PANEL UNLOCKED: Full system override active.');
    }
});

function updateUI() {
    document.getElementById('total-cash-display').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('card-balance-display').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('btc-held-display').textContent = btcHeld.toFixed(6) + ' BTC';
    document.getElementById('btc-usd-display').textContent = '($" + (btcHeld * BTC_PRICE).toFixed(2) + ")';
}

document.getElementById('logout-btn').addEventListener('click', () => {
    alert('Logged out successfully.');
    settingsModal.classList.remove('active');
});
