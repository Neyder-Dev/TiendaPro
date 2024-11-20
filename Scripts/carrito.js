const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto, precio, id, stock) {
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
        producto,
        precio,
        cantidad: 1,
        subtotal: precio,
        stock,
      });
    }
  
    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto} ha sido agregado al carrito.`);
  }
  
  // Función para mostrar los productos del carrito en la tabla
  function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoTableBody = document.getElementById('carritoTableBody');
    const totalCarrito = document.getElementById('totalCarrito');
    carritoTableBody.innerHTML = ''; // Limpiar la tabla
  
    let total = 0;
  
    carrito.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.nombre}</td>
        <td>$${item.precio.toFixed(2)}</td>
        <td>
          <button class="btn-decrease" data-id="${item.id}">-</button>
          ${item.cantidad}
          <button class="btn-increase" data-id="${item.id}">+</button>
        </td>
        <td>$${item.subtotal.toFixed(2)}</td>
        <td>
          <button class="btn-remove" data-id="${item.id}">Eliminar</button>
        </td>
      `;
      carritoTableBody.appendChild(row);
      total += item.subtotal;
    });
  
    totalCarrito.textContent = total.toFixed(2);
  
    // Añadir eventos para aumentar, disminuir o eliminar productos
    document.querySelectorAll('.btn-increase').forEach(button => {
      button.addEventListener('click', event => {
        actualizarCantidad(event.target.dataset.id, 1);
      });
    });
  
    document.querySelectorAll('.btn-decrease').forEach(button => {
      button.addEventListener('click', event => {
        actualizarCantidad(event.target.dataset.id, -1);
      });
    });
  
    document.querySelectorAll('.btn-remove').forEach(button => {
      button.addEventListener('click', event => {
        eliminarProducto(event.target.dataset.id);
      });
    });
  }
  
  // Función para actualizar la cantidad de productos
  function actualizarCantidad(id, cambio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const producto = carrito.find(item => item.id === id);
  
    if (producto) {
      producto.cantidad += cambio;
  
      if (producto.cantidad <= 0) {
        // Eliminar producto si la cantidad es 0 o menor
        const index = carrito.indexOf(producto);
        carrito.splice(index, 1);
      } else {
        producto.subtotal = producto.cantidad * producto.precio;
      }
  
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
    }
  }
  
  // Función para eliminar un producto del carrito
  function eliminarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carrito.filter(item => item.id !== id);
  
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    mostrarCarrito();
  }

  function finalizarCompra() {
    // Obtener el carrito del localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    if (carrito.length === 0) {
        alert('El carrito está vacío. Añade productos antes de finalizar la compra.');
        return;
    }
  
    // Actualizar el stock de los productos
    carrito.forEach(item => {
        // Restar la cantidad comprada del stock
        if (item.stock >= item.cantidad) {
            item.stock -= item.cantidad;
        } else {
            alert(`No hay suficiente stock para el producto ${item.producto}.`);
        }
    });
  
    // Limpiar el carrito
    localStorage.removeItem('carrito');
  
    // Actualizar la base de datos o el localStorage (si es necesario) con los nuevos stocks
    // Por ejemplo, aquí podrías guardar el nuevo stock en el localStorage si lo necesitas:
    localStorage.setItem('productos', JSON.stringify(carrito)); // Asumiendo que tienes una lista de productos.
  
    // Mostrar mensaje de éxito
    alert('¡Compra finalizada con éxito!');
  
    // Limpiar la interfaz
    mostrarCarrito(); // Esto debería limpiar la tabla del carrito en la interfaz.
}

document.getElementById('finalizarCompraBtn').addEventListener('click', finalizarCompra);

  // Mostrar carrito al cargar la página
  document.addEventListener('DOMContentLoaded', () => {
    mostrarCarrito();
  });
  