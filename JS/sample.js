// PRODUCT LIST
const products = [
    { id: 1, name: "Product name", price: 1599, img: "./images/R6_0425.png" },
    { id: 2, name: "Product name", price: 599, img: "./images/Outofstock.png" },
    { id: 3, name: "Product name", price: 199, img: "./images/Rectangle 29438.png" },
    { id: 4, name: "Product name", price: 299, img: "./images/R6_0436.png" },
    { id: 5, name: "Product name", price: 1299, img: "./images/R6_0424.png" },
    { id: 6, name: "Product name", price: 599, img: "./images/R6_0440.png" }
];

let cart = [];

const productContainer = document.getElementById("productContainer");

// DISPLAY PRODUCTS
products.forEach(p => {
    productContainer.innerHTML += `
        <div class="product-card">
            <img src="${p.img}" alt="">
            <h3>${p.name}</h3>
            <p class="price">₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `;
});

// ADD TO CART
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    document.getElementById("cartCount").innerText = cart.length;
}

// SHOW / HIDE CART
const popup = document.getElementById("cartPopup");
function toggleCart() {
    
    popup.style.display = popup.style.display === "block" ? "none" : "block";
    displayCart();
}
function addToCart(id){
    let item = cart.find(x => x.id === id);

    if(item){
        item.qty++;
    } else {
        let product = products.find(x => x.id === id);
        cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, qty: 1 });
    }

    updateCart();
}
function updateCart(){
    document.getElementById("cartCount").innerText = cart.reduce((a,b)=>a + b.qty, 0);
    renderCart();
}
function toggleCart(){
    const popup = document.getElementById("cartPopup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
    renderCart();
}
// CART ITEMS
function renderCart(){
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.qty * item.price;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cartmain">
                    <p><b>${item.name}</b></p>
                    Price: ₹${itemTotal}
                    <div class="itemcounts">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    ${item.qty}
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                    <div class="remove" onclick="removeItem(${item.id})">Remove</div>
                </div>
            </div>
        `;
    });

    document.getElementById("totalPrice").innerText =
        cart.length ? `Total Amount: ₹${total}` : "Cart is Empty";
}

function changeQty(id, val){
    let item = cart.find(x => x.id === id);
    item.qty += val;
    if(item.qty <= 0){
        removeItem(id);
    }

    updateCart();
}
// REMOVE ITEM 
function removeItem(id){
    cart = cart.filter(x => x.id !== id);
    updateCart();
}
// INITIAL LOAD
updateCart();

