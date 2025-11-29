// Carrega o carrinho do localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ---------------------- CARREGAR CARRINHO ----------------------
function loadCart() {
  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("subtotal");

  if (!container || !subtotalEl) return;

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const totalItem = item.price * item.quantity;
    subtotal += totalItem;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="info">
        <h3>${item.name}</h3>
        <p>Quantidade: ${item.quantity}</p>
        <p>Preço total: R$ ${totalItem.toFixed(2)}</p>
      </div>

      <button class="remove-btn" onclick="removeItem(${index})">
        Remover
      </button>
    `;

    container.appendChild(div);
  });

  // Atualiza subtotal
  subtotalEl.textContent = "R$ " + subtotal.toFixed(2);
}

// ---------------------- REMOVER ITEM ----------------------
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ---------------------- FINALIZAR COMPRA (WHATSAPP) ----------------------
const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Sua sacola está vazia!");
      return;
    }

    const message = cart
      .map(
        item =>
          `${item.quantity}x ${item.name} — R$ ${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const url = `https://wa.me/5531971055579?text=${encodeURIComponent(
      "Olá! Quero finalizar a compra desses itens:\n\n" + message
    )}`;

    window.open(url, "_blank");
  });
}

// Carrega carrinho ao abrir página
loadCart();
