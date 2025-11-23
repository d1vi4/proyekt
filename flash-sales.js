document.addEventListener("DOMContentLoaded", function () {
    const hoursEl = document.getElementById("fs-hours");
    const minutesEl = document.getElementById("fs-minutes");
    const secondsEl = document.getElementById("fs-seconds");

    if (!hoursEl || !minutesEl || !secondsEl) return;

    const DURATION_SECONDS = 14400;

    function getEndTime() {
        let endTime = localStorage.getItem('flashSaleEndTime');
        if (!endTime || new Date().getTime() > endTime) {
            endTime = new Date().getTime() + DURATION_SECONDS * 1000;
            localStorage.setItem('flashSaleEndTime', endTime);
        }
        return parseInt(endTime);
    }

    let endTime = getEndTime();

    function updateTimer() {
        const now = new Date().getTime();
        let distance = endTime - now;

        if (distance < 0) {
            endTime = new Date().getTime() + DURATION_SECONDS * 1000;
            localStorage.setItem('flashSaleEndTime', endTime);
            distance = endTime - now;
        }

        const h = Math.floor(distance / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        hoursEl.innerText = h < 10 ? "0" + h : h;
        minutesEl.innerText = m < 10 ? "0" + m : m;
        secondsEl.innerText = s < 10 ? "0" + s : s;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});