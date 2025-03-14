// ... existing cart code ...

document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length > 0) {
        // Save cart to localStorage before redirect
        localStorage.setItem('cartItems', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    }
});

// On checkout page
if (document.getElementById('order-summary')) {
    const cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const summary = document.getElementById('order-summary');
    let total = 0;
    
    let summaryHTML = '<h3>Order Summary</h3>';
    cart.forEach(item => {
        summaryHTML += `
            <div class="order-item">
                <span>${item.name}</span>
                <span>$${item.price}</span>
            </div>
        `;
        total += item.price;
    });
    
    summaryHTML += `<div class="order-total">Total: $${total.toFixed(2)}</div>`;
    summary.innerHTML = summaryHTML;
    
    // Add hidden fields for order details
    const form = document.getElementById('checkout-form');
    const orderDetails = document.createElement('input');
    orderDetails.type = 'hidden';
    orderDetails.name = 'order_details';
    orderDetails.value = cart.map(item => `${item.name} - $${item.price}`).join('\n');
    form.appendChild(orderDetails);
    
    const totalAmount = document.createElement('input');
    totalAmount.type = 'hidden';
    totalAmount.name = 'total_amount';
    totalAmount.value = total;
    form.appendChild(totalAmount);
}

function buyNow(product) {
    // Save single product to session
    localStorage.setItem('buyNowItem', JSON.stringify(product));
    // Redirect to checkout page
    window.location.href = 'checkout.html';
}

// On checkout page
window.onload = function() {
    // Check if coming from "Buy Now" button
    const buyNowItem = JSON.parse(localStorage.getItem('buyNowItem'));
    if (buyNowItem) {
        // Pre-fill order summary with single item
        document.getElementById('order-summary').innerHTML = `
            <div class="product-summary">
                <img src="${buyNowItem.image}" alt="${buyNowItem.name}">
                <div class="product-details">
                    <h3>${buyNowItem.name}</h3>
                    <p class="price">$${buyNowItem.price}</p>
                </div>
            </div>
        `;
    }
} 