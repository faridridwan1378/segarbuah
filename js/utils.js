function openTab(evt, tabName) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".tab-link").forEach(t => t.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

function populateSelects() {
  const purchaseSelect = document.getElementById("purchaseItem");
  const saleSelect = document.getElementById("saleItem");
  [purchaseSelect, saleSelect].forEach(sel => {
    sel.innerHTML = '<option value="">-- Pilih Barang --</option>';
    inventory.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.id;
      opt.textContent = `${item.code} - ${item.name} (Stok: ${item.stock})`;
      sel.appendChild(opt);
    });
  });
}

function updateDashboard() {
  const totalItems = inventory.length;
  const lowStock = inventory.filter(i => i.stock < 10).length;
  const today = new Date().toISOString().slice(0,10);
  const todaySales = sales.filter(s => s.date === today).reduce((sum,s) => sum + s.total, 0);
  const todayCOGS = sales.filter(s => s.date === today).reduce((sum,s) => {
    const item = inventory.find(i => i.name === s.name);
    return sum + (s.qty * (item ? item.buyPrice : 0));
  }, 0);
  const todayProfit = todaySales - todayCOGS;

  document.getElementById("totalItems").textContent = totalItems;
  document.getElementById("lowStock").textContent = lowStock;
  document.getElementById("todaySales").textContent = "Rp " + todaySales.toLocaleString();
  document.getElementById("todayProfit").textContent = "Rp " + todayProfit.toLocaleString();
}

function initApp() {
  initSampleData();
  renderInventory();
  renderPurchases();
  renderDailySales();
  populateSelects();
  updateDashboard();
  renderLog();
  document.getElementById("saleDate").value = new Date().toISOString().slice(0,10);

  // Set default tanggal laporan
  const today = new Date().toISOString().slice(0,10);
  document.getElementById("reportStart").value = today;
  document.getElementById("reportEnd").value = today;
}
