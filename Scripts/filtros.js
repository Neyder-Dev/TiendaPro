let products = []; // Aquí almacenaremos los productos cargados

// Función para cargar las categorías desde la API
async function loadCategories() {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/categories'); // Endpoint de categorías
    if (!response.ok) {
      throw new Error('Error al obtener las categorías');
    }

    const categories = await response.json();
    console.log('Categorías cargadas:', categories); // Debugging
    const categoriaSelect = document.getElementById('categoria');

    // Limpiar las opciones existentes
    categoriaSelect.innerHTML = '<option value="todos">Todos</option>';

    // Agregar las categorías obtenidas
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id_categoria;
      option.textContent = category.nombre_categoria;
      categoriaSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar las categorías:', error);
  }
}

// Función para cargar los productos desde la API
async function loadProducts() {
  try {
    const response = await fetch('http://127.0.0.1:5000/TiendaPro/Pages/products'); // Endpoint de productos
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }

    products = await response.json();
    console.log('Productos cargados:', products); // Debugging
    renderProducts(products); // Mostrar productos después de cargarlos
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}

// Función para mostrar productos
function renderProducts(filteredProducts) {
  const productContainer = document.getElementById('productosGrid');
  productContainer.innerHTML = ''; // Limpiar productos existentes

  filteredProducts.forEach(product => {
    const isOutOfStock = product.stock_producto <= 0;
    const buttonText = isOutOfStock ? "Sin Stock" : "Agregar al Carrito";
    const buttonClass = isOutOfStock ? "btn-disabled" : "btn-add-cart";

    const productCard = document.createElement('div');
    productCard.classList.add('card');
    productCard.setAttribute('data-categoria', product.id_categoria);
    productCard.setAttribute('data-venta', product.ventas_producto);
    productCard.setAttribute('data-nombre', product.nombre_producto);
    productCard.innerHTML = `
      <img src="${product.imagen_producto}" alt="${product.nombre_producto}" />
      <h3>${product.nombre_producto}</h3>
      <p>${product.descripcion_producto}</p>
      <p>Categoría: ${product.categoria}</p>
      <p>Precio: $${product.precio_producto}</p>
      <p>Ventas: ${product.ventas_producto}</p>
      <button 
        class="btn ${buttonClass}" 
        data-id="${product.id_producto}" 
        data-stock="${product.stock_producto}"
        data-nombre="${product.nombre_producto}"
        data-precio="${product.precio_producto}"
        ${isOutOfStock ? "disabled" : ""}>
        ${buttonText}
      </button>
    `;
    productContainer.appendChild(productCard);
  });

  // Agregar event listeners para los botones "Agregar al Carrito"
  const addCartButtons = document.querySelectorAll('.btn-add-cart');
  addCartButtons.forEach(button => {
    button.addEventListener('click', event => {
      const button = event.target;
      const id = button.getAttribute('data-id');
      const nombre = button.getAttribute('data-nombre');
      const precio = parseFloat(button.getAttribute('data-precio'));
      const stock = parseInt(button.getAttribute('data-stock'), 10);

      agregarAlCarrito(nombre, precio, id, stock);
    });
  });
}

function agregarAlCarrito(nombre, precio, id, stock) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Buscar si el producto ya está en el carrito
  const existe = carrito.find(item => item.id === id);

  if (existe) {
    if (existe.cantidad < stock) {
      existe.cantidad += 1;
      existe.subtotal = existe.cantidad * existe.precio;
    } else {
      alert('No hay más stock disponible para este producto.');
    }
  } else {
    carrito.push({
      id,
      nombre,
      precio,
      cantidad: 1,
      subtotal: precio,
      stock,
    });
  }

  // Guardar en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${nombre} ha sido agregado al carrito.`);
}

// Función para filtrar productos según categoría y orden
function filtrarProductos() {
  const categoria = document.getElementById('categoria').value;
  const orden = document.getElementById('orden').value;

  let filteredProducts = products;

  // Filtrar productos por categoría
  if (categoria !== 'todos') {
    filteredProducts = filteredProducts.filter(product => 
      product.id_categoria === parseInt(categoria)
    );
  }

  // Ordenar productos por ventas
  filteredProducts = filteredProducts.slice(); // Crear copia para no modificar `products`
  if (orden === 'mayor') {
    filteredProducts.sort((a, b) => b.ventas_producto - a.ventas_producto);
  } else if (orden === 'menor') {
    filteredProducts.sort((a, b) => a.ventas_producto - b.ventas_producto);
  }

  renderProducts(filteredProducts); // Mostrar los productos filtrados
}

// Llamar a las funciones cuando la página esté cargada
window.onload = async () => {
  await loadCategories(); // Cargar las categorías primero
  await loadProducts();   // Luego cargar los productos
};
