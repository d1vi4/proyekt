const NAMES = [
    "Ali", "Leyla", "Mammad", "Gunel", "Rashad", "Nigar", "Orkhan", 
    "Aysel", "Farid", "Sevinj", "Elvin", "Zahra", "Murad", "Fidan"
];

const ACTIONS = [
    { text: "just bought iPhone 14 Pro", icon: "fas fa-shopping-bag", color: "text-blue-500" },
    { text: "won 50 ₼ in Wheel of Fortune", icon: "fas fa-dharmachakra", color: "text-yellow-500" },
    { text: "opened Premium Box and won a Laptop!", icon: "fas fa-box-open", color: "text-purple-500" },
    { text: "just registered", icon: "fas fa-user-plus", color: "text-green-500" },
    { text: "withdrew 20 ₼ from Miner", icon: "fas fa-coins", color: "text-orange-500" },
    { text: "won 10 ₼ in Standard Box", icon: "fas fa-gift", color: "text-indigo-500" },
    { text: "purchased Gaming Headphones", icon: "fas fa-headset", color: "text-red-500" },
    { text: "got a 40% OFF Coupon", icon: "fas fa-ticket-alt", color: "text-pink-500" }
];

function createNotification() {
    const container = document.getElementById("live-chat-container");
    if (!container) return;

    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    
    const notification = document.createElement("div");
    notification.className = "bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg p-3 mb-3 flex items-center transform translate-x-full transition-transform duration-500 w-72";
    
    notification.innerHTML = `
        <div class="flex-shrink-0 mr-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <i class="${action.icon} ${action.color} text-lg"></i>
            </div>
        </div>
        <div>
            <p class="text-sm font-bold text-gray-800">${name}</p>
            <p class="text-xs text-gray-600">${action.text}</p>
            <p class="text-[10px] text-gray-400 mt-1">Just now</p>
        </div>
    `;

    container.appendChild(notification);

    requestAnimationFrame(() => {
        notification.classList.remove("translate-x-full");
    });

    setTimeout(() => {
        notification.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

function startLiveChat() {
    const container = document.createElement("div");
    container.id = "live-chat-container";
    container.className = "fixed bottom-4 left-4 z-50 flex flex-col-reverse pointer-events-none"; 
    document.body.appendChild(container);

    createNotification();

    setInterval(() => {
        const delay = Math.random() * 3000 + 2000; 
        setTimeout(createNotification, delay);
    }, 4000);
}

document.addEventListener("DOMContentLoaded", startLiveChat);