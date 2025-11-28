/* ==========================================
   Tata Papel - script.js
   Carrinho, WhatsApp e ações da loja
==========================================*/

/* ==== WhatsApp ==== */
const whatsappNumber = "5513971055579"; 

function openWhatsApp() {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
}



/* -------------------------------
   🌸 CARRINHO TATA PAPEL
-------------------------------- */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector(".cart-count").textContent = count;
}

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

document.addEventListener("DOMContentLoaded", updateCartCount);


// Quando carregar a página → atualizar bolinha do carrinho
document.addEventListener("DOMContentLoaded", updateCartCount);



// script.js - busca simples, acessível e sem quebrar
function handleSearch(event) {
  event.preventDefault();
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const products = document.querySelectorAll('.product');

  if (!q) {
    // mostra todos
    products.forEach(p => p.style.display = '');
    return;
  }

  products.forEach(p => {
    const name = (p.dataset.name || p.textContent).toLowerCase();
    if (name.includes(q)) {
      p.style.display = '';
    } else {
      p.style.display = 'none';
    }
  });
  // opcional: rolar até produtos
  const firstVisible = document.querySelector('.product[style="display:"]') || document.querySelector('.product:not([style*="display: none"])');
  if (firstVisible) firstVisible.scrollIntoView({behavior: 'smooth', block: 'start'});
}

// Função de exemplo usada no botão Entrar
function irParaLogin() {
  // redireciona para a página de login (ajuste se necessário)
  window.location.href = '/cliente/login.html';
}

// Handler de newsletter (exemplo: AJAX minimal)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value;
      // Aqui você integraria com seu backend / serviço de e-mail
      alert('Obrigado! Em breve você receberá novidades no seu e-mail.');
      form.reset();
    });
  }
});
