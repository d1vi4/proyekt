document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    let authButton = "";
  
    if (currentPath.includes("login.html")) {
      authButton = `<a href="signup.html" class="px-3 py-2">Sign Up</a>`;
    } else {
      authButton = `<a href="login.html" class="px-3 py-2">Login</a>`;
    }
  
    const navbar = `
          <nav class="bg-white border-b border-gray-200">
              <div class="container mx-auto px-4">
                  <div class="flex justify-between items-center h-16">
                      <a href="index.html" class="text-xl font-bold">E-commerce</a>
                      
                      <button id="mobile-menu-button" class="md:hidden focus:outline-none">
                          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                          </svg>
                      </button>
                      
                      <div class="hidden md:flex items-center space-x-4">
                          <div class="flex space-x-4">
                              <a href="index.html" class="px-3 py-2 hover:text-blue-600">Home</a>
                              <a href="contact.html" class="px-3 py-2 hover:text-blue-600">Contact</a>
                              <a href="about.html" class="px-3 py-2 hover:text-blue-600">About</a>
                              <a href="shop.html" class="px-3 py-2 hover:text-blue-600">Shop</a>
                          </div>
                          
                          <div class="relative mx-2">
                              <input type="text" placeholder="Search" class="border rounded px-3 py-1 w-32">
                          </div>
                          
                          <div id="user-section">${authButton}</div>
                      </div>
                  </div>
                  
                  <div id="mobile-menu" class="hidden md:hidden">
                      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                          <a href="index.html" class="block px-3 py-2">Home</a>
                          <a href="contact.html" class="block px-3 py-2">Contact</a>
                          <a href="about.html" class="block px-3 py-2">About</a>
                          <a href="shop.html" class="block px-3 py-2">Shop</a>
                          <div class="pt-4">
                              <input type="text" placeholder="Search" class="border rounded px-3 py-1 w-full">
                          </div>
                          <div class="pt-4">
                              ${authButton}
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
      `;
  
    document.getElementById("navbar-placeholder").innerHTML = navbar;
  
    document
      .getElementById("mobile-menu-button")
      .addEventListener("click", function () {
        const menu = document.getElementById("mobile-menu");
        menu.classList.toggle("hidden");
      });
  
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    let balance = parseFloat(localStorage.getItem("userBalance")) || 0;

    if (user) {
      document.getElementById("user-section").innerHTML = `
              <div class="flex items-center">
                  <a href="miner.html" class="px-3 py-2 mr-2 text-indigo-600 hover:text-indigo-800" title="Go to Crypto Miner">
                      <i class="fas fa-microchip"></i>
                  </a>

                  <a href="topup.html" class="px-3 py-2 mr-2 text-green-600 font-bold border border-green-200 rounded hover:bg-green-50 transition" title="Balansı artır">
                       <i class="fas fa-wallet"></i> ${balance.toFixed(2)} ₼
                   </a>

                  <a href="cart.html" class="px-3 py-2 mr-2">
                      <i class="fas fa-shopping-cart"></i>
                  </a>
                  <a href="profile.html" class="px-3 py-2">
                      <i class="fas fa-user"></i> ${user.username} 
                  </a>
                  <button class="ml-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm" id="logout">
                      <i class="fas fa-sign-out-alt"></i> Sign Out
                  </button>
              </div>
          `;
  
      document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      });
    }
});