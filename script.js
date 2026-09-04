document.addEventListener("DOMContentLoaded", () => {
    const showcase = document.getElementById('showcase');
    const carousel = document.getElementById('carousel');

    // l'idée : tant qu'on scroll DANS la section showcase, on fait tourner
    // le carousel au lieu de scroller la page normalement (scroll-jacking léger)
    window.addEventListener('scroll', () => {
        const sectionTop = showcase.offsetTop;
        const sectionScrollableHeight = showcase.offsetHeight - window.innerHeight;
        const scrollTop = window.scrollY;

        const scrolledInsideSection = scrollTop - sectionTop;

        if (scrolledInsideSection < 0) {
            // avant la section, carousel figé au début
            carousel.style.transform = `rotateY(0deg)`;
        } else if (scrolledInsideSection > sectionScrollableHeight) {
            // après la section, carousel figé à la fin (rotation max)
            carousel.style.transform = `rotateY(-300deg)`;
        } else {
            // dedans : on convertit la position de scroll en pourcentage
            // pour faire correspondre la rotation à l'avancement du scroll
            const progress = scrolledInsideSection / sectionScrollableHeight;
            const rotation = progress * 300;
            carousel.style.transform = `rotateY(${-rotation}deg)`;
        }
    });
});