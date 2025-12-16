function generateReport() {
  const start = document.getElementById("reportStart").value;
  const end = document.getElementById("reportEnd").value;
  if (!start || !end) return alert("Pilih tanggal!");

  let totalCOGS = 0;
  let totalRevenue = 0;

  const filteredSales = sales.filter(s => s.date >= start && s.date <= end);

  filteredSales.forEach(sale => {
    const item = inventory.find(i => i.name === sale.name);
    const cogsPerUnit = item ? item.buyPrice : 0;
    totalCOGS += sale.qty * cogsPerUnit;
    totalRevenue += sale.total;
  });

  const profit = totalRevenue - totalCOGS;

  document.getElementById("reportResult").innerHTML = `
    <h3>Laporan Periode ${start} s/d ${end}</h3>
    <p><strong>Total Penjualan:</strong> Rp ${totalRevenue.toLocaleString()}</p>
    <p><strong>HPP (Harga Pokok Penjualan):</strong> Rp ${totalCOGS.toLocaleString()}</p>
    <p><strong>Laba Kotor:</strong> Rp ${profit.toLocaleString()}</p>
    <p><strong>Margin:</strong> ${totalRevenue > 0 ? ((profit/totalRevenue)*100).toFixed(1) : 0}%</p>
  `;
}

function exportExcel() {
  const start = document.getElementById("reportStart").value;
  const end = document.getElementById("reportEnd").value;
  if (!start || !end) return alert("Generate laporan dulu!");

  const data = sales
    .filter(s => s.date >= start && s.date <= end)
    .map(s => ({
      Tanggal: s.date,
      Waktu: s.time,
      Barang: s.name,
      Jumlah: s.qty,
      "Harga Jual": s.sellPrice,
      Diskon: s.discount + "%",
      Total: s.total
    }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Penjualan");
  XLSX.writeFile(wb, `Laporan_Varsha_${start}_sd_${end}.xlsx`);
}