/* =====================================================
   SCRIPT.JS — FOR MY DEAREST ♡
   FULL VERSION
   Compatible dengan HTML dan CSS yang kamu kirim
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENT
    ================================================= */

    const slides = document.querySelectorAll(".slide");

    const openBtn = document.getElementById("openBtn");
    const letterBtn = document.getElementById("letterBtn");
    const galleryBtn = document.getElementById("galleryBtn");
    const wishBtn = document.getElementById("wishBtn");
    const makeWishBtn = document.getElementById("makeWishBtn");
    const restartBtn = document.getElementById("restartBtn");

    const videoSlideBtn = document.getElementById("videoSlideBtn");
    const videoRestartBtn = document.getElementById("videoRestartBtn");
    const restartFromVideoBtn = document.getElementById("restartFromVideoBtn");

    const music = document.getElementById("music");
    const musicBtn = document.getElementById("musicBtn");

    const envelope = document.querySelector(".envelope");

    const typedMessage = document.getElementById("typedMessage");

    const wishMessage = document.getElementById("wishMessage");

    const birthdayVideo = document.getElementById("birthdayVideo");

    const photoModal = document.getElementById("photoModal");
    const modalClose = document.getElementById("modalClose");
    const modalImage = document.getElementById("modalImage");
    const modalCaption = document.getElementById("modalCaption");

    const photoCards = document.querySelectorAll(".photo-card");

    const particlesContainer = document.getElementById("particles");


    /* =================================================
       SLIDE NAVIGATION
    ================================================= */

    let currentSlide = 0;

    function goToSlide(slideNumber) {

        if (slideNumber < 0 || slideNumber >= slides.length) {
            return;
        }

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[slideNumber].classList.add("active");

        currentSlide = slideNumber;

        if (slideNumber === 3) {
            animateGallery();
        }

        if (slideNumber !== 5 && birthdayVideo) {
            birthdayVideo.pause();
        }

    }


    /* =================================================
       OPEN ENVELOPE
    ================================================= */

   /* =================================================
   OPEN ENVELOPE + AUTO PLAY MUSIC
================================================= */

if (openBtn) {

    openBtn.addEventListener("click", function () {

        // Buka amplop
        if (envelope) {
            envelope.classList.add("open");
        }

        // Putar musik
        if (music) {

            music.play().then(function () {

                musicPlaying = true;

                if (musicBtn) {
                    musicBtn.innerHTML = "♫ MUSIC ON";
                }

            }).catch(function (error) {

                console.log("Musik gagal diputar:", error);

            });

        }

        // Efek bunga
        createFlowerBurst();

        // Pindah ke slide 2
        setTimeout(function () {

            goToSlide(1);

        }, 1000);

    });

}


    /* =================================================
       SLIDE 2 → SLIDE 3
    ================================================= */

    if (letterBtn) {

        letterBtn.addEventListener("click", function () {

            goToSlide(2);

            startTyping();

        });

    }


    /* =================================================
       TYPEWRITER LETTER
    ================================================= */

    const letterText = `
Selamat ulang tahun, Grisel. ♡

Aku mungkin tidak selalu bisa memberikan
hal-hal yang sempurna untukmu.

Namun, aku ingin kamu tahu bahwa
kehadiranmu adalah salah satu hal
terindah yang pernah aku miliki.

Terima kasih karena sudah hadir,
memberikan warna dalam hari-hariku,
dan menjadi seseorang yang begitu berarti.

Semoga di usia yang baru ini,
kamu selalu diberikan kebahagiaan,
kesehatan, ketenangan,
dan semua hal baik yang kamu impikan.

Jangan pernah merasa sendirian.
Aku akan selalu mendukungmu,
mendoakanmu,
dan menyayangimu dengan caraku sendiri.

Happy Birthday, my dearest.

I love you. ♡
`;

    let typingTimer = null;
    let typingIndex = 0;
    let typingStarted = false;

    function startTyping() {

        if (!typedMessage) {
            return;
        }

        if (typingStarted) {
            return;
        }

        typingStarted = true;
        typingIndex = 0;

        typedMessage.innerHTML = "";

        const cursor = document.createElement("span");
        cursor.className = "cursor";

        typedMessage.appendChild(cursor);

        function typeCharacter() {

            if (typingIndex < letterText.length) {

                cursor.before(
                    document.createTextNode(
                        letterText.charAt(typingIndex)
                    )
                );

                typingIndex++;

                typingTimer = setTimeout(typeCharacter, 35);

            } else {

                cursor.remove();

            }

        }

        typeCharacter();

    }


    /* =================================================
       SLIDE 3 → SLIDE 4
    ================================================= */

    if (galleryBtn) {

        galleryBtn.addEventListener("click", function () {

            goToSlide(3);

            animateGallery();

        });

    }


    /* =================================================
       PHOTO POP-UP ANIMATION
       FOTO MUNCUL SATU PER SATU
    ================================================= */

    function animateGallery() {

        photoCards.forEach(function (card, index) {

            card.style.animation = "none";

            card.style.opacity = "0";

            card.style.transform =
                "translateY(35px) scale(0.85)";

            card.offsetHeight;

            card.style.animation =
                "photoPopSmooth 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards";

            card.style.animationDelay =
                (0.3 + index * 0.7) + "s";

        });

    }


    /* =================================================
       PHOTO MODAL
    ================================================= */

    photoCards.forEach(function (card) {

        card.addEventListener("click", function () {

            const image = card.querySelector("img");
            const caption = card.querySelector("figcaption");

            if (!image || !photoModal || !modalImage) {
                return;
            }

            modalImage.src = image.src;

            modalImage.alt = image.alt;

            if (modalCaption && caption) {
                modalCaption.textContent = caption.textContent;
            }

            photoModal.classList.add("show");

            createFlowerBurst();

        });

    });


    /* =================================================
       CLOSE PHOTO MODAL
    ================================================= */

    function closePhotoModal() {

        if (photoModal) {
            photoModal.classList.remove("show");
        }

    }

    if (modalClose) {

        modalClose.addEventListener("click", function () {
            closePhotoModal();
        });

    }

    if (photoModal) {

        photoModal.addEventListener("click", function (event) {

            if (event.target === photoModal) {
                closePhotoModal();
            }

        });

    }

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closePhotoModal();
        }

    });


    /* =================================================
       SLIDE 4 → SLIDE 5
    ================================================= */

    if (wishBtn) {

        wishBtn.addEventListener("click", function () {

            goToSlide(4);

        });

    }


    /* =================================================
       MAKE A WISH
    ================================================= */

    if (makeWishBtn) {

        makeWishBtn.addEventListener("click", function () {

            if (wishMessage) {
                wishMessage.classList.add("show");
            }

            createFlowerBurst();

            makeWishBtn.innerHTML = "Your wish is sent ♡";

            makeWishBtn.disabled = true;

            makeWishBtn.style.opacity = "0.75";

        });

    }


    /* =================================================
       SLIDE 5 → SLIDE 6 VIDEO
    ================================================= */

    if (videoSlideBtn) {

        videoSlideBtn.addEventListener("click", function () {

            goToSlide(5);

        });

    }


    /* =================================================
       VIDEO REPLAY
    ================================================= */

    if (videoRestartBtn && birthdayVideo) {

        videoRestartBtn.addEventListener("click", function () {

            birthdayVideo.currentTime = 0;

            birthdayVideo.play().catch(function () {
                console.log("Video siap diputar.");
            });

        });

    }


    /* =================================================
       VIDEO → RESTART WEBSITE
    ================================================= */

    if (restartFromVideoBtn) {

        restartFromVideoBtn.addEventListener("click", function () {

            restartWebsite();

        });

    }


    /* =================================================
       RESTART WEBSITE
    ================================================= */

    if (restartBtn) {

        restartBtn.addEventListener("click", function () {

            restartWebsite();

        });

    }

    function restartWebsite() {

        clearTimeout(typingTimer);

        typingStarted = false;
        typingIndex = 0;

        if (typedMessage) {
            typedMessage.innerHTML = "";
        }

        if (envelope) {
            envelope.classList.remove("open");
        }

        if (wishMessage) {
            wishMessage.classList.remove("show");
        }

        if (makeWishBtn) {

            makeWishBtn.innerHTML = "Make a wish ♡";

            makeWishBtn.disabled = false;

            makeWishBtn.style.opacity = "1";

        }

        if (birthdayVideo) {

            birthdayVideo.pause();

            birthdayVideo.currentTime = 0;

        }

        closePhotoModal();

        goToSlide(0);

    }


    /* =================================================
       MUSIC BUTTON
    ================================================= */

    let musicPlaying = false;

    if (musicBtn && music) {

        musicBtn.addEventListener("click", function () {

            if (!musicPlaying) {

                music.play().then(function () {

                    musicPlaying = true;

                    musicBtn.innerHTML = "♫ MUSIC ON";

                }).catch(function () {

                    musicBtn.innerHTML = "♫ CLICK TO PLAY";

                });

            } else {

                music.pause();

                musicPlaying = false;

                musicBtn.innerHTML = "♫ MUSIC";

            }

        });

    }

        /* =================================================
       MUSIC FADE OUT SAAT VIDEO DIPUTAR
    ================================================= */

    let musicFadeInterval = null;

    if (birthdayVideo && music) {

        birthdayVideo.addEventListener("play", function () {

            if (!musicPlaying) {
                return;
            }

            if (musicFadeInterval) {
                clearInterval(musicFadeInterval);
            }

            musicFadeInterval = setInterval(function () {

                if (music.volume > 0.05) {

                    music.volume = Math.max(
                        0,
                        music.volume - 0.05
                    );

                } else {

                    music.volume = 0;
                    music.pause();

                    clearInterval(musicFadeInterval);
                    musicFadeInterval = null;

                    musicPlaying = false;

                    if (musicBtn) {
                        musicBtn.innerHTML = "♫ MUSIC OFF";
                    }

                }

            }, 200);

        });

    }

    /* =================================================
       FALLING FLOWERS / HEART PARTICLES
    ================================================= */

    function createParticle() {

        if (!particlesContainer) {
            return;
        }

        const particle = document.createElement("div");

        particle.className = "particle";

        const symbols = [
            "♡",
            "✿",
            "❀",
            "✧",
            "✦"
        ];

        particle.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.fontSize =
            (Math.random() * 15 + 12) + "px";

        particle.style.animationDuration =
            (Math.random() * 5 + 6) + "s";

        particle.style.setProperty(
            "--drift",
            (Math.random() * 160 - 80) + "px"
        );

        particlesContainer.appendChild(particle);

        setTimeout(function () {

            particle.remove();

        }, 12000);

    }

    setInterval(createParticle, 700);


    /* =================================================
       FLOWER BURST
    ================================================= */

    function createFlowerBurst() {

        if (!particlesContainer) {
            return;
        }

        const symbols = [
            "♡",
            "✿",
            "❀",
            "✧",
            "✦"
        ];

        for (let i = 0; i < 18; i++) {

            const flower = document.createElement("div");

            flower.innerHTML =
                symbols[Math.floor(Math.random() * symbols.length)];

            flower.style.position = "fixed";

            flower.style.left = "50%";

            flower.style.top = "50%";

            flower.style.zIndex = "999";

            flower.style.pointerEvents = "none";

            flower.style.color = "#f4b4d0";

            flower.style.fontSize =
                (Math.random() * 15 + 15) + "px";

            flower.style.textShadow =
                "0 0 15px rgba(255,180,220,0.8)";

            flower.style.transition =
                "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)";

            particlesContainer.appendChild(flower);

            const angle =
                (Math.PI * 2 / 18) * i;

            const distance =
                Math.random() * 180 + 100;

            const x =
                Math.cos(angle) * distance;

            const y =
                Math.sin(angle) * distance;

            requestAnimationFrame(function () {

                flower.style.transform =
                    "translate(" + x + "px, " + y + "px) rotate(360deg)";

                flower.style.opacity = "0";

            });

            setTimeout(function () {

                flower.remove();

            }, 1500);

        }

    }


    /* =================================================
       INITIAL SETUP
    ================================================= */

    goToSlide(0);

    console.log("For My Dearest ♡");
    console.log("Script berhasil dijalankan.");

});