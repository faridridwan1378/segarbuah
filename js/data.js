// Data utama
let inventory = JSON.parse(localStorage.getItem("varsha_inventory")) || [];
let purchases = JSON.parse(localStorage.getItem("varsha_purchases")) || [];
let sales = JSON.parse(localStorage.getItem("varsha_sales")) || [];
let changeLog = JSON.parse(localStorage.getItem("varsha_log")) || [];

// Simpan ke localStorage
function saveData() {
  localStorage.setItem("varsha_inventory", JSON.stringify(inventory));
  localStorage.setItem("varsha_purchases", JSON.stringify(purchases));
  localStorage.setItem("varsha_sales", JSON.stringify(sales));
  localStorage.setItem("varsha_log", JSON.stringify(changeLog));
}

// Inisialisasi contoh data jika kosong
function initSampleData() {
  if (inventory.length === 0) {
    inventory = [
      {id:1, code:"A01", name:"Apel Fuji", stock:50, buyPrice:25000, sellPrice:35000, wholesaleMin:10, wholesalePrice:30000},
      {id:2, code:"J01", name:"Jeruk Sunkist", stock:80, buyPrice:15000, sellPrice:22000, wholesaleMin:20, wholesalePrice:18000},
      {id:3, code:"P01", name:"Pisang Ambon", stock:120, buyPrice:8000, sellPrice:15000, wholesaleMin:0, wholesalePrice:0}
    ];
    saveData();
  }
}
