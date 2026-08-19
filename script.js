// Navigation Switching
function switchTab(tabId, element) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById('view-' + tabId).classList.add('active');
    element.classList.add('active');
}

// Eye Tap Tracking (3 taps = Admin Panel, 1 tap = Toggle Balance Blur)
let eyeTapCount = 0;
let eyeTimer = null;
function handleEyeTap() {
    eyeTapCount++;
    clearTimeout(eyeTimer);
    if (eyeTapCount === 3) {
        eyeTapCount = 0;
        document.getElementById('admin-modal').style.display = 'flex';
    } else {
        eyeTimer = setTimeout(() => {
            if (eyeTapCount === 1) {
                document.getElementById('total-balance').classList.toggle('blurred');
            }
            eyeTapCount = 0;
        }, 400);
    }
}

// Busha Settings
function openSettingsMenu() { document.getElementById('settings-modal').style.display = 'flex'; }
function closeSettingsModal() { document.getElementById('settings-modal').style.display = 'none'; }

function openSubSettings(type) {
    const body = document.getElementById('sub-settings-body');
    document.getElementById('sub-settings-modal').style.display = 'flex';
    if (type === 'account') {
        body.innerHTML = `
            <div class="modal-header"><h3>Account Settings</h3><button class="close-btn" onclick="closeSubSettings()">&times;</button></div>
            <div class="form-group"><label>Full Name</label><input type="text" placeholder="Enter name"></div>
            <div class="form-group"><label>Date of Birth</label><input type="date"></div>
            <div class="form-group"><label>Security Question</label><input type="text" placeholder="Enter question"></div>
            <button class="btn-primary" onclick="alert('Saved successfully!'); closeSubSettings();">Save Changes</button>
            <hr style="margin:20px 0; border-color:#1f2937;">
            <p style="margin-bottom:10px; color:#22c55e; cursor:pointer;" onclick="alert('Invite link copied: cryptovault.app/ref/user')">🎁 Invite Friends</p>
            <p style="margin-bottom:10px; cursor:pointer;" onclick="alert('Account Limit: Unlimited Tier')">Account Limits</p>
            <p style="margin-bottom:10px; cursor:pointer;" onclick="alert('Statement downloaded')">Statements</p>
            <p style="color:#ef4444; cursor:pointer;" onclick="alert('Account deletion requested')">Delete Account</p>
        `;
    } else if (type === 'recipients') {
        body.innerHTML = `
            <div class="modal-header"><h3>Recipients</h3><button class="close-btn" onclick="closeSubSettings()">&times;</button></div>
            <p style="color:#9ca3af; margin-bottom:16px;">Manage saved bank accounts & mobile money.</p>
            <button class="btn-primary" onclick="alert('Add Recipient Form')">+ Add Recipient</button>
        `;
    } else {
        body.innerHTML = `
            <div class="modal-header"><h3>${type.toUpperCase()}</h3><button class="close-btn" onclick="closeSubSettings()">&times;</button></div>
            <p style="color:#9ca3af;">Configuration options for ${type}.</p>
        `;
    }
}
function closeSubSettings() { document.getElementById('sub-settings-modal').style.display = 'none'; }

// Cards Upload Modal
function openCardsUploadModal() { document.getElementById('cards-upload-modal').style.display = 'flex'; }
function closeCardsUploadModal() { document.getElementById('cards-upload-modal').style.display = 'none'; }
function submitCardVerification() { alert('Verification documents submitted successfully!'); closeCardsUploadModal(); }

// Deposit / Withdraw / Convert Modals
function openDepositModal() { document.getElementById('deposit-modal').style.display = 'flex'; }
function closeDepositModal() { document.getElementById('deposit-modal').style.display = 'none'; }
function openWithdrawModal() { document.getElementById('withdraw-modal').style.display = 'flex'; }
function closeWithdrawModal() { document.getElementById('withdraw-modal').style.display = 'none'; }
function confirmWithdrawal() { alert('Withdrawal request initiated successfully!'); closeWithdrawModal(); }
function openConvertModal() { document.getElementById('convert-modal').style.display = 'flex'; }
function closeConvertModal() { document.getElementById('convert-modal').style.display = 'none'; }

// Quick Payments Bill Menu
function openBillMenu(type) {
    if (type === 'att') {
        alert('Opening AT&T Airtime & Data Recharge Menu');
    } else {
        alert('Opening ' + type + ' payment menu');
    }
}

// Crypto Actions (Trade, Receive, Send, Asset Detail Charts)
function openCryptoTrade() {
    const body = document.getElementById('crypto-action-body');
    document.getElementById('crypto-action-modal').style.display = 'flex';
    body.innerHTML = `
        <div class="modal-header"><h3>Trade Crypto</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <div class="form-group"><label>Amount ($)</label><input type="number" id="trade-amt" placeholder="0.00"></div>
        <button class="btn-primary" onclick="showTradeRecipe()">Continue</button>
    `;
}
function showTradeRecipe() {
    const amt = document.getElementById('trade-amt').value || '0';
    const body = document.getElementById('crypto-action-body');
    body.innerHTML = `
        <div class="modal-header"><h3>Receipt</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <p style="margin-bottom:12px;">Purchasing Bitcoin worth: <b>$${amt}</b></p>
        <p style="margin-bottom:20px; color:#9ca3af;">Network fee: $1.00</p>
        <button class="btn-primary" onclick="alert('Successfully Purchased Bitcoin! 🎉'); closeCryptoModal();">Confirm Purchase</button>
    `;
}
function openCryptoReceive() {
    const body = document.getElementById('crypto-action-body');
    document.getElementById('crypto-action-modal').style.display = 'flex';
    const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    body.innerHTML = `
        <div class="modal-header"><h3>Receive Crypto</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <p style="margin-bottom:8px; color:#9ca3af;">Your Bitcoin Wallet Address:</p>
        <input type="text" readonly value="${address}" style="width:100%; background:#1a202c; border:none; padding:10px; color:#fff; border-radius:8px; margin-bottom:12px;">
        <button class="btn-primary" onclick="navigator.clipboard.writeText('${address}'); alert('Address copied!');">Copy Address</button>
    `;
}
function openCryptoSend() {
    const body = document.getElementById('crypto-action-body');
    document.getElementById('crypto-action-modal').style.display = 'flex';
    body.innerHTML = `
        <div class="modal-header"><h3>Send Crypto (Step 1)</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <div class="form-group"><label>Enter Amount</label><input type="number" placeholder="0.00 BTC"></div>
        <button class="btn-primary" onclick="sendStep2()">Next</button>
    `;
}
function sendStep2() {
    const body = document.getElementById('crypto-action-body');
    body.innerHTML = `
        <div class="modal-header"><h3>Send Crypto (Step 2)</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <div class="form-group"><label>Recipient Wallet Address</label><input type="text" placeholder="Paste address"></div>
        <button class="btn-primary" onclick="sendStep3()">Next</button>
    `;
}
function sendStep3() {
    const body = document.getElementById('crypto-action-body');
    body.innerHTML = `
        <div class="modal-header"><h3>Confirm Recipe (Step 3)</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <p style="margin-bottom:20px; color:#9ca3af;">Please verify transaction details before broadcasting.</p>
        <button class="btn-primary" onclick="alert('You\\'ve successfully sent crypto! 🚀'); closeCryptoModal();">Done / Send</button>
    `;
}
function openAssetDetail(asset) {
    const body = document.getElementById('crypto-action-body');
    document.getElementById('crypto-action-modal').style.display = 'flex';
    body.innerHTML = `
        <div class="modal-header"><h3>${asset} Live Chart</h3><button class="close-btn" onclick="closeCryptoModal()">&times;</button></div>
        <div style="height:120px; background:#1a202c; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#22c55e; margin-bottom:16px;">📈 Live Graph Active ($64,200.00)</div>
        <button class="btn-primary" onclick="openCryptoSend()">Send ${asset}</button>
        <button class="btn-secondary" onclick="openCryptoReceive()">Receive ${asset}</button>
    `;
}
function closeCryptoModal() { document.getElementById('crypto-action-modal').style.display = 'none'; }

// Search & Notifications & Admin
function openSearchTab() { document.getElementById('search-modal').style.display = 'flex'; }
function closeSearchModal() { document.getElementById('search-modal').style.display = 'none'; }
function openNotificationsTab() { document.getElementById('notification-modal').style.display = 'flex'; }
function closeNotificationModal() { document.getElementById('notification-modal').style.display = 'none'; }
function closeAdminModal() { document.getElementById('admin-modal').style.display = 'none'; }
function applyAdminBalance() {
    const val = document.getElementById('admin-bal-input').value;
    if(val) {
        document.getElementById('total-balance').innerText = '$' + parseFloat(val).toLocaleString(undefined, {minimumFractionDigits: 2});
        alert('Balance updated successfully!');
        closeAdminModal();
    }
}
function viewTxDetail(title, amt, date) {
    alert('Transaction Details:\n' + title + '\nAmount: ' + amt + '\nDate: ' + date + '\nStatus: Successful');
}
function openAllTransactions() { alert('Opening full transaction history log...'); }
function openAddBankForm() { alert('Add Bank Account form opened'); }
function openAddCardForm() { alert('Add Debit Card form opened'); }
