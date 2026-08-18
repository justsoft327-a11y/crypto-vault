// Navigation & Screen Management
function openScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

function closeScreen(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('active');
    }
}

function switchTab(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
    }
}

// Admin Balance Tweak Logic
let userBalance = 0.00;
let btcHolding = 0.00;

function applyAdminBalance() {
    const inputVal = document.getElementById('admin-custom-balance').value;
    const customAmount = parseFloat(inputVal) || 0;
    
    userBalance = customAmount;
    
    const totalBalElem = document.getElementById('total-crypto-balance');
    if (totalBalElem) {
        totalBalElem.textContent = `$${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    closeScreen('screen-admin-tweak');
    alert(`Balance successfully updated to $${customAmount.toLocaleString()}`);
}

// Dynamic Transaction History
let transactions = [
    { type: 'Deposit USD', amount: '+$500.00', date: 'Yesterday', status: 'Completed', icon: 'fa-university', color: 'text-green-500' }
];

function renderTransactions() {
    const container = document.getElementById('transaction-history-list');
    if (!container) return;

    if (transactions.length === 0) {
        container.innerHTML = `<div class="text-gray-500 text-xs text-center py-4">No transactions yet</div>`;
        return;
    }

    container.innerHTML = transactions.map(tx => `
        <div class="flex items-center justify-between p-3 bg-[#181a20] rounded-xl mb-2 border border-gray-800">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center ${tx.color}">
                    <i class="fas ${tx.icon}"></i>
                </div>
                <div>
                    <h4 class="text-white text-sm font-semibold">${tx.type}</h4>
                    <span class="text-gray-400 text-xs">${tx.date} • ${tx.status}</span>
                </div>
            </div>
            <span class="text-white font-bold text-sm">${tx.amount}</span>
        </div>
    `).join('');
}

// Interactive Event Listeners & Flow Control
document.addEventListener('DOMContentLoaded', () => {
    renderTransactions();

    const buyAmountInput = document.getElementById('buy-amount');
    const estimatedBtcText = document.getElementById('estimated-btc');
    const btcPrice = 63002.17;

    if (buyAmountInput && estimatedBtcText) {
        buyAmountInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value) || 0;
            const btcCalc = (val / btcPrice).toFixed(4);
            estimatedBtcText.textContent = `~ ${btcCalc} BTC`;
        });
    }

    const buyContinueBtn = document.getElementById('buy-btc-continue');
    if (buyContinueBtn) {
        buyContinueBtn.addEventListener('click', () => {
            const amount = parseFloat(buyAmountInput.value) || 0;
            if (amount <= 0) {
                alert('Please enter a valid purchase amount');
                return;
            }

            const btcBought = (amount / btcPrice).toFixed(4);
            btcHolding += parseFloat(btcBought);

            const btcDisplay = document.getElementById('btc-amount-display');
            if (btcDisplay) {
                btcDisplay.textContent = `${btcHolding.toFixed(4)} BTC`;
            }

            transactions.unshift({
                type: 'Buy BTC',
                amount: `-$${amount.toFixed(2)}`,
                date: 'Just now',
                status: 'Completed',
                icon: 'fa-bitcoin',
                color: 'text-orange-500'
            });

            renderTransactions();
            closeScreen('screen-crypto-trade');
            alert(`Successfully purchased ${btcBought} BTC!`);
        });
    }
});
