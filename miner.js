let miningInterval = null;
let coinBalance = parseFloat(localStorage.getItem('minerCoins')) || 0;
const AZN_RATE = 1; 
const MINING_RATE_PER_MS = 0.00001; 

function addTransaction(type, amount) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const newTx = {
        id: Date.now(),
        type: type,
        amount: amount,
        date: new Date().toLocaleString('az-AZ')
    };
    transactions.unshift(newTx);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateDisplay() {
    const formattedCoins = coinBalance.toFixed(7);
    document.getElementById('coin-balance-display').innerText = formattedCoins;
    
    const withdrawableAZN = Math.floor(coinBalance * AZN_RATE);
    document.getElementById('azn-display').innerText = withdrawableAZN.toFixed(0);

    const withdrawButton = document.getElementById('withdraw-btn');
    if (withdrawableAZN >= 15) {
        withdrawButton.disabled = false;
        withdrawButton.classList.remove('opacity-50');
    } else {
        withdrawButton.disabled = true;
        withdrawButton.classList.add('opacity-50');
    }
}

function startMining() {
    if (miningInterval !== null) return;
    
    miningInterval = setInterval(() => {
        coinBalance += (MINING_RATE_PER_MS * 100); 
        localStorage.setItem('minerCoins', coinBalance);
        updateDisplay();
    }, 100);

    document.getElementById('start-btn').textContent = 'Mining in progress...';
    document.getElementById('start-btn').classList.remove('bg-green-600', 'hover:bg-green-700');
    document.getElementById('start-btn').classList.add('bg-gray-500', 'hover:bg-gray-600');
    document.getElementById('start-btn').removeEventListener('click', startMining);
    document.getElementById('start-btn').addEventListener('click', stopMining);
}

function stopMining() {
    if (miningInterval !== null) {
        clearInterval(miningInterval);
        miningInterval = null;
        document.getElementById('start-btn').textContent = 'Start Mining';
        document.getElementById('start-btn').classList.remove('bg-gray-500', 'hover:bg-gray-600');
        document.getElementById('start-btn').classList.add('bg-green-600', 'hover:bg-green-700');
        document.getElementById('start-btn').removeEventListener('click', stopMining);
        document.getElementById('start-btn').addEventListener('click', startMining);
        localStorage.setItem('minerCoins', coinBalance); 
    }
}

function handleWithdraw() {
    const withdrawableAZN = Math.floor(coinBalance * AZN_RATE);
    
    if (withdrawableAZN < 15) {
        alert("Withdrawal failed: Minimum withdrawal is 15 ₼.");
        return;
    }

    let userBalance = parseFloat(localStorage.getItem('userBalance')) || 0;
    userBalance += withdrawableAZN;
    localStorage.setItem('userBalance', userBalance);

    const coinsDeducted = withdrawableAZN / AZN_RATE;
    coinBalance -= coinsDeducted;
    localStorage.setItem('minerCoins', coinBalance);
    
    addTransaction("Deposit (Miner)", withdrawableAZN);

    alert(`Successfully withdrew ${withdrawableAZN} ₼! New wallet balance: ${userBalance.toFixed(2)} ₼.`);
    updateDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('authToken')) {
        window.location.href = 'login.html';
        return;
    }
    
    updateDisplay();

    document.getElementById('start-btn').addEventListener('click', startMining);
    document.getElementById('withdraw-btn').addEventListener('click', handleWithdraw);
    
    window.addEventListener('beforeunload', stopMining);
});