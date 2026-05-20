const billingButtons = document.querySelectorAll(".billing-option");
const prices = document.querySelectorAll(".price");
const planButtons = document.querySelectorAll(".plan-btn");
const planSelect = document.querySelector("#planSelect");
const orderForm = document.querySelector("#orderForm");
const formStatus = document.querySelector("#formStatus");

function updatePrices(mode) {
  const quarterly = mode === "quarterly";

  prices.forEach((price) => {
    const base = Number(price.dataset.base);
    const value = quarterly ? Math.round(base * 0.9 * 3) : base;
    price.innerHTML = `<span>USD</span> ${value}`;
  });
}

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    billingButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    updatePrices(button.dataset.billing);
  });
});

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    planSelect.value = button.dataset.plan;
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const name = data.get("name").trim();
  const plan = data.get("plan");

  formStatus.textContent = `Listo, ${name}. Armamos una cotizacion para el plan ${plan} y te contactamos por el dato que dejaste.`;
  orderForm.reset();
  planSelect.value = "Forge";
});
