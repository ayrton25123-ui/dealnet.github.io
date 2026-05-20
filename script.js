const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".nav-links a");
const serverLog = document.querySelector("#server-log");
const ramUsage = document.querySelector("#ram-usage");
const cpuUsage = document.querySelector("#cpu-usage");
const tpsValue = document.querySelector("#tps-value");
const playersInput = document.querySelector("#players");
const playersLabel = document.querySelector("#players-label");
const serverType = document.querySelector("#server-type");
const estimateTitle = document.querySelector("#estimate-title");
const estimatePrice = document.querySelector("#estimate-price");

const logLines = [
  "[15:38:02] Starting minecraft server version 1.20.4",
  "[15:38:04] Loading properties and whitelist",
  "[15:38:07] Preparing spawn area: 100%",
  "[15:38:09] Done (7.41s)! For help, type \"help\"",
  "[15:39:12] Player Ayrton joined the game",
  "[15:40:01] Backup scheduled for 03:00",
  "[15:41:18] TPS stable at 20.0",
];

let logIndex = 0;

function renderLog() {
  if (!serverLog) return;
  logIndex = Math.min(logIndex + 1, logLines.length);
  serverLog.textContent = logLines.slice(0, logIndex).join("\n");

  if (logIndex < logLines.length) {
    window.setTimeout(renderLog, 650);
  }
}

function randomMetric(base, variance, decimals = 0) {
  const value = base + (Math.random() * variance - variance / 2);
  return value.toFixed(decimals);
}

function refreshMetrics() {
  if (!ramUsage || !cpuUsage || !tpsValue) return;
  ramUsage.textContent = `${randomMetric(62, 10)}%`;
  cpuUsage.textContent = `${randomMetric(28, 14)}%`;
  tpsValue.textContent = randomMetric(20, 0.2, 1);
}

function getPlanEstimate(players, multiplier) {
  const score = players * multiplier;

  if (score <= 25) {
    return { ram: "4 GB RAM", price: "$4.999/mes aprox." };
  }

  if (score <= 60) {
    return { ram: "8 GB RAM", price: "$8.999/mes aprox." };
  }

  if (score <= 105) {
    return { ram: "16 GB RAM", price: "$14.999/mes aprox." };
  }

  return { ram: "32 GB RAM", price: "Plan dedicado a medida" };
}

function updateEstimate() {
  if (!playersInput || !serverType) return;
  const players = Number(playersInput.value);
  const multiplier = Number(serverType.value);
  const estimate = getPlanEstimate(players, multiplier);

  playersLabel.textContent = `${players} jugadores`;
  estimateTitle.textContent = estimate.ram;
  estimatePrice.textContent = estimate.price;
}

menuButton?.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

playersInput?.addEventListener("input", updateEstimate);
serverType?.addEventListener("change", updateEstimate);

renderLog();
refreshMetrics();
updateEstimate();
window.setInterval(refreshMetrics, 2400);
window.lucide?.createIcons();
