// Récupération du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Étape 1 → Étape 2
document.getElementById("to-step2").addEventListener("click", () => {

  const fields = ["fullname", "email", "phone", "address", "city", "zipcode", "country"];
  for (let f of fields) {
    if (document.getElementById(f).value.trim() === "") {
      alert("Merci de remplir tous les champs.");
      return;
    }
  }

  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

  document.getElementById("circle1").classList.remove("active");
  document.getElementById("circle2").classList.add("active");

  renderSummary();
});

// Étape 2 → Étape 3
document.getElementById("to-step3").addEventListener("click", () => {
  if (!document.getElementById("rgpd").checked) {
    alert("Merci d'accepter les conditions.");
    return;
  }

  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "block";

  document.getElementById("circle2").classList.remove("active");
  document.getElementById("circle3").classList.add("active");
});

// Récapitulatif
function renderSummary() {
  const summary = document.getElementById("order-summary");
  const total = document.getElementById("order-total");

  summary.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    sum += Number(item.price);
    summary.innerHTML += `
      <div class="summary-item">
        <span>${item.name}</span>
        <span>${item.price}€</span>
      </div>
    `;
  });

  total.textContent = sum;
}
// Stripe
const stripe = Stripe("TA_CLE_PUBLIQUE_STRIPE_ICI");

document.getElementById("pay-stripe").addEventListener("click", async () => {

  // Calcul du total
  let total = 0;
  cart.forEach(item => total += Number(item.price));

  // Appel à Stripe Checkout
  const response = await fetch("https://stripe-checkout-poutchou.vercel.app/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: total * 100, // en centimes
      items: cart
    })
  });

  const session = await response.json();

  // Redirection vers Stripe
  stripe.redirectToCheckout({ sessionId: session.id });
});
