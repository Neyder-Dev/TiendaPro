async function loadTopSellingProducts() {
    try {
        const response = await fetch('http://127.0.0.1:5000/TiendaPro/Pages/top-selling-products');
        if (!response.ok) throw new Error('Error al obtener los productos más vendidos');
  
        const products = await response.json();
        const productContainer = document.getElementById('productosGrid');
        productContainer.innerHTML = '';
  
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('card');
            productCard.setAttribute('data-categoria', product.id_categoria);
            productCard.setAttribute('data-venta', product.ventas_producto);
            productCard.innerHTML = `
                <img src="${product.imagen_producto}" alt="${product.nombre_producto}" />
                <h3>${product.nombre_producto}</h3>
                <p>${product.descripcion_producto}</p>
                <p>Categoría: ${product.nombre_categoria}</p>
                <p>Precio: $${product.precio_producto}</p>
                <p>Ventas: ${product.ventas_producto}</p>
            `;
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error al cargar los productos más vendidos:', error);
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/TiendaPro/Pages/services');
        if (!response.ok) throw new Error('Error al obtener los servicios');
  
        const services = await response.json();
        const servicesContainer = document.getElementById('serviciosGrid');
        servicesContainer.innerHTML = '';
  
        services.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.classList.add('card');
            serviceCard.setAttribute('data-categoria', service.id_categoria);
            serviceCard.setAttribute('data-venta', service.ventas_producto);
            serviceCard.innerHTML = `
                <img src="${service.imagen_producto}" alt="${service.nombre_producto}" />
                <h3>${service.nombre_producto}</h3>
                <p>${service.descripcion_producto}</p>
                <p>Categoría: ${service.nombre_categoria}</p>
                <p>Precio: $${service.precio_producto}</p>
                <p>Ventas: ${service.ventas_producto}</p>
            `;
            servicesContainer.appendChild(serviceCard);
        });
    } catch (error) {
        console.error('Error al cargar los servicios', error);
    }
  }
  
  window.onload = loadTopSellingProducts;