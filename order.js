// Select necessary elements
const medicines = document.querySelectorAll('.medicine');
const quantities = document.querySelectorAll('.quantity');
const cartTable = document.getElementById('cartTable').querySelector('tbody');
const totalPriceElem = document.getElementById('totalPrice');
const addToFavouritesBtn = document.getElementById('addToFavourites');
const applyFavouritesBtn = document.getElementById('applyFavourites');
const buyNowBtn = document.getElementById('buyNow');

let favourites = []; // Array to hold favorite medicines

// Handle adding items to cart
medicines.forEach((medicine, index) => {
    medicine.addEventListener('change', () => {
        updateCart(index);
    });
});

quantities.forEach((quantity, index) => {
    quantity.addEventListener('change', () => {
        updateCart(index);
    });
});

function updateCart(index) {
    const medicine = medicines[index];
    const quantity = quantities[index];

    if (medicine.checked && quantity.value > 0) {
        addToCart(medicine, quantity.value);
    } else {
        removeFromCart(medicine);
    }
    updateTotalPrice();
}

// Function to add item to cart
function addToCart(medicine, quantity) {
    let existingRow = findCartItem(medicine);

    if (existingRow) {
        // Update existing row's quantity
        existingRow.cells[1].textContent = quantity;
        existingRow.cells[2].textContent = medicine.getAttribute('data-price') * quantity;
    } else {
        // Create new row for the cart
        const row = cartTable.insertRow();
        const nameCell = row.insertCell(0);
        const qtyCell = row.insertCell(1);
        const priceCell = row.insertCell(2);

        nameCell.textContent = medicine.closest('label').textContent.split('-')[0].trim();
        qtyCell.textContent = quantity;
        priceCell.textContent = medicine.getAttribute('data-price') * quantity;
    }
}

// Function to remove item from cart
function removeFromCart(medicine) {
    const row = findCartItem(medicine);
    if (row) {
        row.remove();
    }
}

// Function to find a cart item in the table
function findCartItem(medicine) {
    const name = medicine.closest('label').textContent.split('-')[0].trim();
    let row = Array.from(cartTable.rows).find(row => row.cells[0].textContent === name);
    return row;
}

// Function to update total price
function updateTotalPrice() {
    let total = 0;
    cartTable.querySelectorAll('tr').forEach(row => {
        total += parseFloat(row.cells[2].textContent);
    });
    totalPriceElem.textContent = `LKR ${total}`;
}

// Handle adding to favourites
addToFavouritesBtn.addEventListener('click', () => {
    favourites = [];
    medicines.forEach((medicine, index) => {
        if (medicine.checked && quantities[index].value > 0) {
            favourites.push({ name: medicine.closest('label').textContent.split('-')[0].trim(), quantity: quantities[index].value });
        }
    });
    alert('Added to favourites!');
});

// Handle applying favourites
applyFavouritesBtn.addEventListener('click', () => {
    clearCart();
    favourites.forEach(favourite => {
        const index = Array.from(medicines).findIndex(medicine => medicine.closest('label').textContent.split('-')[0].trim() === favourite.name);
        if (index >= 0) {
            medicines[index].checked = true;
            quantities[index].value = favourite.quantity;
            updateCart(index);
        }
    });
});

// Function to clear cart
function clearCart() {
    cartTable.innerHTML = '';
    updateTotalPrice();
}


// Save the cart data to localStorage when "Buy Now" is clicked
buyNowBtn.addEventListener('click', () => {
    const cartItems = [];

    cartTable.querySelectorAll('tr').forEach(row => {
        const itemName = row.cells[0].textContent;
        const quantity = row.cells[1].textContent;
        const price = row.cells[2].textContent;

        cartItems.push({ name: itemName, quantity: quantity, price: price });
    });

    if (cartItems.length > 0) {
        // Save the cart items and total price to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('totalAmount', document.getElementById('totalPrice').textContent);

        // Redirect to the order summary page
        window.location.href = 'order_summary.html';
    } else {
        alert('Your cart is empty!');
    }
});

// Load cart items from sessionStorage when the page loads
window.addEventListener('load', () => {
    loadCart();
});

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

// Handle adding items to cart
medicines.forEach((medicine, index) => {
    medicine.addEventListener('change', () => {
        updateCart(index);
    });
});

quantities.forEach((quantity, index) => {
    quantity.addEventListener('change', () => {
        updateCart(index);
    });
});

function updateCart(index) {
    const medicine = medicines[index];
    const quantity = quantities[index];

    if (medicine.checked && quantity.value > 0) {
        addToCart(medicine, quantity.value);
    } else {
        // Clear the quantity input if unchecked
        if (!medicine.checked) {
            quantity.value = '';
        }
        removeFromCart(medicine);
    }
    updateTotalPrice();
}

function addToCart(medicine, quantity) {
    let existingRow = findCartItem(medicine);

    if (existingRow) {
        // Update existing row's quantity
        existingRow.cells[1].textContent = quantity;
        existingRow.cells[2].textContent = medicine.getAttribute('data-price') * quantity;
    } else {
        // Create new row for the cart
        const row = cartTable.insertRow();
        const nameCell = row.insertCell(0);
        const qtyCell = row.insertCell(1);
        const priceCell = row.insertCell(2);

        nameCell.textContent = medicine.closest('label').textContent.split('-')[0].trim();
        qtyCell.textContent = quantity;
        priceCell.textContent = medicine.getAttribute('data-price') * quantity;
    }
    saveCartToSession();
}

function removeFromCart(medicine) {
    const row = findCartItem(medicine);
    if (row) {
        row.remove();
        saveCartToSession();
    }
}

function findCartItem(medicine) {
    const name = medicine.closest('label').textContent.split('-')[0].trim();
    let row = Array.from(cartTable.rows).find(row => row.cells[0].textContent === name);
    return row;
}

function updateTotalPrice() {
    let total = 0;
    cartTable.querySelectorAll('tr').forEach(row => {
        total += parseFloat(row.cells[2].textContent);
    });
    totalPriceElem.textContent = `LKR ${total}`;
}

function saveCartToSession() {
    const cartItems = [];

    cartTable.querySelectorAll('tr').forEach(row => {
        const itemName = row.cells[0].textContent;
        const quantity = row.cells[1].textContent;
        const price = row.cells[2].textContent;

        cartItems.push({ name: itemName, quantity: quantity, price: price });
    });

    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    sessionStorage.setItem('totalAmount', document.getElementById('totalPrice').textContent);
}