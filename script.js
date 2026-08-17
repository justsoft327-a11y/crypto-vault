let currentBalance = 1.00;
let btcHeld = 0.000000;
let isHidden = false;

function switchTab(tabName) {
    document.querySelectorAll('.view-content').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName + '-view').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('text-emerald-400');
        item.classList.add('text-gray-400');
    });
    event.currentTarget.classList.remove('text-gray-400');
    event.currentTarget.classList.add('text-emerald-400');
}

function openProfile() {
    document.getElementById('profile-modal').classList.remove('hidden');
}

function closeProfile() {
    document.getElementById('profile-modal').classList.add('hidden');
}

function toggleBalance() {
    isHidden = !isHidden;
    const cashDisplay = document.getElementById('total-cash-display');
    const cryptoDisplay = document.getElementById('total-crypto-balance');
    const usdText = document.getElementById('usd-balance-text');
    const btcText = document.getElementById('btc-usd-display');

    if (isHidden) {
        cashDisplay.textContent = '********';
        cryptoDisplay.textContent = '********';
        usdText.textContent = '********';
        btcText.textContent = '********';
    } else {
        cashDisplay.textContent = '$' + currentBalance.toFixed(2);
        cryptoDisplay.textContent = '$' + currentBalance.toFixed(2);
        usdText.textContent = '$' + currentBalance.toFixed(2);
        btcText.textContent = '$' + (btcHeld * 65420).toFixed(2);
    }
}

function handleAction(actionType) {
    if (actionType === 'Deposit') {
        const amountStr = prompt('Enter USD amount to deposit:');
        if (!amountStr) return;
        const amt = Number(amountStr);
        if (amt > 0) {
            currentBalance += amt;
            document.getElementById('total-cash-display').textContent = '$' + currentBalance.toFixed(2);
            document.getElementById('usd-balance-text').textContent = '$' + currentBalance.toFixed(2);
            alert('Successfully deposited $' + amt.toFixed(2));
        }
    } else if (actionType === 'Withdraw') {
        const amountStr = prompt('Enter USD amount to withdraw:');
        if (!amountStr) return;
        const amt = Number(amountStr);
        if (amt > 0 && amt <= currentBalance) {
            currentBalance -= amt;
            document.getElementById('total-cash-display').textContent = '$' + currentBalance.toFixed(2);
            document.getElementById('usd-balance-text').textContent = '$' + currentBalance.toFixed(2);
            alert('Successfully withdrew $' + amt.toFixed(2));
        } else {
            alert('Invalid amount or insufficient balance.');
        }
    } else if (actionType === 'Convert') {
        alert('Currency conversion feature opened.');
    }
}

document.getElementById('trade-btn').addEventListener('click', () => {
    const amountStr = prompt('Enter USD amount to trade for BTC:');
    if (!amountStr) return;
    const usdSpend = Number(amountStr);
    if (usdSpend <= 0 || usdSpend > currentBalance) {
        alert('Invalid amount or insufficient balance.');
        return;
    }
    currentBalance -= usdSpend;
    const btcBought = usdSpend / 65420;
    btcHeld += btcBought;
    updateUI();
    alert('Successfully traded $' + usdSpend.toFixed(2) + ' for BTC!');
});

document.getElementById('receive-btn').addEventListener('click', () => {
    alert('Receive Crypto:\nYour Bitcoin Address: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
});

document.getElementById('send-btn').addEventListener('click', () => {
    const recipient = prompt('Enter recipient BTC address:');
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

function updateUI() {
    document.getElementById('total-cash-display').textContent = '$' + currentBalance.toFixed(2);
    document.getElementById('usd-balance-text').textContent = '$' + currentBalance.toFixed(2);
    document.getElementById('total-crypto-balance').textContent = '$' + (currentBalance + (btcHeld * 65420)).toFixed(2);
    document.getElementById('btc-held-display').textContent = btcHeld.toFixed(6) + ' BTC';
    document.getElementById('btc-usd-display').textContent = '$' + (btcHeld * 65420).toFixed(2);
}
