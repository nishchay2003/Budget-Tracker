let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');

form.addEventListener('submit', addTransaction);

function addTransaction(e) {
    e.preventDefault();
    
    const transaction = {
        id: Date.now(),
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
        type: typeSelect.value
    };
    
    transactions.push(transaction);
    updateLocalStorage();
    updateDisplay();
    form.reset();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    updateDisplay();
}

function updateDisplay() {
    // Clear list
    transactionList.innerHTML = '';
    
    // Add transactions to list
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.className = `transaction-item ${transaction.type}`;
        
        li.innerHTML = `
            <span>${transaction.description}</span>
            <span class="transaction-amount ${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}₹${Math.abs(transaction.amount).toFixed(2)}
            </span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        
        transactionList.appendChild(li);
    });
    
    // Update totals
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    balanceEl.textContent = balance.toFixed(2);
    totalIncomeEl.textContent = income.toFixed(2);
    totalExpenseEl.textContent = expense.toFixed(2);
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize display
updateDisplay();