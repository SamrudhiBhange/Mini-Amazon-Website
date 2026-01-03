const products = [
    { id: 1, name: "Laptop", price: 50000, img: "images/laptop.jpg", desc: "High performance laptop" },
    { id: 2, name: "Phone", price: 15000, img: "images/phone.jpeg", desc: "Latest smartphone" },
    { id: 3, name: "Headphones", price: 2000, img: "images/headphone.jpeg", desc: "Noise cancelling" },
    { id: 4, name: "Watch", price: 3000, img: "images/watch.jpg", desc: "Smart fitness watch" }
];

let selectedProduct;
const grid = document.getElementById("productGrid");

function renderProducts(list) {
    grid.innerHTML = "";
    list.forEach(p => {
        grid.innerHTML += `
        <div class="card" onclick='openModal(${JSON.stringify(p)})'>
            <img src="${p.img}">
            <h4>${p.name}</h4>
            <p>₹${p.price}</p>
        </div>`;
    });
}

renderProducts(products);

function searchProduct() {
    const value = document.getElementById("search").value.toLowerCase();
    renderProducts(products.filter(p =>
        p.name.toLowerCase().includes(value)));
}

function openModal(product) {
    selectedProduct = product;
    modalImg.src = product.img;
    modalTitle.innerText = product.name;
    modalDesc.innerText = product.desc;
    modalPrice.innerText = "₹" + product.price;
    productModal.style.display = "block";
}

function closeModal() {
    productModal.style.display = "none";
}

function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart.find(i => i.id === selectedProduct.id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ ...selectedProduct, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
    closeModal();
}
