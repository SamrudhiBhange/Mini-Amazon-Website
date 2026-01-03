let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartDiv = document.getElementById("cartItems");

function renderCart() {
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        cartDiv.innerHTML += `
        <div class="cart-item">
            <img src="${item.img}">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <button onclick="updateQty(${index}, -1)">−</button>
            ${item.qty}
            <button onclick="updateQty(${index}, 1)">+</button>
            <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
}

renderCart();
