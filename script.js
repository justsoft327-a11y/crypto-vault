let currentBalance = 20000;
let btcHeld = 0.007643;
let usdtHeld = 1500.00;
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

// Settings Modal & Sub-Folders
const settingsModal = document.getElementById('settings-modal');
const subSettingsModal = document.getElementById('sub-settings-modal');
const subModalTitle = document.getElementById('sub-modal-title');
const subModalBody = document.getElementById('sub-modal-body');

document.getElementById('open-settings').addEventListener('click', () => {
    settingsModal.classList.add('active');
});
document.getElementById('close-settings').addEventListener('click', () => {
    settingsModal.classList.remove('active');
});
document.getElementById('close-sub-modal').addEventListener('click', () => {
    subSettingsModal.classList.remove('active');
});

// Name Customization Sync
const usernameInput = document.getElementById('username-input');
const cardHolderDisplay = document.getElementById('card-holder-display');
usernameInput.addEventListener('input', (e) => {
    const val = e.target.value.trim() || 'YOUR NAME';
    cardHolderDisplay.textContent = val.toUpperCase();
});

// Settings Sub-Menus Functionality
document.getElementById('set-account').addEventListener('click', () => {
    subModalTitle.textContent = 'Account Settings';
    subModalBody.innerHTML = `
        <div class="sub-option-card">
            <strong>Tier Level</strong>
            <p>Tier 2 Active (Daily Limit: $50,000)</p>
        </div>
        <div class="sub-option-card">
            <strong>Registered Email</strong>
            <p>user@cryptovault.io</p>
        </div>
        <div class="sub-option-card">
            <strong>Phone Number</strong>
            <p>+1 (555) 382-9921 (Verified)</p>
        </div>
        <button class="promo-btn" style="width:100%; margin-top:10px;" onclick="alert('Profile details updated successfully.')">Update Profile</button>
    `;
    subSettingsModal.classList.add('active');
});

document.getElementById('set-recipients').addEventListener('click', () => {
    subModalTitle.textContent = 'Saved Recipients';
    subModalBody.innerHTML = `
        <div class="sub-option-card">
            <strong>Chase Bank - ****4921</strong>
            <p>Routing: 021000021 • John Doe</p>
        </div>
        <div class="sub-option-card">
            <strong>Access Bank - ****8120</strong>
            <p>Sort Code: 044 • Isaac Oche</p>
        </div>
        <button class="promo-btn" style="width:100%; margin-top:10px;" onclick="showAddRecipientForm()">+ Add New Recipient</button>
    `;
    subSettingsModal.classList.add('active');
});

function showAddRecipientForm() {
    subModalBody.innerHTML = `
        <p class="modal-desc">Add a new bank recipient account:</p>
        <input type="text" id="recip-bank" placeholder="Bank Name (e.g. Chase)">
        <input type="text" id="recip-name" placeholder="Account Holder Name">
        <input type="text" id="recip-num" placeholder="Account Number">
        <input type="text" id="recip-routing" placeholder="Routing / Sort Code">
        <button class="promo-btn" style="width:100%; margin-top:10px;" onclick="alert('Recipient successfully saved!'); subSettingsModal.classList.remove('active');">Save Recipient</button>
    `;
}

document.getElementById('set-security').addEventListener('click', () => {
    subModalTitle.textContent = 'Security & 2FA Authentication';
    subModalBody.innerHTML = `
        <div class="sub-option-card">
            <strong>Google Authenticator (2FA)</strong>
            <p style="color: #3fb950;">Active and Secure</p>
        </div>
        <div class="sub-option-card">
            <strong>Biometric Login</strong>
            <p>Fingerprint / FaceID enabled</p>
        </div>
        <div class="sub-option-card">
            <strong>Transaction PIN</strong>
            <p>Configured (4-digit PIN required)</p>
        </div>
    `;
    subSettingsModal.classList.add('active');
});

document.getElementById('set-preferences').addEventListener('click', () => {
    subModalTitle.textContent = 'App Preferences';
    subModalBody.innerHTML = `
        <div class="sub-option-card">
            <strong>Display Currency</strong>
            <p>USD ($) - Default Liquidity</p>
        </div>
        <div class="sub-option-card">
            <strong>Theme Mode</strong>
            <p>Dark Luxury Theme (Active)</p>
        </div>
        <div class="sub-option-card">
            <strong>Push Notifications</strong>
            <p>Enabled for deposits, withdrawals & trades</p>
        </div>
    `;
    subSettingsModal.classList.add('active');
});

document.getElementById('set-about').addEventListener('click', () => {
    subModalTitle.textContent = 'About Us';
    subModalBody.innerHTML = `
        <div class="sub-option-card">
            <strong>Crypto Vault v3.2</strong>
            <p>Secure global digital asset management & multi-currency conversion gateway.</p>
        </div>
        <div class="sub-option-card">
            <strong>Support Center</strong>
            <p>support@cryptovault.io | 24/7 Live Assistance</p>
        </div>
    `;
    subSettingsModal.classList.add('active');
});

// Custom Modal Engine
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalBodyContent = document.getElementById('modal-body-content');
const modalConfirmBtn = document.getElementById('modal-confirm-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const closeCustomModal = document.getElementById('close-custom-modal');

let modalActionCallback = null;

closeCustomModal.addEventListener('click', () => customModal.classList.remove('active'));
modalCancelBtn.addEventListener('click', () => customModal.classList.remove('active'));
modalConfirmBtn.addEventListener('click', () => {
    customModal.classList.remove('active');
    if (modalActionCallback) modalActionCallback();
});

// 1. DEPOSIT FLOW (Bank vs Card)
document.getElementById('deposit-btn').addEventListener('click', () => {
    modalTitle.textContent = 'Deposit Funds';
    modalBodyContent.innerHTML = `
        <p class="modal-desc">Select your preferred funding method:</p>
        <div class="settings-list" style="margin-bottom: 15px;">
            <div class="setting-item" onclick="openDepositForm('bank')">
                <span><i class="fa-solid fa-landmark" style="margin-right:8px; color:#58a6ff;"></i> Bank Transfer</span>
                <i class="fa-solid fa-chevron-right"></i>
            </div>
            <div class="setting-item" onclick="openDepositForm('card')">
                <span><i class="fa-solid fa-credit-card" style="margin-right:8px; color:#3fb950;"></i> Debit / Credit Card</span>
                <i class="fa-solid fa-chevron-right"></i>
            </div>
        </div>
    `;
    modalConfirmBtn.style.display = 'none';
    modalCancelBtn.textContent = 'Close';
    customModal.classList.add('active');
});

window.openDepositForm = function(method) {
    if(method === 'bank') {
        modalTitle.textContent = 'Deposit via Bank Transfer';
        modalBodyContent.innerHTML = `
            <p class="modal-desc">Transfer funds to your dedicated Vault bank account:</p>
            <div class="sub-option-card">
                <strong>Bank: Evolve Bank & Trust</strong>
                <p>Account Number: 9821034412</p>
                <p>Routing Number: 031192880</p>
            </div>
            <input type="text" id="dep-amt" placeholder="Enter USD amount transferred (e.g. 1000)" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-top:10px;">
        `;
    } else {
        modalTitle.textContent = 'Deposit via Card';
        modalBodyContent.innerHTML = `
            <p class="modal-desc">Enter your debit card details:</p>
            <input type="text" placeholder="Card Number (4111 2222 3333 4444)" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-bottom:10px;">
            <div style="display:flex; gap:10px;">
                <input type="text" placeholder="MM/YY" style="width:50%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff;">
                <input type="text" placeholder="CVV" style="width:50%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff;">
            </div>
            <input type="text" id="dep-amt" placeholder="Enter USD amount to deposit" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-top:10px;">
        `;
    }
    modalConfirmBtn.style.display = 'block';
    modalCancelBtn.textContent = 'Cancel';
    modalActionCallback = () => {
        const val = document.getElementById('dep-amt');
        const amt = val ? Number(val.value) : 500;
        if(amt > 0) {
            currentBalance += amt;
            updateUI();
            alert(`Successfully deposited $${amt.toFixed(2)}!`);
        }
    };
};

// 2. WITHDRAW FLOW (Recipient Account & Routing details)
document.getElementById('withdraw-btn').addEventListener('click', () => {
    modalTitle.textContent = 'Withdraw Funds';
    modalBodyContent.innerHTML = `
        <p class="modal-desc">Enter recipient bank account details for withdrawal:</p>
        <input type="text" id="w-bank" placeholder="Bank Name (e.g., Chase, Wells Fargo)" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-bottom:10px;">
        <input type="text" id="w-acc" placeholder="Account Number" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-bottom:10px;">
        <input type="text" id="w-routing" placeholder="Routing Number / Sort Code" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-bottom:10px;">
        <input type="text" id="w-amt" placeholder="USD Amount to Withdraw" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff;">
    `;
    modalConfirmBtn.style.display = 'block';
    modalCancelBtn.textContent = 'Cancel';
    modalActionCallback = () => {
        const amtInput = document.getElementById('w-amt');
        const amt = amtInput ? Number(amtInput.value) : 0;
        if(amt > 0 && amt <= currentBalance) {
            currentBalance -= amt;
            updateUI();
            alert(`Successfully withdrew $${amt.toFixed(2)} to recipient bank account.`);
        } else {
            alert('Invalid amount or insufficient balance.');
        }
    };
    customModal.classList.add('active');
});

// 3. CURRENCY CONVERSION FLOW
document.getElementById('convert-btn').addEventListener('click', () => {
    modalTitle.textContent = 'Currency Conversion';
    modalBodyContent.innerHTML = `
        <p class="modal-desc">Convert USD balance to other country currencies:</p>
        <input type="text" id="conv-usd" placeholder="Amount in USD (e.g. 500)" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-bottom:10px;">
        <select id="target-currency" style="width:100%; padding:12px; background:#0d1117; border:1px solid #30363d; border-radius:8px; color:#fff; margin-bottom:10px;">
            <option value="NGN">Nigerian Naira (NGN - ₦1,550/$)</option>
            <option value="GBP">British Pound (GBP - £0.78/$)</option>
            <option value="EUR">Euro (EUR - €0.92/$)</option>
            <option value="CAD">Canadian Dollar (CAD - C$1.35/$)</option>
            <option value="GHS">Ghanaian Cedi (GHS - GH₵15.2/$)</option>
        </select>
        <div id="conversion-result" style="color: #3fb950; font-weight: bold; margin-top: 10px; text-align: center;"></div>
    `;
    modalConfirmBtn.style.display = 'block';
    modalCancelBtn.textContent = 'Cancel';
    modalActionCallback = () => {
        const usdVal = Number(document.getElementById('conv-usd').value);
        const curr = document.getElementById('target-currency').value;
        let rate = 1;
        if(curr === 'NGN') rate = 1550;
        if(curr === 'GBP') rate = 0.78;
        if(curr === 'EUR') rate = 0.92;
        if(curr === 'CAD') rate = 1.35;
        if(curr === 'GHS') rate = 15.2;

        if(usdVal > 0 && usdVal <= currentBalance) {
            currentBalance -= usdVal;
            updateUI();
            alert(`Successfully converted $${usdVal.toFixed(2)} USD to ${(usdVal * rate).toLocaleString()} ${curr}!`);
        } else {
            alert('Invalid USD amount or insufficient cash balance.');
        }
    };
    customModal.classList.add('active');
});

// Crypto Page Actions
document.getElementById('trade-btn').addEventListener('click', () => {
    alert('Trade interface loaded. Select BTC or USDT to swap.');
});
document.getElementById('receive-btn').addEventListener('click', () => {
    alert('Receive Address:\nBTC: bc1qxy2kgdygjrsqtzu2n0yr12493p83hkfjhx0wlh\nUSDT (TRC20): TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE');
});
document.getElementById('send-btn').addEventListener('click', () => {
    alert('Enter recipient external wallet address to transfer crypto assets.');
});

// Admin Eye Toggle
let isBlurred = false;
document.getElementById('blur-eye-btn').addEventListener('click', () => {
    isBlurred = !isBlurred;
    document.getElementById('total-cash-display').textContent = isBlurred ? '********' : '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2});
    document.getElementById('total-crypto-display').textContent = isBlurred ? '********' : '$' + ((btcHeld * BTC_PRICE) + usdtHeld).toLocaleString('en-US', {minimumFractionDigits: 2});
    document.getElementById('cash-asset-amt').textContent = isBlurred ? '********' : '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2});
});

function updateUI() {
    document.getElementById('total-cash-display').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('cash-asset-amt').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('card-balance-display').textContent = '$' + currentBalance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('btc-held-amt').textContent = btcHeld.toFixed(6) + ' BTC';
    document.getElementById('btc-usd-val').textContent = `$${(btcHeld * BTC_PRICE).toFixed(2)}`;
    document.getElementById('usdt-held-amt').textContent = usdtHeld.toLocaleString('en-US', {minimumFractionDigits: 2}) + ' USDT';
    document.getElementById('usdt-usd-val').textContent = `$${usdtHeld.toFixed(2)}`;
    document.getElementById('total-crypto-display').textContent = `$${((btcHeld * BTC_PRICE) + usdtHeld).toFixed(2)}`;
}

document.getElementById('logout-btn').addEventListener('click', () => {
    alert('Logged out successfully.');
    settingsModal.classList.remove('active');
});
