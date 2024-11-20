// Variables globales
const loginIcon = document.getElementById("login-icon");
const logoutIcon = document.getElementById("logout-icon");
const productsGrid = document.getElementById("productosGrid");
const loginUrl = "http://127.0.0.1:5000/TiendaPro/Pages/login";
const productsUrl = "http://127.0.0.1:5000/TiendaPro/Pages/products";

// Función para iniciar sesión
// Manejo del evento de inicio de sesión
document.getElementById("btnlogin").addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!validateEmail(email)) {
        alert("Por favor, ingresa un correo válido.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    loginCustomer(email, password)
        .then(response => {
            if (response.message === "Inicio de sesión exitoso") {
                localStorage.setItem("isLoggedIn", "true");
                alert("Inicio de sesión exitoso.");
                window.location.href = "/TiendaPro/index.html";
            } else {
                alert("Credenciales incorrectas. Intenta nuevamente.");
            }
        })
        .catch(() => {
            alert("Error al iniciar sesión. Por favor, intenta más tarde.");
        });
});

async function loginCustomer(email, password) {
    const datos = { email, password };

    const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
    });

    if (!response.ok) throw new Error("Error en la solicitud");
    return await response.json();
}


// Validación de correos electrónicos
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para cargar los productos
async function loadProducts() {
    try {
        const response = await fetch(productsUrl);
        if (!response.ok) throw new Error("Error al obtener los productos");

        const products = await response.json();
        productsGrid.innerHTML = "";

        if (products.length === 0) {
            productsGrid.innerHTML = "<p>No hay productos disponibles.</p>";
            return;
        }

        products.forEach(product => {
            const isOutOfStock = product.stock_producto <= 0;
            const buttonText = isOutOfStock ? "Sin Stock" : "Agregar al Carrito";
            const buttonClass = isOutOfStock ? "btn-disabled" : "btn-add-cart";

            const productCard = document.createElement("div");
            productCard.classList.add("card");
            productCard.innerHTML = `
                <img src="${product.imagen_producto}" alt="${product.nombre_producto}" />
                <h3>${product.nombre_producto}</h3>
                <p>${product.descripcion_producto}</p>
                <p>Precio: $${product.precio_producto}</p>
                <button 
                    class="${buttonClass}" 
                    data-id="${product.id_producto}" 
                    data-stock="${product.stock_producto}"
                    ${isOutOfStock ? "disabled" : ""}>
                    ${buttonText}
                </button>`
            ;
            productsGrid.appendChild(productCard);
        });

        // Agregar eventos a los botones de agregar al carrito
        attachAddToCartEvents();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        productsGrid.innerHTML = "<p>Ocurrió un error al cargar los productos. Intenta nuevamente más tarde.</p>";
    }
}

// Función para agregar eventos a los botones de agregar al carrito
function attachAddToCartEvents() {
    const buttons = document.querySelectorAll(".btn-add-cart");
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productId = this.getAttribute("data-id");
            const stock = parseInt(this.getAttribute("data-stock"), 10);
            addToCart(productId, stock);
        });
    });
}

// Función para agregar un producto al carrito
function addToCart(productId, stock) {
    if (stock <= 0) {
        alert("Este producto no tiene stock disponible.");
        return;
    }
    // Obtener el carrito de localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity += 1; // Incrementar la cantidad
    } else {
        cart.push({ id: productId, quantity: 1 }); // Agregar nuevo producto
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Producto agregado al carrito.");
}

// Función para redirigir al login
function redirectToLogin() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/TiendaPro/login.html";
}

// Función para redirigir al home
function redirectToHome() {
    const currentPath = window.location.pathname;

    if (localStorage.getItem("isLoggedIn") === "true") {
        if (currentPath !== "/TiendaPro/index.html") {
            window.location.href = "/TiendaPro/index.html";
        }
    } else {
        if (currentPath === "/TiendaPro/index.html") {
            window.location.href = "/TiendaPro/login.html";
        }
    }
}

