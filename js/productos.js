 // Variables globales
 let cartItems = {}; // Objeto para almacenar los productos agregados al carrito
 let isCartExpanded = false; // Variable para mantener el estado del carrito (contraído o expandido)

 // Al cargar la página
 window.addEventListener("load", () => {
   const savedCartItems = localStorage.getItem("cartItems");
   if (savedCartItems) {
     cartItems = JSON.parse(savedCartItems);
   }

   updateCartItemCount();
   updateCartDropdown();
 });

 function toggleCart() {
   const cartDropdown = document.getElementById("cartDropdown");
   isCartExpanded = !isCartExpanded;
   cartDropdown.style.display = isCartExpanded ? "block" : "none";
 }

 function removeProductFromCart(productId) {
   if (cartItems[productId]) {
     cartItems[productId].quantity--;

     if (cartItems[productId].quantity === 0) {
       delete cartItems[productId];
     }

     updateCartItemCount();
     updateCartDropdown();
     saveCartToLocalStorage();
   }
 }

 function addToCart(productId) {
   const productInfo = getProductInfo(productId);

   if (cartItems[productId]) {
     cartItems[productId].quantity++;
   } else {
     cartItems[productId] = {
       name: productInfo.name,
       price: productInfo.price,
       quantity: 1,
     };
   }

   updateCartItemCount();
   updateCartDropdown();
   saveCartToLocalStorage();
 }

 function saveCartToLocalStorage() {
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
 }

 function updateCartItemCount() {
   const itemCountSpan = document.getElementById("cartItemCount");
   let totalCount = 0;

   for (const productId in cartItems) {
     totalCount += cartItems[productId].quantity;
   }

   itemCountSpan.innerText = totalCount;
 }

 function updateCartDropdown() {
   const cartDropdown = document.getElementById("cartDropdown");
   const cartItemsList = document.getElementById("cartItems");
   cartItemsList.innerHTML = "";

   let totalAmount = 0;

   for (const productId in cartItems) {
     const product = cartItems[productId];

     const cartItemElem = document.createElement("li");
     cartItemElem.classList.add("cart-item");

     const itemName = document.createElement("span");
     itemName.classList.add("item-name");
     itemName.innerText = `${product.name} (${product.quantity})`;

     const itemPrice = document.createElement("span");
     itemPrice.classList.add("item-price");
     itemPrice.innerText = `$${(product.price * product.quantity).toFixed(2)}`;

     const removeButton = document.createElement("button");
     removeButton.innerText = "X";
     removeButton.classList.add("remove-button");
     removeButton.addEventListener("click", () => removeProductFromCart(productId));

     cartItemElem.appendChild(itemName);
     cartItemElem.appendChild(itemPrice);
     cartItemElem.appendChild(removeButton);

     cartItemsList.appendChild(cartItemElem);

     totalAmount += product.price * product.quantity;
   }

   const totalElem = document.createElement("li");
   totalElem.classList.add("cart-item");
   totalElem.classList.add("total");
   totalElem.innerText = `Total a pagar: $${totalAmount.toFixed(2)}`;

   cartItemsList.appendChild(totalElem);

   if (Object.keys(cartItems).length > 0) {
     cartDropdown.style.display = "block";
   } else {
     cartDropdown.style.display = "none";
   }
 }

 function getProductInfo(productId) {
   const products = {
     1: { name: "Arroz Oro", price: 20 },
     2: { name: "Coca Cola 2.25 L", price: 15 },
     3: { name: "Fideos Molto", price: 18 },
     4: { name: "Galletas Melba", price: 10 },
     5: { name: "Galletas Oreo", price: 14 },
     6: { name: "Salsa de tomate Salsati", price: 22 },
   };

   return products[productId] || { name: "Producto no encontrado", price: 0 };
 }