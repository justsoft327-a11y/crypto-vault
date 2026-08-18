let currentBalance = 0.00;

// Initialize app with $0.00 balance
window.addEventListener('DOMContentLoaded', () => {
    updateBalanceDisplay();
});

function switchTab(index) {
    const tabs = document.querySelectorAll('.tab-content');
    const navItems = document.querySelectorAll('.nav-item');

    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    navItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openBillModal(serviceName) {
    document.getElementById('bill-modal-title').innerText = `Pay ${serviceName}`;
    openModal('bill-modal');
}

function selectDepositMethod(method) {
    closeModal('deposit-method-modal');
    if (method === 'plaid') {
        openModal('plaid-modal');
    } else {
        openModal('deposit-modal');
    }
}

function triggerPlaidSuccess(bankName) {
    closeModal('plaid-modal');
    showNotification(`Successfully linked ${bankName} via Plaid!`);
    currentBalance += 50.00; // Example initial funding upon link
    updateBalanceDisplay();
}

function executeDeposit() {
    const amountInput = document.getElementById('deposit-amount-input');
    const val = parseFloat(amountInput.value);
    if (!isNaN(val) && val > 0) {
        currentBalance += val;
        updateBalanceDisplay();
        submitAction(`Successfully deposited $${val.toFixed(2)}`);
    } else {
        showNotification('Please enter a valid deposit amount');
    }
}

function updateBalanceDisplay() {
    const formatted = `$${currentBalance.toFixed(2)}`;
    document.getElementById('display-balance').innerText = formatted;
    document.getElementById('display-usd-asset').innerText = `${formatted} USD`;
    document.getElementById('withdraw-balance-label').innerText = `Available Balance: ${formatted}`;
}

// Secret Triple Tap on Eye Icon for Admin Tweak Control
let eyeTapCount = 0;
let eyeTapTimer = null;

function handleEyeTap() {
    eyeTapCount++;
    clearTimeout(eyeTapTimer);
    
    eyeTapTimer = setTimeout(() => {
        eyeTapCount = 0;
    }, 1200);

    if (eyeTapCount >= 3) {
        eyeTapCount = 0;
        openModal('admin-modal');
    }
}

function applyAdminBalance() {
    const inputVal = parseFloat(document.getElementById('admin-balance-input').value);
    if (!isNaN(inputVal)) {
        currentBalance = inputVal;
        updateBalanceDisplay();
        closeModal('admin-modal');
        showNotification(`Balance tweaked to $${currentBalance.toFixed(2)}`);
    } else {
        showNotification('Invalid balance number');
    }
}

function submitAction(message) {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
    showNotification(message);
}

function showNotification(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
