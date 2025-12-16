function renderDailySales() {
  const tbody = document.querySelector("#dailySalesTable tbody");
  tbody.innerHTML = "";
  const today = new Date().toISOString().slice(0,10);
  let totalToday = 0;

  sales.filter(s => s.date === today).forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.time}</td><td>${s.name}</td><td>${s.qty}</td><td>Rp ${s.sellPrice.toLocaleString()}</td><td>${s.discount}%</td><td>Rp ${s.total.toLocaleString()}</td>`;
    tbody.appendChild(tr);
    totalToday += s.total;
  });

  document.getElementById("todaySales").textContent = "Rp " + totalToday.toLocaleString();
  updateDashboard();
}

function addSale() {
  const select = document.getElementById("saleItem");
  const itemId = Number(select.value);
  const item = inventory.find(i => i.id === itemId);
  if (!item) return alert("Pilih barang!");

  const qty = Number(document.getElementById("saleQty").value);
  if (qty <= 0 || qty > item.stock) return alert("Stok tidak cukup!");

  // Hitung harga (grosir jika memenuhi)
  let sellPrice = item.sellPrice;
  let discount = 0;
  if (item.wholesaleMin > 0 && qty >= item.wholesaleMin) {
    sellPrice = item.wholesalePrice;
    discount = Math.round((1 - sellPrice/item.sellPrice)*100);
  }

  const total = qty * sellPrice;

  // Kurangi stok
  item.stock -= qty;

  // Catat penjualan
  sales.push({
    date: document.getElementById("saleDate").value || new Date().toISOString().slice(0,10),
    time: new Date().toLocaleTimeString("id-ID", {hour:'2-digit', minute:'2-digit'}),
    name: item.name,
    qty,
    sellPrice,
    discount,
    total
  });

  saveData();
  renderInventory();
  renderDailySales();
  populateSelects();
  document.getElementById("saleQty").value = "";
  alert("Penjualan berhasil!");
}