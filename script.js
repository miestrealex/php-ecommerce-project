
let cartCount = 0;

let cartItems = [];

let allProducts = [];

const overlay = document.getElementById("overlay");

const cartIcon = document.getElementById("cart-icon");

const sidebar = document.getElementById("sidebar");

const userIcon = document.getElementById("user-icon");

const loginDropdown = document.getElementById("login-dropdown");

const userMenu = document.getElementById("user-menu");

const userDropdown = document.getElementById("user-dropdown");

const productsContainer = document.getElementById("products");

const search = document.getElementById("search");

/* =========================
   OVERLAY
========================= */

function updateOverlay(){

    if(
        sidebar.classList.contains("active") ||
        loginDropdown.classList.contains("active") ||
        userDropdown.classList.contains("active")
    ){

        overlay.classList.add("active");

    } else {

        overlay.classList.remove("active");

    }

}

/* =========================
   LOCAL STORAGE
========================= */

const savedCart = localStorage.getItem("cartItems");

if (savedCart) {

    cartItems = JSON.parse(savedCart);

    cartItems.forEach(item => {

        cartCount += item.quantity;

    });

}

/* =========================
   FETCH PRODUCTS
========================= */

fetch("products.php")

    .then(res => res.json())

    .then(products => {

        allProducts = products;

        displayProducts(products);

    });

/* =========================
   CART
========================= */

updateCart();

function getBadgeClass(badge){

    switch(badge){

        case "SALE":
            return "badge-red";

        case "NEW":
            return "badge-green";

        case "HOT":
            return "badge-orange";

        case "LIMITED":
            return "badge-black";

        default:
            return "";

    }

}

function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `

        <div class="product-cart">

            ${product.badge ? `
                <span class="promo-badge ${getBadgeClass(product.badge)}">
                    ${product.badge}
                </span>
            ` : ""}

            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>

            <h3>${product.name}</h3>

            <p class="price">
                CHF ${product.price}
            </p>

            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                Comprar
            </button>

        </div>

        `;

    });

}

function addToCart(productName, productPrice, productImage) {

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
            image: productImage,
            quantity: 1

        });

    }

    updateCart();

}

function updateCart() {

    const cartItemsDiv = document.getElementById("cart-items");

    cartItemsDiv.innerHTML = "";

    let total = 0;

    cartItems.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        cartItemsDiv.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>CHF ${item.price}</p>

                <div class="quantity-controls">

                    <button onclick="event.stopPropagation(); decreaseQuantity(${index})">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="event.stopPropagation(); increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

        </div>

        `;

        total += itemTotal;

    });

    document.getElementById("cart-total").innerText =` Total: CHF ${total}`;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

}

function increaseQuantity(index){

    cartItems[index].quantity++;

    cartCount++;

    document.getElementById("cart-count").innerText = cartCount;

    updateCart();

}

function decreaseQuantity(index){

    cartItems[index].quantity--;

    cartCount--;

    if(cartItems[index].quantity <= 0){

        cartItems.splice(index, 1);

    }

    document.getElementById("cart-count").innerText = cartCount;

    updateCart();

}

/* =========================
   BUTTONS
========================= */

cartIcon.onclick = function(event){

    event.stopPropagation();

    // FECHAR OUTROS
    loginDropdown.classList.remove("active");
    userDropdown.classList.remove("active");

    // TOGGLE CARRINHO
    sidebar.classList.toggle("active");

    updateOverlay();

}

if(userIcon){

    userIcon.onclick = function(event){

        event.stopPropagation();

        // FECHAR OUTROS
        sidebar.classList.remove("active");
        userDropdown.classList.remove("active");

        // TOGGLE LOGIN
        loginDropdown.classList.toggle("active");

        updateOverlay();

    }

}

if(userMenu){

    userMenu.onclick = function(event){

        event.stopPropagation();

        // FECHAR OUTROS
        sidebar.classList.remove("active");
        loginDropdown.classList.remove("active");

        // TOGGLE USER MENU
        userDropdown.classList.toggle("active");

        updateOverlay();

    }

}

/* =========================
   FECHAR AO CLICAR FORA
========================= */

document.body.addEventListener("click", function(event){

    // IGNORAR CLIQUES NOS BOTÕES E MENUS
    if(
        cartIcon.contains(event.target) ||
        sidebar.contains(event.target) ||
        userIcon.contains(event.target) ||
        loginDropdown.contains(event.target) ||
        userMenu.contains(event.target) ||
        userDropdown.contains(event.target)
    ){
        return;
    }

    // FECHAR TUDO
    sidebar.classList.remove("active");

    loginDropdown.classList.remove("active");

    userDropdown.classList.remove("active");

    updateOverlay();

});

/* =========================
   SEARCH
========================= */

search.addEventListener("input", () => {

    const searchValue = search.value.toLowerCase();

    const filteredProducts = allProducts.filter(product => {

        return product.name.toLowerCase().includes(searchValue);

    });

    displayProducts(filteredProducts);

});

