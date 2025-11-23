function showNotification(message, type = "success") {
    const container = document.getElementById("main-notification-container");
    if (!container) return;
    const element = document.createElement("div");
    element.className = `bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-4 py-3 rounded shadow-md flex justify-between items-center transform transition-transform duration-300 scale-0 mb-3`;
    element.innerHTML = `
        <div>${message}</div>
        <button type="button" class="focus:outline-none ml-4" onclick="closeNotification(this.parentElement)">
            <span class="text-2xl">&times;</span>
        </button>
    `;
    container.prepend(element);
    requestAnimationFrame(() => {
      element.classList.remove("scale-0");
      element.classList.add("scale-100");
    });
    setTimeout(() => {
      closeNotification(element);
    }, 5000);
  }
  
  function closeNotification(element) {
    element.classList.remove("scale-100");
    element.classList.add("scale-0");
    setTimeout(() => element.remove(), 300);
  }
  
  function generatePromoCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }