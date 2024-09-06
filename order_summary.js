// Load the cart from sessionStorage
function loadCart() {
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];
    const totalAmount = sessionStorage.getItem('totalAmount') || 'LKR 0';
    const cartTableBody = document.getElementById('cartTable').querySelector('tbody');

    // Clear the table body
    cartTableBody.innerHTML = '';

    cartData.forEach(item => {
        const row = cartTableBody.insertRow();
        const nameCell = row.insertCell(0);
        const quantityCell = row.insertCell(1);
        const priceCell = row.insertCell(2);

        nameCell.textContent = item.name;
        quantityCell.textContent = item.quantity;
        priceCell.textContent = item.price;
    });

    // Update the total amount
    document.getElementById('totalPrice').textContent = totalAmount;
}

// Handle payment method dropdown
const paymentMethodSelect = document.getElementById('paymentMethod');
const cardDetailsSection = document.getElementById('cardDetails');

// Show/hide card details based on selected payment method
paymentMethodSelect.addEventListener('change', function () {
    if (paymentMethodSelect.value === 'creditCard') {
        cardDetailsSection.style.display = 'block';
    } else {
        cardDetailsSection.style.display = 'none';
    }
});

// Event listener for form submission
document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Check payment method and required fields
    let paymentInfo = '';

    if (paymentMethod === 'creditCard') {
        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        paymentInfo = `Card Number: ${cardNumber}\nExpiry Date: ${expiryDate}`;
    } else if (paymentMethod === 'bankTransfer') {
        paymentInfo = 'Payment Method: Bank Transfer';
    } else if (paymentMethod === 'mobilePayment') {
        paymentInfo = 'Payment Method: Mobile Payment';
    }

    // Simulate order processing (In real scenario, you would send this to a server)
    alert(`Order placed successfully!\n\nName: ${fullName}\nEmail: ${email}\nAddress: ${address}\nPhone: ${phone}\n${paymentInfo}`);

    // Clear the session storage
    sessionStorage.removeItem('cart');
    sessionStorage.removeItem('totalAmount');
});

// Load cart items when the page loads
window.addEventListener('load', loadCart);
