/* ==========================================
   Tata Papel - script.js
   Carrinho, WhatsApp e ações da loja
==========================================*/

/* ==== WhatsApp ==== */
const whatsappNumber = "5513971055579";

function openWhatsApp() {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
}

/* -----------------------------------------
   🌸 CARRINHO — SISTEMA OFICIAL
------------------------------------------ */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Atualiza bolinha do carrinho
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const bubble = document.querySelector(".cart-count");
    if (bubble) bubble.textContent = count;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

// Adicionar item ao carrinho
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Produto adicionado ao carrinho 💕");
}

/* -----------------------------------------
   🌸 EXIBIR ITENS NO CARRINHO (carrinho.html)
------------------------------------------ */

function loadCartPage() {
    const container = document.getElementById("cartItemsContainer");
    const subtotalEl = document.getElementById("subtotal");

    if (!container) return; // evita erro no index

    let subtotal = 0;
    container.innerHTML = "";

    cart.forEach((item, index) => {
        const totalItem = item.price * item.quantity;
        subtotal += totalItem;

        container.innerHTML += `
            <div class="cart-item">
                <p><strong>${item.name}</strong></p>
                <p>Qtd: ${item.quantity}</p>
                <p>R$ ${totalItem.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeItem(${index})">Remover</button>
            </div>
        `;
    });

    subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", loadCartPage);

// Remover item do carrinho
function removeItem(i) {
    cart.splice(i, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartPage();
    updateCartCount();
}

/* -----------------------------------------
   🌸 BUSCA DE PRODUTOS
------------------------------------------ */

function handleSearch(event) {
    event.preventDefault();
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const products = document.querySelectorAll('.product');

    if (!q) {
        products.forEach(p => p.style.display = '');
        return;
    }

    products.forEach(p => {
        const name = (p.dataset.name || p.textContent).toLowerCase();
        p.style.display = name.includes(q) ? '' : 'none';
    });

    const firstVisible = document.querySelector('.product:not([style*="display: none"])');
    if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth' });
}

/* -----------------------------------------
   🌸 LOGIN
------------------------------------------ */

function irParaLogin() {
    window.location.href = "cliente/login.html";
}

/* -----------------------------------------
   🌸 NEWSLETTER (placeholder)
------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Obrigado! Em breve você receberá novidades no seu e-mail.');
            form.reset();
        });
    }
});
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

/* -------- Abrir / fechar carrinho -------- */
function toggleCart(){
  document.getElementById("cartSidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
  renderCarrinho();
}

/* -------- Adicionar produto -------- */
function addToCart(id, nome, preco, imagem){
  const item = carrinho.find(p => p.id === id);

  if(item){
    item.qtd++;
  } else {
    carrinho.push({
      id,
      nome,
      preco,
      imagem,
      qtd: 1
    });
  }

  salvar();
  toggleCart();
}

/* -------- Atualizar HTML -------- */
function renderCarrinho(){
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;

  carrinho.forEach(item => {
    total += item.preco * item.qtd;

    cartItems.innerHTML += `
    <div class="cart-item">
      <img src="${item.imagem}">
      <div class="item-info">
        <strong>${item.nome}</strong>
        <p>R$ ${item.preco.toFixed(2)}</p>

        <div class="quantity-control">
          <button onclick="mudarQtd('${item.id}', -1)">−</button>
          <span>${item.qtd}</span>
          <button onclick="mudarQtd('${item.id}', 1)">+</button>
        </div>
      </div>

      <span class="remove-btn" onclick="remover('${item.id}')">🗑</span>
    </div>`;
  });

  document.getElementById("cartTotal").innerText = 
    "R$ " + total.toFixed(2);
}

/* -------- Aumentar / diminuir -------- */
function mudarQtd(id, valor){
  const item = carrinho.find(p => p.id === id);
  item.qtd += valor;

  if(item.qtd <= 0) remover(id);

  salvar();
  renderCarrinho();
}

/* -------- Remover -------- */
function remover(id){
  carrinho = carrinho.filter(p => p.id !== id);
  salvar();
  renderCarrinho();
}

/* -------- Salvar no localStorage -------- */
function salvar(){
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/* -------- Finalizar Compra -------- */
function finalizarCompra(){
  // Aqui entra o link do mercado pago 🔽
  window.location.href = "https://link-do-mercado-pago";
}
