document.addEventListener("DOMContentLoaded", () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const modal = document.getElementById('success-modal');

    // Handle "Yes" button click
    btnYes.addEventListener('click', () => {
        // Fire confetti
        const myCanvas = document.getElementById('confetti-canvas');
        const myConfetti = confetti.create(myCanvas, {
            resize: true,
            useWorker: true
        });

        // Multiple confetti bursts for epic feeling
        var count = 200;
        var defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            myConfetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        // Fade out invitation card so the user can enjoy the full background image
        const container = document.querySelector('.invitation-container');
        if (container) {
            container.classList.add('fade-out');
        }

        // Show modal after a small delay
        setTimeout(() => {
            modal.classList.add('visible');
        }, 500);

        // GỬI THÔNG BÁO TỰ ĐỘNG NGẦM QUA TELEGRAM (CÁCH DỄ VÀ MIỄN PHÍ NHẤT)
        // Bạn cần thay YOUR_BOT_TOKEN và YOUR_CHAT_ID bằng thông tin thật của bạn

        const botToken = "8785420894:AAFox-EvswExMBSjtRd2odOSRmrCqu4drYs";
        const chatId = "7248182197";
        const message = "🎉 TIN HOT: Lan Hương click ĐỒNG Ý đi xem phim Odyssey với bạn rồi kìa! Lên đồ thôi! 🥰";

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        })
            .then(response => console.log("Đã gửi thông báo ngầm qua Telegram thành công!"))
            .catch(error => console.error("Lỗi:", error));
    });

    // Make "No" button run away (staying nearby)
    let currentX = 0;
    let currentY = 0;

    const runAway = (e) => {
        if (e) e.preventDefault();

        // Adjust movement size and boundary for mobile screens
        const isMobile = window.innerWidth <= 480;
        const baseMove = isMobile ? 30 : 60;
        const maxOffset = isMobile ? 80 : 150;

        // Randomly move by baseMove to baseMove + 40 pixels
        const moveX = (Math.random() * 40 + baseMove) * (Math.random() > 0.5 ? 1 : -1);
        const moveY = (Math.random() * 40 + baseMove) * (Math.random() > 0.5 ? 1 : -1);

        currentX += moveX;
        currentY += moveY;

        // Constrain so it doesn't fly too far away from the original spot
        if (currentX > maxOffset) currentX = maxOffset - Math.random() * 30;
        if (currentX < -maxOffset) currentX = -maxOffset + Math.random() * 30;
        if (currentY > maxOffset) currentY = maxOffset - Math.random() * 30;
        if (currentY < -maxOffset) currentY = -maxOffset + Math.random() * 30;

        btnNo.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    btnNo.addEventListener('mouseover', runAway);
    btnNo.addEventListener('click', runAway);
    btnNo.addEventListener('touchstart', runAway);

    // Close modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('visible');
        }
    });
});
