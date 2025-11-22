document.addEventListener("DOMContentLoaded", function () {
    const hoursEl = document.getElementById("fs-hours");
    const minutesEl = document.getElementById("fs-minutes");
    const secondsEl = document.getElementById("fs-seconds");

    if (!hoursEl || !minutesEl || !secondsEl) return;

    let duration = 14400; //githuba update ucun komment elxan cool man terefinden

    function updateTimer() {
        const h = Math.floor(duration / 3600);
        const m = Math.floor((duration % 3600) / 60);
        const s = duration % 60;

        hoursEl.innerText = h < 10 ? "0" + h : h;
        minutesEl.innerText = m < 10 ? "0" + m : m;
        secondsEl.innerText = s < 10 ? "0" + s : s;

        if (duration > 0) {
            duration--;
        } else {
            duration = 14400; 
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});