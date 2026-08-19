// Tab Switching Logic
function switchTab(tabId, element) {
    // Hide all view sections
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.classList.remove('active'));

    // Show the target view section
    const targetView = document.getElementById('view-' + tabId);
    if (targetView) {
        targetView.classList.add('active');
    }

    // Update active state on bottom navigation bar items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// Eye Icon Balance Visibility Toggle
let isBalanceHidden = false;
function handleEyeTap() {
    isBalanceHidden = !isBalanceHidden;
    const balanceEls = document.querySelectorAll('.balance-amount');
    balanceEls.forEach(el => {
        if (isBalanceHidden) {
            el.classList.add('blurred');
        } else {
            el.classList.remove('blurred');
        }
    });
    const eyeIcon = document.getElementById('eye-icon');
    if (eyeIcon) {
        eyeIcon.textContent = isBalanceHidden ? '🙈' : '👁️';
    }
}

// Modal Open & Close Control Functions
function openSettingsMenu() {
    document.getElementById('settings-modal').style.display = 'flex';
}
function closeSettingsModal() {
    document.getElementById('settings-modal').style.display = 'none';
}

function openDepositModal() {
    document.getElementById('deposit-modal').style.display = 'flex';
}
function closeDepositModal() {
    document.getElementById('deposit-modal').style.display = 'none';
}

function openWithdrawModal() {
    document.getElementById('withdraw-modal').style.display = 'flex';
}
function closeWithdrawModal() {
    document.getElementById('withdraw-modal').style.display = 'none';
}

function openConvertModal() {
    document.getElementById('convert-modal').style.display = 'flex';
}
function closeConvertModal() {
    document.getElementById('convert-modal').style.display = 'none';
}

function openCardsUploadModal() {
    document.getElementById('cards-upload-modal').style.display = 'flex';
}
function closeCardsUploadModal() {
    document.getElementById('cards-upload-modal').style.display = 'none';
}

function openSearchTab() {
    document.getElementById('search-modal').style.display = 'flex';
}
function closeSearchModal() {
    document.getElementById('search-modal').style.display = 'none';
}

function openNotificationsTab() {
    document.getElementById('notification-modal').style.display = 'flex';
}
function closeNotificationModal() {
    document.getElementById('notification-modal').style.display = 'none';
}

// Sub-settings Dynamic Loader
function openSubSettings(type) {
    const body = document.getElementById('sub-settings-body');
    body.innerHTML = `
        <div class="modal-header">
            <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Settings</h3>
            <button class="close-btn" onclick="closeSubSettings()">&times;</button>
        </div>
        <p style="color: #9ca3af; font-size: 14px; margin-bottom: 20px;">Manage your configurations and options for ${type} here.</p>
        <button class="btn-primary" onclick="closeSubSettings()">Done</button>
    `;
    document.getElementById('sub-settings-modal').style.display = 'flex';
}

function closeSubSettings() {
    document.getElementById('sub-settings-modal').style.display = 'none';
}

// Interactive Triggers & Actions
function confirmWithdrawal() {
    alert('Withdrawal request submitted successfully!');
    closeWithdrawModal();
}

function submitCardVerification() {
    alert('Verification documents uploaded successfully.');
    closeCardsUploadModal();
}

function openBillMenu(category) {
    alert('Opening bill payment category: ' + category);
}

function viewTxDetail(title, amount, date) {
    alert(`Transaction Details\n\nType: ${title}\nAmount: ${amount}\nDate: ${date}`);
}

function openAssetDetail(asset) {
    alert('Opening market portfolio view for ' + asset);
}

function openCryptoTrade() {
    alert('Crypto Trading interface launched.');
}

function openCryptoReceive() {
    alert('Wallet receive address generated.');
}

function openCryptoSend() {
    alert('Send crypto transfer screen opened.');
}

function openAddBankForm() {
    alert('Add Bank Account form opened.');
}

function openAddCardForm() {
    alert('Add Debit Card form opened.');
}
