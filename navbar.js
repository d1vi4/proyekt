document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    let authButton = "";
  
    if (currentPath.includes("login.html")) {
      authButton = `<a href="signup.html" class="px-3 py-2">Sign Up</a>`;
    } else {
      authButton = `<a href="login.html" class="px-3 py-2">Login</a>`;
    }
  
    const navbar = `
          <nav class="bg-white border-b border-gray-200 transition-colors duration-300" id="main-nav">
              <div class="container mx-auto px-4">
                  <div class="flex justify-between items-center h-16">
                      <a href="index.html" class="text-xl font-bold logo-text">E-commerce</a>
                      
                      <button id="mobile-menu-button" class="md:hidden focus:outline-none">
                          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                          </svg>
                      </button>
                      
                      <div class="hidden md:flex items-center space-x-4">
                          <div class="flex space-x-4">
                              <a href="index.html" class="px-3 py-2 hover:text-blue-600 nav-link">Home</a>
                              <a href="mystery-box.html" class="px-3 py-2 font-bold text-purple-600 hover:text-purple-800 nav-link">
                                <i class="fas fa-cube mr-1"></i>Mystery Box
                              </a>
                              <a href="shop.html" class="px-3 py-2 hover:text-blue-600 nav-link">Shop</a>
                              <a href="tracking.html" class="px-3 py-2 hover:text-blue-600 nav-link">Tracking</a>
                          </div>
                          
                          <div class="relative mx-2">
                              <input type="text" placeholder="Search" class="border rounded px-3 py-1 w-32">
                          </div>
                          
                          <button id="matrix-toggle" class="px-3 py-2 rounded bg-gray-900 text-green-500 font-mono text-xs border border-green-500 hover:bg-black transition" title="Toggle Matrix Mode">
                             &lt;/&gt;
                          </button>

                          <div id="user-section">${authButton}</div>
                      </div>
                  </div>
                  
                  <div id="mobile-menu" class="hidden md:hidden">
                      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                          <a href="index.html" class="block px-3 py-2 nav-link">Home</a>
                          <a href="mystery-box.html" class="block px-3 py-2 nav-link">Mystery Box</a>
                          <a href="shop.html" class="block px-3 py-2 nav-link">Shop</a>
                          <a href="tracking.html" class="block px-3 py-2 nav-link">Tracking</a>
                          <div class="pt-4">
                              ${authButton}
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
          <style id="matrix-style"></style>
      `;
  
    document.getElementById("navbar-placeholder").innerHTML = navbar;
  
    document.getElementById("mobile-menu-button").addEventListener("click", function () {
        const menu = document.getElementById("mobile-menu");
        menu.classList.toggle("hidden");
    });
  
    const toggleBtn = document.getElementById("matrix-toggle");
    const styleTag = document.getElementById("matrix-style");
    
    if (localStorage.getItem("matrixMode") === "true") {
        enableMatrixMode();
    }

    toggleBtn.addEventListener("click", function() {
        const isEnabled = localStorage.getItem("matrixMode") === "true";
        if (isEnabled) {
            disableMatrixMode();
        } else {
            enableMatrixMode();
        }
    });

    function enableMatrixMode() {
        localStorage.setItem("matrixMode", "true");
        document.body.classList.add("matrix-active");
        styleTag.innerHTML = `
            :root {
                --primary-color: #00FF00 !important;
                --accent-color: #003300 !important;
                --text-dark: #00FF00 !important;
                --text-body: #00DD00 !important;
            }
            body, .bg-gray-50, .bg-white {
                background-color: #000000 !important;
                color: #00FF00 !important;
                font-family: 'Courier New', monospace !important;
            }
            nav, .bg-white, .card, .collection-card, .feedback-card {
                background-color: #0a0a0a !important;
                border-color: #005500 !important;
            }
            h1, h2, h3, h4, h5, p, span, a, i {
                color: #00FF00 !important;
                text-shadow: 0 0 5px #003300;
            }
            button, .btn-primary, .bg-indigo-600, .bg-red-600, .bg-yellow-500 {
                background-color: #003300 !important;
                color: #00FF00 !important;
                border: 1px solid #00FF00 !important;
                box-shadow: 0 0 10px #00FF00;
            }
            button:hover {
                background-color: #00FF00 !important;
                color: #000000 !important;
            }
            input, select, textarea {
                background-color: #001100 !important;
                color: #00FF00 !important;
                border-color: #00FF00 !important;
            }
            #wheel-container canvas {
                filter: hue-rotate(90deg) brightness(1.5);
            }
        `;
    }

    function disableMatrixMode() {
        localStorage.setItem("matrixMode", "false");
        document.body.classList.remove("matrix-active");
        styleTag.innerHTML = "";
    }

    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let balance = parseFloat(localStorage.getItem("userBalance")) || 0;

    if (user) {
      document.getElementById("user-section").innerHTML = `
              <div class="flex items-center">
                  <a href="miner.html" class="px-3 py-2 mr-2 text-indigo-600 hover:text-indigo-800 nav-link" title="Crypto Miner">
                      <i class="fas fa-microchip"></i>
                  </a>

                  <a href="topup.html" class="px-3 py-2 mr-2 text-green-600 font-bold border border-green-200 rounded hover:bg-green-50 transition nav-link" title="Balansı artır">
                       <i class="fas fa-wallet"></i> ${balance.toFixed(2)} ₼
                   </a>
                   
                   <a href="wishlist.html" class="px-3 py-2 mr-2 text-red-500 nav-link" title="Wishlist">
                        <i class="fas fa-heart"></i>
                   </a>
                   
                   <a href="transactions.html" class="px-3 py-2 mr-2 text-gray-600 nav-link" title="History">
                        <i class="fas fa-history"></i>
                   </a>

                  <a href="cart.html" class="px-3 py-2 mr-2 nav-link">
                      <i class="fas fa-shopping-cart"></i>
                  </a>
                  <a href="profile.html" class="px-3 py-2 nav-link">
                      <i class="fas fa-user"></i> ${user.username} 
                  </a>
                  <button class="ml-2 bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm" id="logout">
                      <i class="fas fa-sign-out-alt"></i>
                  </button>
              </div>
          `;
  
      document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "login.html";
      });
    }
});