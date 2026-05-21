let cartCount = 0;
let cartItems = [];
let allProducts =[];

const savedCart = localStorage.getItem("cartItems");
if (savedCart) {
    cartItems = JSON.parse(savedCart);
    cartItems.forEach(item => {cartCount += item.quantity;
    });
}

const productsContainer = document.getElementById("products");

const search = document.getElementById("search");
fetch("products.php")
    .then(res => res.json())
    .then(products => {
        allProducts = products;
        displayProducts(products);
    });

updateCart();


function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        productsContainer.innerHTML += `
        <div>
            <h3>${product.name}</h3>
            <p>CHF ${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">
                Comprar
            </button>
        </div>
        `;
    });
}

function addToCart(productName, productPrice) {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;

    const existingProduct = cartItems.find(
        item => item.name === productName
    );
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems.push({
            name: productName,
            price: Number(productPrice),
            quantity: 1
        });
    }
    console.log (cartItems);
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById("cart-items");

    cartItemsDiv.innerHTML = "";

    let total = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;

        cartItemsDiv.innerHTML += `
        <p> 
            ${item.name}
            <button onclick="decreaseQuantity(${index})">
            -
            </button>
            x${item.quantity}
            <button onclick="increaseQuantity(${index})">
            +
            </button>
            - CHF ${itemTotal}
            
        </p>
        `;

        total += itemTotal;

    });
    document.getElementById("cart-total").innerText = `Total: CHF ${total}`;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

}

function removeFromCart(index) {

    cartCount -= cartItems[index].quantity;

    cartItems.splice(index, 1);

    document.getElementById("cart-count").innerText = cartCount;

    updateCart();

}

function increaseQuantity(index) {
    cartItems[index].quantity++;
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
    updateCart();
}

function decreaseQuantity(index) {

    cartItems[index].quantity--;

    cartCount--;

    // se quantidade chegar a 0
    if (cartItems[index].quantity <= 0) {

        cartItems.splice(index, 1);

    }

    document.getElementById("cart-count").innerText = cartCount;

    updateCart();
}

const cartIcon = document.getElementById("cart-icon");
const sidebar = document.getElementById("sidebar");

cartIcon.onclick = function(){
    
    sidebar.classList.toggle("active");
}


search.addEventListener("input", () =>{

    const searchValue = search.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => {
            return product.name.toLowerCase().includes(searchValue);
    });
    displayProducts(filteredProducts);

});


