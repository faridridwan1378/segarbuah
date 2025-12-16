function renderPurchases() {
  const tbody = document.getElementById("purchaseTable");
  tbody.innerHTML = "";
  purchases.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${p.date}</td><td>${p.name}</td><td>${p.qty}</td><td>Rp ${p.price.toLocaleString()}</td><td>Rp ${(p.qty*p.price).toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}

function addPurchase() {
  const select = document.getElementById("purchaseItem");
  const itemId = Number(select.value);
  const item = inventory.find(i => i.id === itemId);
  if (!item) return alert("Pilih barang!");

  const qty = Number(document.getElementById("purchaseQty").value);
  const price = Number(document.getElementById("purchasePrice").value);
  if (qty <= 0 || price <= 0) return alert("Isi jumlah dan harga!");

  // Update stok
  item.stock += qty;
  item.buyPrice = price; // update harga beli terbaru

  // Catat pembelian
  purchases.push({
    date: new Date().toLocaleDateString("id-ID"),
    name: item.name,
    qty,
    price
  });

  saveData();
  renderInventory();
  renderPurchases();
  populateSelects();
  alert("Pembelian berhasil dicatat!");
  document.getElementById("purchaseQty").value = "";
  document.getElementById("purchasePrice").value = "";
}