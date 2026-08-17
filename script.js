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
    showCustomAlert('Account Settings', 'Manage your personal details, invite friends, and view account limits.');
});
document.getElementById('set-recipients').addEventListener('click', () => {
    showCustomAlert('Recipients', 'Manage saved bank accounts and mobile money recipients.');
});
document.getElementById('set-security').addEventListener('click', () => {
    showCustomAlert('Security Center', '2FA Authentication is Active. App lock and biometrics configured.');
});
document.getElementById('set-preferences').addEventListener('click', () => {
    showCustomAlert('Preferences', 'Manage app notifications, display currency, and themes.');
});
document.getElementById('set-about').addEventListener('click', () => {
    showCustomAlert('About Us', 'Crypto Vault v2.4. Secure decentralized asset management.');
});

// Custom Dark Modal Engine (replaces native alert/prompt)
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalInputContainer = document.getElementById('modal-input-container');
const modalInput = document.getElementById('modal-input');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const closeCustomModal = document.getElementById('close-custom-modal');

let modalCallback = null;

function showCustomPrompt(title, desc, placeholder, callback) {
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalInput.value = '';
    modalInput.placeholder = placeholder || '';
    modalInputContainer.style.display = 'block';
    modalCancelBtn.style.display = 'block';
    modalCallback = callback;
    customModal.classList.add('active');
}

function showCustomAlert(title, message) {
    modalTitle.textContent = title;
    modalDesc.textContent = message;
    modalInputContainer.style.display = 'none';
    modalCancelBtn.style.display = 'none';
    modalCallback = null;
    customModal.classList.add('active');
}

closeCustomModal.addEventListener('click', () => {
    customModal.classList.remove('active');
});
modalCancelBtn.addEventListener('click', () => {
    customModal.classList.remove('active');
});
modalConfirmBtn.addEventListener('click', () => {
    customModal.classList.remove('active');
    if (modalCallback) {
        modalCallback(modalInput.value);
    }
});

// Financial Actions with Clean Dark Modals
document.getElementById('deposit-btn').addEventListener('click', () => {
    showCustomPrompt('Deposit Funds', 'Enter USD amount to deposit into your cash balance:', 'e.g. 500', (val) => {
        const amt = Number(val);
        if (amt > 0) {
            currentBalance += amt;
            updateUI();
            showCustomAlert('Success', `Successfully deposited $${amt.toFixed(2)}.`);
        } else if (val) {
            showCustomAlert('Error', 'Please enter a valid amount.');
        }
    });
});

document.getElementById('withdraw-btn').addEventListener('click', () => {
    showCustomPrompt('Withdraw Funds', 'Enter USD amount and bank account to withdraw:', 'e.g. 1000', (val) => {
        const amt = Number(val);
        if (amt > 0 && amt <= currentBalance) {
            currentBalance -= amt;
            updateUI();
            showCustomAlert('Success', `Successfully withdrew $${amt.toFixed(2)}.`);
        } else if (val) {
            showCustomAlert('Error', 'Invalid amount or insufficient balance.');
        }
    });
});

document.getElementById('convert-btn').addEventListener('click', () => {
    showCustomAlert('Currency Conversion', 'Currency conversion tool is currently synchronized to USD liquidity.');
});

// Crypto Actions with Clean Dark Modals
document.getElementById('buy-btc-btn').addEventListener('click', () => {
    showCustomPrompt('Buy Bitcoin', 'Enter USD amount from cash balance to trade for BTC:', 'e.g. 200', (val) => {
        const usdSpend = Number(val);
        if (usdSpend <= 0 || usdSpend > currentBalance) {
            showCustomAlert('Error', 'Invalid amount or insufficient cash balance.');
            return;
        }
        currentBalance -= usdSpend;
        const btcBought = usdSpend / BTC_PRICE;
        btcHeld += btcBought;
        updateUI();
        showCustomAlert('Success', `Successfully traded $${usdSpend.toFixed(2)} for BTC!`);
    });
});

document.getElementById('receive-btn').addEventListener('click', () => {
    showCustomAlert('Receive Bitcoin', 'Your Bitcoin Wallet Address:\npc1qxy2kgdygjrsqtzu2n0yr12493p83hkfjhx0wlh');
});

document.getElementById('send-btn').addEventListener('click', () => {
    showCustomPrompt('Send Bitcoin', 'Enter external recipient BTC address:', 'bc1q...', (recipient) => {
        if (!recipient) return;
        showCustomPrompt('Send Bitcoin', 'Enter BTC amount to send:', '0.001', (amount) => {
            const btcToSend = Number(amount);
            if (btcToSend <= 0 || btcToSend > btcHeld) {
                showCustomAlert('Error', 'Invalid amount or insufficient BTC balance.');
                return;
            }
            btcHeld -= btcToSend;
            updateUI();
            showCustomAlert('Success', `Successfully sent ${btcToSend.toFixed(6)} BTC!`);
        });
    });
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
        showCustomAlert('ADMIN PANEL', 'ADMIN PANEL UNLOCKED: Full system override active.');
    }
});

function updateUI() {
    document.getElementById('total-cash-display').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('card-balance-display').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('btc-held-display').textContent = btcHeld.toFixed(6) + ' BTC';
    document.getElementById('btc-usd-display').textContent = `($${(btcHeld * BTC_PRICE).toFixed(2)})`;
    
    const liquidityEl = document.querySelector('.highlight-amount');
    if(liquidityEl) {
        liquidityEl.textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }
}

document.getElementById('logout-btn').addEventListener('click', () => {
    showCustomAlert('Logged Out', 'Session ended successfully.');
    settingsModal.classList.remove('active');
});
