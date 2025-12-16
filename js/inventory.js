function renderInventory() {
  const tbody = document.getElementById("inventoryTable");
  tbody.innerHTML = "";
  inventory.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.code}</td>
      <td>${item.name}</td>
      <td ${item.stock < 10 ? 'style="color:red;font-weight:bold"' : ''}>${item.stock}</td>
      <td>Rp ${item.buyPrice.toLocaleString()}</td>
      <td>Rp ${item.sellPrice.toLocaleString()}</td>
      <td>${item.wholesaleMin || '-'}</td>
      <td>${item.wholesalePrice ? 'Rp '+item.wholesalePrice.toLocaleString() : '-'}</td>
      <td>
        <button onclick="editItem(${item.id})">Edit</button>
        <button onclick="deleteItem(${item.id})" style="background:#e74c3c;">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  updateDashboard();
}

function showAddItemForm() {
  document.getElementById("modalTitle").textContent = "Tambah Barang Baru";
  document.getElementById("editId").value = "";
  document.getElementById("itemCode").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("itemStock").value = "0";
  document.getElementById("itemBuyPrice").value = "";
  document.getElementById("itemSellPrice").value = "";
  document.getElementById("itemWholesaleMin").value = "0";
  document.getElementById("itemWholesalePrice").value = "";
  document.getElementById("itemModal").style.display = "block";
}

function closeModal() {
  document.getElementById("itemModal").style.display = "none";
}

function saveItem() {
  const id = document.getElementById("editId").value || Date.now();
  const item = {
    id: Number(id),
    code: document.getElementById("itemCode").value.trim(),
    name: document.getElementById("itemName").value.trim(),
    stock: Number(document.getElementById("itemStock").value) || 0,
    buyPrice: Number(document.getElementById("itemBuyPrice").value),
    sellPrice: Number(document.getElementById("itemSellPrice").value),
    wholesaleMin: Number(document.getElementById("itemWholesaleMin").value) || 0,
    wholesalePrice: Number(document.getElementById("itemWholesalePrice").value) || 0
  };

  if (!item.code || !item.name || !item.buyPrice || !item.sellPrice) {
    alert("Isi semua field wajib!");
    return;
  }

  const index = inventory.findIndex(i => i.id === item.id);
  if (index >= 0) {
    const oldItem = inventory[index];
    inventory[index] = item;
    addLog("Mengedit barang", item.name, `Stok: ${oldItem.stock} → ${item.stock}, Harga Beli: Rp ${oldItem.buyPrice.toLocaleString()} → Rp ${item.buyPrice.toLocaleString()}`);
  } else {
    inventory.push(item);
    addLog("Menambah barang baru", item.name, `Stok awal: ${item.stock}, Harga beli: Rp ${item.buyPrice.toLocaleString()}`);
  }
  saveData();
  renderInventory();
  populateSelects();
  closeModal();
}

function editItem(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  document.getElementById("modalTitle").textContent = "Edit Barang";
  document.getElementById("editId").value = item.id;
  document.getElementById("itemCode").value = item.code;
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemStock").value = item.stock;
  document.getElementById("itemBuyPrice").value = item.buyPrice;
  document.getElementById("itemSellPrice").value = item.sellPrice;
  document.getElementById("itemWholesaleMin").value = item.wholesaleMin;
  document.getElementById("itemWholesalePrice").value = item.wholesalePrice;
  document.getElementById("itemModal").style.display = "block";
}

function deleteItem(id) {
  if (confirm("Yakin hapus barang ini?")) {
    const item = inventory.find(i => i.id === id);
    inventory = inventory.filter(i => i.id !== id);
    addLog("Menghapus barang", item.name, "Barang dihapus permanen dari inventori");
    saveData();
    renderInventory();
    populateSelects();
  }
}

function filterInventory() {
  const query = document.getElementById("searchItem").value.toLowerCase();
  const rows = document.querySelectorAll("#inventoryTable tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
}

// === LOG PERUBAHAN ===
function addLog(action, itemName, details) {
  const now = new Date();
  const logEntry = {
    datetime: now.toLocaleString("id-ID"),
    user: document.getElementById("username").textContent || "Unknown",
    action: action,
    item: itemName,
    details: details
  };
  changeLog.unshift(logEntry);
  saveData();
  renderLog();
}

function renderLog() {
  const container = document.getElementById("logContainer");
  if (changeLog.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#666;padding:50px;'>Belum ada perubahan inventori.</p>";
    return;
  }
  container.innerHTML = "";
  changeLog.forEach(log => {
    container.innerHTML += `
      <div class="log-item">
        <div class="log-time">${log.datetime}</div>
        <div><span class="log-user">${log.user}</span> → ${log.action} <strong>${log.item}</strong></div>
        <div style="margin-top:8px;font-size:14px;color:#555;">${log.details}</div>
      </div>
    `;
  });
}
