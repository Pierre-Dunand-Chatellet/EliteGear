document.addEventListener("DOMContentLoaded", () => {
    const showcase = document.getElementById('showcase');
    const carousel = document.getElementById('carousel');

    window.addEventListener('scroll', () => {
        const sectionTop = showcase.offsetTop;
        const sectionScrollableHeight = showcase.offsetHeight - window.innerHeight;
        const scrollTop = window.scrollY;

        const scrolledInsideSection = scrollTop - sectionTop;

        if (scrolledInsideSection < 0) {
            carousel.style.transform = `rotateY(0deg)`;
        } else if (scrolledInsideSection > sectionScrollableHeight) {
            carousel.style.transform = `rotateY(-300deg)`;
        } else {
            const progress = scrolledInsideSection / sectionScrollableHeight;
            const rotation = progress * 300;
            carousel.style.transform = `rotateY(${-rotation}deg)`;
        }
    });
});