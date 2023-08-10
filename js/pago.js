document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("orderSummary");
  const proceedButton = document.getElementById("proceedButton");

  // resumen de la compra
  function showOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) {
      let summaryHTML = "<h2>Resumen de Compra:</h2>";
      let total = 0;

      for (const productId in cartItems) {
        const product = cartItems[productId];
        const productTotal = product.price * product.quantity;
        total += productTotal;

        summaryHTML += `
          <div class="product-summary">
            <p>${product.name} - Cantidad: ${product.quantity} - Total: $${productTotal.toFixed(2)}</p>
          </div>
        `;
      }

      summaryHTML += `<p class="total-amount">Total de la compra: $${total.toFixed(2)}</p>`;
      orderSummary.innerHTML = summaryHTML;
    }
  }

  showOrderSummary();

  function proceedToPurchase() {
    Swal.fire({
      icon: 'success',
      title: '¡Compra realizada!',
      showConfirmButton: false,
      timer: 1500  //  mensaje  1.5 segundos
    }).then(() => {
      // Reiniciar el carrito
      localStorage.removeItem("cartItems");

      // Actualizar  para mostrar el carrito vacio y el total
      showOrderSummary();

      // Redirigir a la página principal 
      window.location.href = "../index.html?cachebuster=" + Date.now();
    });
  }

  
  proceedButton.addEventListener("click", proceedToPurchase);
});