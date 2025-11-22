document.addEventListener("DOMContentLoaded", function () { //githuba update ucun komment elxan cool man terefinden
    const chatStyles = document.createElement("style");
    chatStyles.innerHTML = `
        #chatbot-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4f46e5;
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            cursor: pointer;
            z-index: 9999;
            transition: transform 0.3s;
        }
        #chatbot-btn:hover {
            transform: scale(1.1);
            background-color: #4338ca;
        }
        #chat-window {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 450px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
            transition: all 0.3s;
        }
        #chat-window.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: all;
        }
        .chat-header {
            background: #4f46e5;
            color: white;
            padding: 16px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-messages {
            flex-grow: 1;
            padding: 16px;
            overflow-y: auto;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .message {
            max-width: 80%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
        }
        .bot-msg {
            background: #e0e7ff;
            color: #3730a3;
            align-self: flex-start;
            border-bottom-left-radius: 2px;
        }
        .user-msg {
            background: #4f46e5;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 2px;
        }
        .chat-options {
            padding: 10px;
            background: white;
            border-top: 1px solid #eee;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .option-btn {
            background: white;
            border: 1px solid #4f46e5;
            color: #4f46e5;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
        }
        .option-btn:hover {
            background: #4f46e5;
            color: white;
        }
        .close-chat {
            cursor: pointer;
        }
    `;
    document.head.appendChild(chatStyles);

    const chatHTML = `
        <div id="chatbot-btn">
            <i class="fas fa-robot"></i>
        </div>
        <div id="chat-window">
            <div class="chat-header">
                <span>Ağıllı Köməkçi</span>
                <span class="close-chat"><i class="fas fa-times"></i></span>
            </div>
            <div class="chat-messages" id="chat-messages">
                <div class="message bot-msg">Salam! Sizə necə kömək edə bilərəm? Aşağıdakı mövzulardan birini seçin.</div>
            </div>
            <div class="chat-options" id="chat-options">
                <button class="option-btn" data-msg="Sifarişim hardadır?">📦 Sifarişim hardadır?</button>
                <button class="option-btn" data-msg="Mayner necə işləyir?">⛏️ Mayner nədir?</button>
                <button class="option-btn" data-msg="Endirim var?">🏷️ Endirim var?</button>
                <button class="option-btn" data-msg="Operatorla əlaqə">📞 Operator</button>
            </div>
        </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = chatHTML;
    document.body.appendChild(div);

    const btn = document.getElementById("chatbot-btn");
    const windowEl = document.getElementById("chat-window");
    const closeBtn = document.querySelector(".close-chat");
    const messagesEl = document.getElementById("chat-messages");
    const options = document.querySelectorAll(".option-btn");

    btn.addEventListener("click", () => windowEl.classList.toggle("open"));
    closeBtn.addEventListener("click", () => windowEl.classList.remove("open"));

    options.forEach(opt => {
        opt.addEventListener("click", function() {
            const text = this.getAttribute("data-msg");
            addMessage(text, 'user');
            
            setTimeout(() => {
                let botResponse = "";
                if (text.includes("Sifariş")) {
                    botResponse = "Sifarişinizi izləmək üçün 'Tracking' səhifəsinə daxil olun və Sifariş ID-nizi (məs: ORD-12345) daxil edin.";
                } else if (text.includes("Mayner")) {
                    botResponse = "Mayner səhifəsində 'Start' düyməsini sıxaraq pulsuz coin qazana və onları real pula çevirə bilərsiniz!";
                } else if (text.includes("Endirim")) {
                    botResponse = "Bəli! Hazırda 'Flash Sales' bölməsində 30%-dək endirimlər var. Həmçinin 'Mystery Box'dan kupon qazana bilərsiniz.";
                } else {
                    botResponse = "Operatorlarımız hazırda məşğuldur. Zəhmət olmasa email vasitəsilə bizə yazın: support@ecommerce.az";
                }
                addMessage(botResponse, 'bot');
            }, 600);
        });
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", sender === 'user' ? "user-msg" : "bot-msg");
        msgDiv.innerText = text;
        messagesEl.appendChild(msgDiv);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }
});