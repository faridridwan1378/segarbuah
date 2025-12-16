function checkLogin() {
  const user = sessionStorage.getItem("user");
  if (!user) {
    location.href = "index.html";
    return;
  }
  const u = JSON.parse(user);
  document.getElementById("username").textContent = u.username;
  document.getElementById("userRole").textContent = u.role.toUpperCase();

  // Sembunyikan menu yang tidak boleh diakses
  if (u.role !== "admin") {
    document.querySelectorAll(".admin-only").forEach(el => el.classList.add("restricted"));
  }
}

function logout() {
  sessionStorage.clear();
  location.href = "index.html";
}