let unitRate = 10; // Default unit rate

// Function to calculate the bill and save the data
function calculateBill() {
  const totalBill = parseFloat(document.getElementById('totalBill').value);
  const billMonth = document.getElementById('billMonth').value;
  const user1Units = parseFloat(document.getElementById('user1Units').value);
  const user2Units = parseFloat(document.getElementById('user2Units').value);
  const user3Units = parseFloat(document.getElementById('user3Units').value);

  if (isNaN(totalBill) || isNaN(user1Units) || isNaN(user2Units) || isNaN(user3Units)) {
    alert('Please enter valid numbers.');
    return;
  }

  const totalUnits = user1Units + user2Units + user3Units;
  const calculatedAmount = totalUnits * unitRate;
  const adjustmentFactor = totalBill / calculatedAmount;

  const user1Bill = (user1Units * unitRate * adjustmentFactor).toFixed(2);
  const user2Bill = (user2Units * unitRate * adjustmentFactor).toFixed(2);
  const user3Bill = (user3Units * unitRate * adjustmentFactor).toFixed(2);

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
    <h4>Bill Breakdown</h4>
    <ul>
      <li>User 1: ₹${user1Bill}</li>
      <li>User 2: ₹${user2Bill}</li>
      <li>User 3: ₹${user3Bill}</li>
    </ul>
  `;

  saveData(billMonth, user1Bill, user2Bill, user3Bill);
}

// Function to save data to localStorage
function saveData(billMonth, user1Bill, user2Bill, user3Bill) {
  let savedData = JSON.parse(localStorage.getItem('billData')) || [];

  savedData.push({
    billMonth: billMonth, // Store the month correctly
    user1Bill: user1Bill,
    user2Bill: user2Bill,
    user3Bill: user3Bill
  });

  localStorage.setItem('billData', JSON.stringify(savedData));
}

// Function to load and display data in the Data Page
function loadData() {
  const dataBody = document.getElementById('dataBody');
  if (!dataBody) return;

  const savedData = JSON.parse(localStorage.getItem('billData')) || [];

  dataBody.innerHTML = '';
  savedData.forEach((entry, index) => {
    const row = `
      <tr>
        <td>${entry.billMonth}</td> <!-- Ensure the month is displayed here -->
        <td>₹${entry.user1Bill}</td>
        <td>₹${entry.user2Bill}</td>
        <td>₹${entry.user3Bill}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteEntry(${index})">Delete</button></td>
      </tr>
    `;
    dataBody.innerHTML += row;
  });
}

// Function to delete an entry
function deleteEntry(index) {
  let savedData = JSON.parse(localStorage.getItem('billData')) || [];
  savedData.splice(index, 1);
  localStorage.setItem('billData', JSON.stringify(savedData));
  loadData();
}

// Load data on the Data Page
document.addEventListener('DOMContentLoaded', loadData);
