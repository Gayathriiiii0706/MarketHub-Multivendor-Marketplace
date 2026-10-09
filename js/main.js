// ================= SEARCH =================

function openSearch() {

    document.getElementById("searchBox").style.display = "block";

    document.getElementById("searchInput").focus();
}


function closeSearch() {

    document.getElementById("searchBox").style.display = "none";
}


// ================= SEARCH PRODUCTS =================

function searchProducts() {

    const input =
        document.getElementById("searchInput").value.toLowerCase();

    const products =
        document.querySelectorAll(
            ".product-card"
        );

    products.forEach(function(product) {

        const productName =
            product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(input)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// ================= CATEGORY =================

function showCategory(category) {

    alert(
        "You selected the " +
        category +
        " category."
    );

}


// ================= ADD TO CART =================

function addToCart(productName, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product = {

        name: productName,

        price: price,

        quantity: 1

    };

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(
        productName +
        " added to cart!"
    );
}


// ================= CART COUNT =================

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent = cart.length;

    }

}


// Run when page loads

// Run when page loads

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", searchProducts);
}

        loadVendorProducts();

        loadVendorOrders();

        loadAdminOrders();

        loadCustomers();

        loadAdminVendors();

        loadAdminProducts();

        loadAdminStats();
    }
);
// ================= PRODUCT FILTER =================

function filterProducts() {

    const searchText =
        document
        .getElementById("productSearch")
        .value
        .toLowerCase();

    const category =
        document
        .getElementById("categoryFilter")
        .value;

    const products =
        document.querySelectorAll(
            ".marketplace-product"
        );

    let visibleProducts = 0;

    products.forEach(function(product) {

        const name =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const productCategory =
            product.dataset.category
            .toLowerCase();

        const matchesSearch =
            name.includes(searchText);

        let matchesCategory = false;


        // All Categories
        if (category === "all") {

            matchesCategory = true;

        }


        // Electronics
        else if (
            category === "electronics" &&
            productCategory === "electronics"
        ) {

            matchesCategory = true;

        }


        // Fashion
        else if (
            category === "fashion" &&
            productCategory === "fashion"
        ) {

            matchesCategory = true;

        }


        // Bags
        else if (
            category === "bags" &&
            productCategory === "bags"
        ) {

            matchesCategory = true;

        }


        // Home & Kitchen
        else if (
            category === "home" &&
            productCategory === "home & kitchen"
        ) {

            matchesCategory = true;

        }


        // Sports
        else if (
            category === "sports" &&
            productCategory === "sports"
        ) {

            matchesCategory = true;

        }


        if (
            matchesSearch &&
            matchesCategory
        ) {

            product.style.display = "block";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    const noProducts =
        document.getElementById("noProducts");

    if (noProducts) {

        if (visibleProducts === 0) {

            noProducts.style.display = "block";

        } else {

            noProducts.style.display = "none";

        }

    }

}


// Search products while typing
const productSearch =
    document.getElementById("productSearch");

if (productSearch) {

    productSearch.addEventListener(
        "input",
        filterProducts
    );

}
// ================= SORT PRODUCTS =================

function sortProducts() {

    const sort =
        document
        .getElementById("sortFilter")
        .value;

    const grid =
        document.getElementById("productGrid");

    const products =
        Array.from(
            grid.querySelectorAll(
                ".marketplace-product"
            )
        );


    if (sort === "low") {

        products.sort(function(a, b) {

            return (
                Number(a.dataset.price) -
                Number(b.dataset.price)
            );

        });

    }


    if (sort === "high") {

        products.sort(function(a, b) {

            return (
                Number(b.dataset.price) -
                Number(a.dataset.price)
            );

        });

    }


    products.forEach(function(product) {

        grid.appendChild(product);

    });

}
// ================= PRODUCT QUANTITY =================

let productQuantity = 1;


function increaseQuantity() {

    productQuantity++;

    document.getElementById("quantity").textContent =
        productQuantity;

}


function decreaseQuantity() {

    if (productQuantity > 1) {

        productQuantity--;

        document.getElementById("quantity").textContent =
            productQuantity;

    }

}
// ================= PRODUCT DETAILS CART =================

function addProductToCart(
    productId,
    productName,
    price,
    quantity = 1,
    image = ""
) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const product = {

        product_id: productId,

        name: productName,

        price: Number(price),

        quantity: Number(quantity),

        image: image

    };

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(
        product.quantity +
        " × " +
        product.name +
        " added to cart!"
    );

}
// ================= BUY NOW =================

function buyNow() {

    addProductToCart();

    window.location.href = "cart.html";

}
// ================= CART PAGE =================

function loadCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");


    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        document.getElementById("subtotal").textContent =
            "₹0";

        document.getElementById("delivery").textContent =
            "₹0";

        document.getElementById("grandTotal").textContent =
            "₹0";

        document.getElementById("itemCount").textContent =
            "0 Items";

        return;

    }


    emptyCart.style.display = "none";


    // CREATE CART ITEMS

    cart.forEach(function(product, index) {

        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

<div class="cart-item-image">

    <img
        src="${product.image || ""}"
        alt="${product.name || "Product"}"
        style="
            width:100%;
            height:100%;
            object-fit:contain;
        "
    >

</div>

            <div class="cart-item-info">

                <p class="vendor-name">
                    MarketHub Vendor
                </p>

                <h3>
                    ${product.name}
                </h3>

                <div class="cart-item-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>


                <div class="cart-quantity">

                    <button
                        onclick="changeCartQuantity(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="changeCartQuantity(${index}, 1)">
                        +
                    </button>

                </div>


                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">

                    🗑 Remove

                </button>

            </div>


            <div class="item-total">

                ₹${(
                    product.price *
                    product.quantity
                ).toLocaleString("en-IN")}

            </div>

        `;


        cartItems.appendChild(item);

    });


    calculateCartTotal();

    updateCartCount();

}


// ================= CHANGE QUANTITY =================

function changeCartQuantity(index, change) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart[index].quantity += change;


    // Prevent quantity below 1

    if (cart[index].quantity < 1) {

        cart[index].quantity = 1;

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


// ================= REMOVE PRODUCT =================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


// ================= CALCULATE TOTAL =================

function calculateCartTotal() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let subtotal = 0;

    let totalItems = 0;


    cart.forEach(function(product) {

        subtotal +=
            product.price *
            product.quantity;

        totalItems +=
            product.quantity;

    });


    // Delivery is free above ₹999

    let delivery = 0;


    if (subtotal > 0 && subtotal < 999) {

        delivery = 49;

    }


    const total =
        subtotal + delivery;


    document.getElementById("subtotal").textContent =
        "₹" + subtotal.toLocaleString("en-IN");


    document.getElementById("delivery").textContent =
        delivery === 0
            ? "FREE"
            : "₹" + delivery.toLocaleString("en-IN");


    document.getElementById("grandTotal").textContent =
        "₹" + total.toLocaleString("en-IN");


    document.getElementById("itemCount").textContent =
        totalItems +
        (totalItems === 1 ? " Item" : " Items");

}


// ================= CHECKOUT =================

function checkout() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }

    window.location.href = "checkout.html";

}


// ================= LOAD CART PAGE =================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCart();

    }
);
/* ================================
   LOGIN & REGISTER
================================ */

// Show / Hide Password
function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🙈";
    } else {
        input.type = "password";
        button.textContent = "👁️";
    }
}


// Show Vendor Fields
function toggleVendorFields() {

    const selectedRole =
        document.querySelector(
            'input[name="registerRole"]:checked'
        ).value;

    const vendorFields =
        document.getElementById("vendorFields");

    if (selectedRole === "vendor") {
        vendorFields.style.display = "block";
    } else {
        vendorFields.style.display = "none";
    }
}

// Register
async function handleRegister() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const phone = document.getElementById("registerPhone").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;
    const role = document.querySelector('input[name="registerRole"]:checked').value;

    if (!name || !email || !phone || !password || !confirmPassword) {
        alert("Please fill all required fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (!terms) {
        alert("Please accept the Terms & Conditions.");
        return;
    }

    let shopName = "";

    if (role === "vendor") {
        shopName = document.getElementById("shopName").value.trim();

        const category = document.getElementById("businessCategory").value;

        if (!shopName || !category) {
            alert("Please fill vendor details.");
            return;
        }
    }

    const user = {
        name: name,
        email: email.toLowerCase(),
        phone: phone,
        password: password,
        role: role
    };

    // Save vendor details in the Django database
    if (role === "vendor") {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/vendors/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        full_name: name,
                        email: email,
                        phone: phone,
                        business_name: shopName
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Vendor registration failed.");
                return;
            }

            // Save the real Django vendor ID
            user.vendorId = data.vendor.id;
            localStorage.setItem(
                "marketHubVendorId",
                String(data.vendor.id)
            );

        } catch (error) {
            console.error("Vendor registration error:", error);
            alert(
                "Could not connect to the server. Please check that Django is running."
            );
            return;
        }
    }

    // Save the frontend account
    localStorage.setItem("marketHubUser", JSON.stringify(user));

    alert("Account created successfully! 🎉");

    window.location.href = "login.html";
}

// Login
function handleLogin() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const role =
        document.querySelector(
            'input[name="loginRole"]:checked'
        ).value;


    if (!email || !password) {

        alert("Please enter email and password.");
        return;
    }


    // Get registered user
    const savedUser =
        JSON.parse(
            localStorage.getItem("marketHubUser")
        );


    if (!savedUser) {

        alert(
            "No account found. Please create an account first."
        );

        return;
    }


    // Check email
    if (savedUser.email.toLowerCase()!== email.toLowerCase()) {

        alert("Email does not match.");
        return;
    }


    // Check account type
    if (savedUser.role !== role) {

        alert("Account type does not match.");
        return;
    }


    // Check password
    if (savedUser.password !== password) {

        alert("Incorrect password.");
        return;
    }


    // Login successful
localStorage.setItem(
    "marketHubLoggedIn",
    "true"
);

localStorage.setItem(
    "marketHubRole",
    role
);

// Save the currently logged-in user's details
localStorage.setItem(
    "marketHubLoggedInUser",
    JSON.stringify(savedUser)
);


alert("Login successful! 🎉");

if (role === "vendor") {

 window.location.href = "vendor-dashboard.html";

} else if (role === "admin") {

 window.location.href = "admin.html";

} else {

 window.location.href = "index.html";

}
}
// Forgot Password
function forgotPassword() {

    alert(
        "Password reset will be connected to Django backend later."
    );
}
/* =================================
   VENDOR DASHBOARD
================================= */

// Show Add Product section
function showAddProduct() {

    const section =
        document.getElementById("addProduct");

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }
}

// Add / Edit Vendor Product
async function addVendorProduct(event) {

    event.preventDefault();

    const name =
        document.getElementById("productName").value.trim();

    const categoryName =
        document.getElementById("productCategory").value;

    const price =
        document.getElementById("productPrice").value;

    const stock =
        document.getElementById("productStock").value;

    const description =
        document.getElementById("productDescription").value.trim();

    const editProductId =
        document.getElementById("editProductId").value;

    const imageInput =
        document.getElementById("productImage");

    const imageFile =
        imageInput ? imageInput.files[0] : null;


    if (!name || !categoryName || !price || !stock || !description) {

        alert("Please fill all product details.");

        return;
    }


    // Category name → Category ID
    let categoryId = 21;

    if (categoryName === "Electronics") {
        categoryId = 21;
    }


    try {

        // If editProductId exists → UPDATE
        // Otherwise → CREATE
        const url = editProductId
            ? `http://127.0.0.1:8000/api/products/${editProductId}/`
            : "http://127.0.0.1:8000/api/products/";

        const method = editProductId
            ? "PUT"
            : "POST";


        // Create FormData
        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("description", description);
        const vendorId = localStorage.getItem("marketHubVendorId");

if (!vendorId) {
    alert("Vendor information not found. Please log in again.");
    return;
}

formData.append("vendor", vendorId);
        formData.append("category", categoryId);


        // Add image only if user selected one
        if (imageFile) {

            formData.append("image", imageFile);

        }


        const response = await fetch(
            url,
            {
                method: method,
                body: formData
            }
        );


        console.log("EDIT PRODUCT ID:", editProductId);
        console.log("REQUEST URL:", url);
        console.log("REQUEST METHOD:", method);


        const result = await response.json();


        if (!response.ok) {

            alert(
                "Product could not be saved: " +
                JSON.stringify(result)
            );

            console.log(result);

            return;
        }


        if (editProductId) {

            alert(
                "Product updated successfully! 🎉"
            );

        } else {

            alert(
                "Product added successfully to Django! 🎉"
            );

        }


        // Clear form
        document.getElementById(
            "productForm"
        ).reset();

        document.getElementById(
            "editProductId"
        ).value = "";


        // Refresh products
        if (typeof loadVendorProducts === "function") {

            loadVendorProducts();

        }

    } catch (error) {

        console.log(error);

        alert(
            "Unable to connect to Django server."
        );

    }
}
// Delete Product
async function deleteProduct(button) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this product?"
        );

    if (!confirmation) {
        return;
    }

    const row =
        button.closest("tr");

    const productId =
        row.dataset.productId;


    if (!productId) {
        alert("Product ID not found.");
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${productId}/`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {

            const result = await response.text();

            console.log(result);

            alert("Product could not be deleted.");

            return;
        }

        alert("Product deleted successfully! 🗑️");

        // Reload products from Django
        loadVendorProducts();

    } catch (error) {

        console.log(error);

        alert(
            "Unable to connect to Django server."
        );
    }
}

// Edit Product
async function editProduct(button) {

    const row = button.closest("tr");
    const productId = row.dataset.productId;

    if (!productId) {
        alert("Product ID not found.");
        return;
    }

    try {

        // Get complete product details from Django
        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${productId}/`
        );

        if (!response.ok) {
            throw new Error("Product could not be loaded.");
        }

        const product = await response.json();

        // Store product ID for UPDATE
        document.getElementById("editProductId").value = product.id;

        // Load product details into form
        document.getElementById("productName").value =
            product.name || "";

        document.getElementById("productPrice").value =
            product.price || "";

        document.getElementById("productStock").value =
            product.stock || "";

        document.getElementById("productDescription").value =
            product.description || "";

        // Select category
        const categorySelect =
            document.getElementById("productCategory");

        if (categorySelect) {

            const categoryOption =
                [...categorySelect.options].find(
                    option =>
                        option.textContent.trim() ===
                        product.category_name
                );

            if (categoryOption) {
                categorySelect.value = categoryOption.value;
            }
        }

        // Scroll to Add Product form
        document.getElementById("addProduct").scrollIntoView({
            behavior: "smooth"
        });

        alert("Product details loaded. You can edit them now. ✏️");

    } catch (error) {

        console.error("Edit product error:", error);

        alert("Unable to load product details.");
    }
}


// Vendor Logout
function vendorLogout() {

    localStorage.removeItem(
        "marketHubLoggedIn"
    );

    localStorage.removeItem(
        "marketHubRole"
    );

    alert("Logged out successfully.");

    window.location.href =
        "login.html";
}

// Display the logged-in vendor's profile
document.addEventListener("DOMContentLoaded", async function () {
    const vendorName = document.getElementById("vendorName");
    const profileName = document.getElementById("profileVendorName");
    const profileEmail = document.getElementById("profileVendorEmail");

    try {
        const savedUser = JSON.parse(
            localStorage.getItem("marketHubLoggedInUser") || "null"
        );

        if (!savedUser || savedUser.role !== "vendor") {
            console.error("Logged-in vendor information was not found.");
            return;
        }

        const response = await fetch(
            "http://127.0.0.1:8000/api/vendors/list/"
        );

        if (!response.ok) {
            throw new Error("Could not load the vendor list.");
        }

        const data = await response.json();

        const vendor = data.vendors.find(
            item => item.email.toLowerCase() === savedUser.email.toLowerCase()
        );

        if (!vendor) {
            console.error(
                "Vendor not found in Django for email:",
                savedUser.email
            );

            if (vendorName) vendorName.textContent = savedUser.name;
            if (profileName) profileName.textContent = savedUser.name;
            if (profileEmail) profileEmail.textContent = savedUser.email;

            return;
        }

        localStorage.setItem("marketHubVendorId", String(vendor.id));

        if (vendorName) {
            vendorName.textContent = vendor.full_name;
        }

        if (profileName) {
            profileName.textContent = vendor.business_name;
        }

        if (profileEmail) {
            profileEmail.textContent = vendor.email;
        }

        console.log("Logged-in vendor loaded:", vendor);

    } catch (error) {
        console.error("Error loading vendor profile:", error);
    }
});
/* =================================
   ADMIN DASHBOARD
================================= */

function removeAdminRow(button) {

    const confirmation = confirm(
        "Are you sure you want to perform this action?"
    );

    if (!confirmation) {
        return;
    }

    const row = button.closest("tr");

    row.remove();

    alert("Action completed successfully.");
}


function adminLogout() {

    localStorage.removeItem(
        "marketHubLoggedIn"
    );

    localStorage.removeItem(
        "marketHubRole"
    );

    alert("Admin logged out successfully.");

    window.location.href = "login.html";
}

// ================= LOAD PRODUCTS FROM DJANGO API =================

fetch("http://127.0.0.1:8000/api/products/")
    .then(response => response.json())
    .then(products => {

        const productGrid =
            document.getElementById("productGrid") ||
            document.getElementById("product-grid");

        if (!productGrid) {
            return;
        }

        productGrid.innerHTML = "";

        products.forEach(product => {

            productGrid.innerHTML += `
                <div
                    class="product-card marketplace-product"
                    data-category="${(product.category_name || "").toLowerCase()}"
                    data-price="${product.price}"
                >

                    <!-- PRODUCT IMAGE -->
                    <div
                        class="product-image"
                        onclick="openProductDetails(${product.id})"
                        style="
                            height:180px;
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            overflow:hidden;
                            cursor:pointer;
                        "
                    >

                        <img
                            src="${product.image || ""}"
                            alt="${product.name || "Product"}"
                            style="
                                width:150px;
                                height:150px;
                                object-fit:contain;
                            "
                        >

                    </div>


                    <!-- PRODUCT INFORMATION -->
                    <div class="product-info">

                        <!-- PRODUCT NAME -->
                        <h3>
                            ${product.name || "Product"}
                        </h3>


                        <!-- VENDOR -->
                        <p class="vendor-name">
                            Vendor ID: ${product.vendor}
                        </p>


                        <!-- PRICE + STOCK -->
                        <div class="product-meta">

                            <div class="price">
                                <strong>
                                    ₹${Number(product.price).toLocaleString("en-IN")}
                                </strong>
                            </div>

                            <p class="stock">
                                Stock: ${product.stock}
                            </p>

                        </div>


                        <!-- ADD TO CART -->
                        <button
                            class="add-cart"
                           onclick="addProductToCart(
    ${product.id},
    '${String(product.name).replace(/'/g, "\\'")}',
    ${product.price},
    1,
    '${product.image || ""}'
)"
                        >
                            🛒 Add to Cart
                        </button>

                    </div>

                </div>
            `;

        });


        // Check products after loading
        if (document.getElementById("productSearch")) {
            filterProducts();
        }

    })
    .catch(error => {

        console.error(
            "Error loading products:",
            error
        );

    });
   async function placeOrder() {

    const name =
        document.getElementById("customerName").value;

    const email =
        document.getElementById("customerEmail").value;

    const phone =
        document.getElementById("customerPhone").value;

    const address =
        document.getElementById("deliveryAddress").value;

    if (!name || !email || !phone || !address) {

        alert("Please fill all the details.");

        return;
    }

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    const items = cart.map(function(item) {

        return {
            product_id: item.product_id,
            quantity: item.quantity
        };

    });

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/orders/create/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    address: address,
                    items: items
                })
            }
        );

        const result = await response.json();

        if (response.ok) {

            alert(
                "Order placed successfully! Order ID: " +
                result.order_id
            );

            localStorage.removeItem("cart");

        } else {

            alert("Order failed: " + result.error);

        }

    } catch (error) {

        alert("Unable to connect to the server.");

        console.log(error);

    }

}

// ================= VENDOR DASHBOARD =================

async function loadVendorProducts() {
    const vendorProducts = document.getElementById("vendorProducts");

    if (!vendorProducts) {
        return;
    }

    try {
        // Get the logged-in user
        const savedUser = JSON.parse(
            localStorage.getItem("marketHubLoggedInUser") || "null"
        );

        if (!savedUser || !savedUser.email) {
            console.error("Logged-in vendor information not found.");
            return;
        }

        // Get the correct vendor ID from Django
        const vendorResponse = await fetch(
            "http://127.0.0.1:8000/api/vendors/list/"
        );

        if (!vendorResponse.ok) {
            throw new Error("Could not load vendor information.");
        }

        const vendorData = await vendorResponse.json();

        const vendor = vendorData.vendors.find(
            item =>
                item.email.toLowerCase() ===
                savedUser.email.toLowerCase()
        );

        if (!vendor) {
            console.error(
                "Vendor not found:",
                savedUser.email
            );

            vendorProducts.innerHTML = `
                <tr>
                    <td colspan="5">
                        Vendor account not found.
                    </td>
                </tr>
            `;

            return;
        }

        // Save the real vendor ID
        localStorage.setItem(
            "marketHubVendorId",
            String(vendor.id)
        );

        console.log("Loading products for vendor:", vendor.id);

        // Fetch products belonging to this vendor
        const productResponse = await fetch(
            `http://127.0.0.1:8000/api/products/?vendor=${vendor.id}`
        );

        if (!productResponse.ok) {
            throw new Error("Could not load products.");
        }

        const responseData = await productResponse.json();

        // Support both a direct array and paginated API response
        const products = Array.isArray(responseData)
            ? responseData
            : responseData.results || [];

        // Clear the old sample products
        vendorProducts.innerHTML = "";

        if (products.length === 0) {
            vendorProducts.innerHTML = `
                <tr>
                    <td colspan="5">
                        No products found for your account.
                    </td>
                </tr>
            `;
        }

        // Display the vendor's actual products
        products.forEach(product => {
            const row = document.createElement("tr");

            row.dataset.productId = product.id;

            row.innerHTML = `
                <td>📦 ${product.name || "Unnamed Product"}</td>
                <td>${product.category || "N/A"}</td>
                <td>₹${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button
                        class="edit-btn"
                        onclick="editProduct(this)">
                        ✏️
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteProduct(this)">
                        🗑️
                    </button>
                </td>
            `;

            vendorProducts.appendChild(row);
        });

        // Update total product count
        const totalProducts =
            document.getElementById("totalProducts");

        if (totalProducts) {
            totalProducts.textContent = products.length;
        }

        console.log("Vendor products loaded:", products);

    } catch (error) {
        console.error("Error loading vendor products:", error);
    }
}


// Load products when the dashboard is ready
if (document.getElementById("vendorProducts")) {
    loadVendorProducts();
}

// ================= VENDOR ORDERS =================

function loadVendorOrders() {

    fetch("http://127.0.0.1:8000/api/orders/vendor-orders/")
        .then(response => response.json())
        .then(data => {

            const vendorOrders =
                document.getElementById("vendorOrders");

            if (!vendorOrders) {
                return;
            }

            vendorOrders.innerHTML = "";

            data.orders.forEach(order => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>#${order.order_id}</td>

                    <td>${order.customer}</td>

                    <td>${order.product}</td>

                    <td>₹${order.amount}</td>

                    <td>
                        <select
                            class="order-status"
                            data-order-id="${order.order_id}"
                            onchange="updateOrderStatus(this)"
                        >
                            <option value="PENDING"
                                ${order.status === "PENDING" ? "selected" : ""}>
                                PENDING
                            </option>

                            <option value="CONFIRMED"
                                ${order.status === "CONFIRMED" ? "selected" : ""}>
                                CONFIRMED
                            </option>

                            <option value="SHIPPED"
                                ${order.status === "SHIPPED" ? "selected" : ""}>
                                SHIPPED
                            </option>

                            <option value="DELIVERED"
                                ${order.status === "DELIVERED" ? "selected" : ""}>
                                DELIVERED
                            </option>

                            <option value="CANCELLED"
                                ${order.status === "CANCELLED" ? "selected" : ""}>
                                CANCELLED
                            </option>
                        </select>
                    </td>
                `;

                vendorOrders.appendChild(row);

            });

        })
        .catch(error => {

            console.error(
                "Error loading vendor orders:",
                error
            );

        });
}


// ================= UPDATE ORDER STATUS =================

function updateOrderStatus(selectElement) {

    const orderId =
        selectElement.getAttribute("data-order-id");

    const newStatus =
        selectElement.value;

    fetch(
        `http://127.0.0.1:8000/api/orders/update-status/${orderId}/`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: newStatus
            })
        }
    )
        .then(response => response.json())
        .then(data => {

            if (data.error) {

                alert(data.error);

                return;
            }

            alert(
                `Order #${orderId} status updated to ${newStatus}`
            );

            loadVendorOrders();

        })
        .catch(error => {

            console.error(
                "Error updating order status:",
                error
            );

            alert(
                "Failed to update order status."
            );

        });
}
// ================= LOAD ADMIN VENDORS =================

async function loadAdminVendors() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/vendors/list/"
        );

        const data = await response.json();

        console.log("VENDOR DATA:", data);

        const vendorTable =
            document.getElementById("adminVendors");

        if (!vendorTable) {
            return;
        }

        vendorTable.innerHTML = "";

        data.vendors.forEach(function(vendor) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${vendor.full_name}</td>

                <td>${vendor.business_name}</td>

                <td>${vendor.email}</td>

                <td>
                    <span class="status delivered">
                        Active
                    </span>
                </td>

                <td>
                    <button
                        class="edit-btn"
                        onclick="viewVendor(${vendor.id})">
                        👁️ View
                    </button>

                    <button
                        class="delete-btn"
                        onclick="blockVendor(${vendor.id}, this)">
                        🚫 Block
                    </button>
                </td>
            `;

            vendorTable.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Error loading vendors:",
            error
        );

    }
}
async function loadAdminProducts() {

    try {

        const productResponse = await fetch(
            "http://127.0.0.1:8000/api/products/"
        );

        const products = await productResponse.json();

        const vendorResponse = await fetch(
            "http://127.0.0.1:8000/api/vendors/list/"
        );

        const vendorData = await vendorResponse.json();

        const vendorMap = {};

        vendorData.vendors.forEach(function(vendor) {
            vendorMap[vendor.id] = vendor.business_name;
        });

        const productTable =
            document.getElementById("adminProducts");

        if (!productTable) {
            return;
        }

        productTable.innerHTML = "";

        products.forEach(function(product) {

            const vendorName =
                vendorMap[product.vendor] || "Unknown Vendor";

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>📦 ${product.name}</td>

                <td>${vendorName}</td>

                <td>${product.category_name || "N/A"}</td>

                <td>₹${product.price}</td>

                <td>${product.stock}</td>

                <td>
                    <button
                        class="edit-btn"
                        onclick="viewAdminProduct(${product.id})">
                        👁️ View
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteAdminProduct(${product.id}, this)">
                        🗑️ Delete
                    </button>
                </td>
            `;

            productTable.appendChild(row);
        });

    } catch (error) {

        console.error(
            "Error loading admin products:",
            error
        );

    }
}

async function deleteAdminProduct(productId, button) {

    const confirmation = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmation) {
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${productId}/`,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {

            button.closest("tr").remove();

            alert("Product deleted successfully.");

        } else {

            alert("Unable to delete product.");

        }

    } catch (error) {

        console.error(
            "Error deleting product:",
            error
        );

        alert("Something went wrong.");

    }
}
// ================= ADMIN ORDERS =================

function loadAdminOrders() {

    fetch("http://127.0.0.1:8000/api/orders/admin-orders/")
        .then(response => response.json())
        .then(data => {

            const adminOrders =
                document.getElementById("adminOrders");

            if (!adminOrders) {
                return;
            }

            adminOrders.innerHTML = "";

            data.orders.forEach(order => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>#${order.order_id}</td>
                    <td>${order.customer}</td>
                    <td>${order.vendor}</td>
                    <td>₹${order.amount}</td>
                    <td>
                        <span class="status ${order.status.toLowerCase()}">
                            ${order.status}
                        </span>
                    </td>
                    <td>
                        <button
                          class="edit-btn"
                          onclick="updateOrderStatus(${order.order_id})">
                          ✏️ Update
                        </button>
                    </td>
                `;

                adminOrders.appendChild(row);

            });

        })
        .catch(error => {

            console.error(
                "Error loading admin orders:",
                error
            );

        });
}

// ================= LOAD CUSTOMERS =================

async function loadCustomers() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/accounts/customers/"
        );

        const data = await response.json();

        console.log("CUSTOMER DATA:", data);

        const customerTableBody =
            document.getElementById("customerTableBody");

        if (!customerTableBody) {
            return;
        }

        customerTableBody.innerHTML = "";

        data.customers.forEach(function(customer) {

            const row = document.createElement("tr");

            row.innerHTML = `
              <td>${customer.name || customer.username}</td>

                <td>${customer.email}</td>

                <td>${customer.phone || "Not provided"}</td>

                <td>${customer.orders}</td>

            
                <td>
                    <span class="status delivered">
                        Active
                    </span>
                </td>

                <td>
                    <button
                        class="edit-btn"
                        onclick="viewCustomer(${customer.id})">
                        👁️ View
                    </button>

                    <button
                        class="delete-btn"
                        onclick="blockCustomer(${customer.id}, this)">
                        🚫 Block
                    </button>
                </td>
            `;

            customerTableBody.appendChild(row);

        });

    } catch (error) {

        console.error(
            "Error loading customers:",
            error
        );

    }
}

// ================= VIEW CUSTOMER =================

// ================= VIEW CUSTOMER =================

async function viewCustomer(customerId) {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/accounts/customers/"
        );

        const data = await response.json();

        const customer = data.customers.find(
            function(item) {
                return item.id === customerId;
            }
        );

        if (!customer) {

            alert("Customer not found.");

            return;
        }

        alert(
            "Customer Details\n\n" +
            "Name: " + (customer.name || customer.username) + "\n" +
            "Username: " + customer.username + "\n" +
            "Email: " + customer.email + "\n" +
            "Phone: " +
            (customer.phone || "Not provided") + "\n" +
            "Orders: " + customer.orders
        );

    } catch (error) {

        console.error(
            "Error loading customer:",
            error
        );

        alert("Unable to load customer details.");

    }
}
// ================= BLOCK CUSTOMER =================

function blockCustomer(customerId, button) {

    const confirmBlock = confirm(
        "Are you sure you want to block this customer?"
    );

    if (!confirmBlock) {
        return;
    }

    button.closest("tr").remove();

    alert("Customer blocked from the dashboard.");

}

// ================= UPDATE ORDER STATUS =================

async function updateOrderStatus(selectElement) {

    const orderId =
        selectElement.getAttribute("data-order-id");

    const newStatus =
        selectElement.value;

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/orders/update-status/${orderId}/`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: newStatus
                })
            }
        );

        const result =
            await response.json();

        if (!response.ok) {

            alert(
                "Update failed: " +
                result.error
            );

            return;
        }

        alert(
            "Order #" +
            orderId +
            " status updated to " +
            result.status
        );

        loadVendorOrders();

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to Django server."
        );
    }
}
document.addEventListener("DOMContentLoaded", function () {

    const editButton =
        document.getElementById("editProfileBtn");

    const editForm =
        document.getElementById("editProfileForm");

    if (editButton) {

        editButton.addEventListener("click", function () {

            editForm.style.display = "block";

            fetch("http://127.0.0.1:8000/api/vendors/profile/1/")
                .then(response => response.json())
                .then(vendor => {

                    document.getElementById("editFullName").value =
                        vendor.full_name;

                    document.getElementById("editEmail").value =
                        vendor.email;

                    document.getElementById("editPhone").value =
                        vendor.phone;

                    document.getElementById("editBusinessName").value =
                        vendor.business_name;

                    document.getElementById("editBusinessAddress").value =
                        vendor.business_address;

                });

        });

    }

});

// ================= SAVE VENDOR PROFILE =================

document.addEventListener("DOMContentLoaded", function () {

    const saveButton =
        document.getElementById("saveProfileBtn");

    if (saveButton) {

        saveButton.addEventListener("click", function () {

            const updatedData = {
                full_name:
                    document.getElementById("editFullName").value,

                email:
                    document.getElementById("editEmail").value,

                phone:
                    document.getElementById("editPhone").value,

                business_name:
                    document.getElementById("editBusinessName").value,

                business_address:
                    document.getElementById("editBusinessAddress").value
            };

            fetch(
                "http://127.0.0.1:8000/api/vendors/profile/1/",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updatedData)
                }
            )
            .then(response => response.json())
            .then(result => {

                alert(result.message);

                location.reload();

            })
            .catch(error => {

                console.error(error);

                alert("Unable to update vendor profile.");

            });

        });

    }

});

// ================= ADMIN STATISTICS =================

async function loadAdminStats() {

    try {

        // Customers
        const customerResponse = await fetch(
            "http://127.0.0.1:8000/api/accounts/customers/"
        );

        const customerData = await customerResponse.json();

        const customerCount =
            document.getElementById("adminCustomerCount");

        if (customerCount) {
            customerCount.textContent =
                customerData.customers.length;
        }


        // Products
        const productResponse = await fetch(
            "http://127.0.0.1:8000/api/products/"
        );

        const productData = await productResponse.json();

        const productCount =
            document.getElementById("adminProductCount");

        if (productCount) {
            productCount.textContent =
                productData.length;
        }


        // Orders
        const orderResponse = await fetch(
            "http://127.0.0.1:8000/api/orders/admin-orders/"
        );

        const orderData = await orderResponse.json();

        const orderCount =
            document.getElementById("adminOrderCount");

        if (orderCount) {
            orderCount.textContent =
                orderData.orders.length;
        }


       // Vendors
        const vendorResponse = await fetch(
            "http://127.0.0.1:8000/api/vendors/list/"
        );

        const vendorData = await vendorResponse.json();

        const vendorCount =
            document.getElementById("adminVendorCount");

        if (vendorCount) {
            vendorCount.textContent =
                vendorData.vendors.length;
        }

    } catch (error) {

        console.error(
            "Error loading admin statistics:",
            error
        );

    }
}

// ================= VIEW VENDOR =================

async function viewVendor(vendorId) {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/vendors/list/"
        );

        const data = await response.json();

        const vendor = data.vendors.find(
            function(item) {
                return item.id === vendorId;
            }
        );

        if (!vendor) {

            alert("Vendor not found.");

            return;
        }

        alert(
            "Vendor Details\n\n" +
            "Name: " + vendor.full_name + "\n" +
            "Business: " + vendor.business_name + "\n" +
            "Email: " + vendor.email
        );

    } catch (error) {

        console.error(
            "Error loading vendor details:",
            error
        );

        alert("Unable to load vendor details.");

    }
}
// ================= BLOCK VENDOR =================

function blockVendor(vendorId, button) {

    const confirmation = confirm(
        "Are you sure you want to block this vendor?"
    );

    if (!confirmation) {
        return;
    }

    button.closest("tr").remove();

    alert("Vendor blocked from the dashboard.");
}

async function updateVendor1() {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/vendors/profile/1/",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    business_name: "Tech World"
                })
            }
        );

        const data = await response.json();

        console.log("VENDOR UPDATE:", data);

        alert(data.message || "Vendor updated");

    } catch (error) {

        console.error(
            "Vendor update error:",
            error
        );

    }
}

// ================= ADMIN PRODUCT ACTIONS =================

async function viewAdminProduct(productId) {

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${productId}/`
        );

        const product = await response.json();

        alert(
            "Product Details\n\n" +
            "Name: " + product.name + "\n" +
            "Price: ₹" + product.price + "\n" +
            "Stock: " + product.stock + "\n" +
            "Description: " + product.description
        );

    } catch (error) {

        console.error(
            "Error viewing product:",
            error
        );

        alert("Unable to load product details.");
    }
}


async function deleteAdminProduct(productId, button) {

    const confirmDelete =
        confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${productId}/`,
            {
                method: "DELETE"
            }
        );

        if (response.ok) {

            alert("Product deleted successfully.");

            button.closest("tr").remove();

        } else {

            alert("Unable to delete product.");

        }

    } catch (error) {

        console.error(
            "Error deleting product:",
            error
        );

        alert("Something went wrong.");
    }
}

// ================= PRODUCT DETAILS =================

let currentProduct = null;

async function loadProductDetails() {

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        console.log("No product ID found.");
        return;
    }

    try {

        // Load selected product
        const response = await fetch(
            `http://127.0.0.1:8000/api/products/${productId}/`
        );

        if (!response.ok) {
            throw new Error("Product not found");
        }

        const product = await response.json();

        currentProduct = product;

        // Product image
        const image =
            document.getElementById("detailsProductImage");

        if (image) {
            image.src = product.image || "";
            image.alt = product.name || "Product";
        }

        // Product name
        const productName =
            document.querySelector(".details-info h1");

        if (productName) {
            productName.textContent =
                product.name || "Product";
        }

        // Product description
        const description =
            document.querySelector(".description p");

        if (description) {
            description.textContent =
                product.description ||
                "No product description available.";
        }

        // Product price
        const price =
            document.querySelector(".details-price strong");

        if (price) {
            price.textContent =
                `₹${product.price}`;
        }

        // Load related products
        loadRelatedProducts(productId);

    } catch (error) {

        console.error(
            "Error loading product details:",
            error
        );

    }
}


// ================= RELATED PRODUCTS =================

async function loadRelatedProducts(currentProductId) {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/products/"
        );

        const products = await response.json();

        const productList =
            Array.isArray(products)
                ? products
                : products.results || [];

        const relatedProducts =
            productList.filter(
                product =>
                    String(product.id) !==
                    String(currentProductId)
            );

        const relatedSection =
            document.querySelector(".related-section .product-grid");

        if (!relatedSection) {
            return;
        }

        relatedSection.innerHTML = "";

        relatedProducts.forEach(product => {

            const card =
                document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `

                <div
                    class="product-image"
                    onclick="openProductDetails(${product.id})"
                    style="cursor: pointer;"
                >
                    <img
                        src="${product.image || ""}"
                        alt="${product.name}"
                        style="width:100%; height:100%; object-fit:cover;"
                    >
                </div>

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="price">

                        <strong>
                            ₹${product.price}
                        </strong>

                    </div>

                    <button
                        class="add-cart"
                        onclick="addToCart('${product.name}', ${product.price})">

                        🛒 Add to Cart

                    </button>

                </div>
            `;

            relatedSection.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Error loading related products:",
            error
        );

    }
}


// ================= OPEN PRODUCT DETAILS =================

function openProductDetails(productId) {

    window.location.href =
        `product-details.html?id=${productId}`;
}


loadProductDetails();
// ================= AI PRODUCT DESCRIPTION =================

async function generateProductDescription() {

    const productName =
        document.getElementById("productName").value;

    const category =
        document.getElementById("productCategory").value;

    const descriptionBox =
        document.getElementById("productDescription");

    if (!productName || !category) {
        alert("Please enter Product Name and select Category first.");
        return;
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/generate-description/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    product_name: productName,
                    category: category
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            descriptionBox.value =
                data.description;

        } else {

            alert("Failed to generate description.");

        }

    } catch (error) {

        console.error("AI Description Error:", error);

        alert(
            "Unable to connect to AI description service."
        );
    }
}