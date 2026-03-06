// Récupération du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Étape 1 → Étape 2
document.getElementById("to-step2").addEventListener("click", () => {
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

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
});

// Affichage du récapitulatif
function renderSummary() {
  const summary = document.getElementById("order-summary");
  const total = document.getElementById("order-total");

  summary.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    sum += Number(item.price);
    summary.innerHTML += `
      <div class="summary-item">
        <strong>${item.name}</strong> - ${item.price}€
      </div>
    `;
  });

  total.textContent = sum;
}
// Étape 1 → Étape 2
document.getElementById("to-step2").addEventListener("click", () => {

  // Vérification des champs obligatoires
  const requiredFields = ["fullname", "email", "phone", "address", "city", "zipcode", "country"];
  for (let field of requiredFields) {
    if (document.getElementById(field).value.trim() === "") {
      alert("Merci de remplir tous les champs.");
      return;
    }
  }

  // Passage à l'étape suivante
  document.getElementById("step1").style.display = "none";
  document.getElementById("step2").style.display = "block";

  renderSummary();
});
