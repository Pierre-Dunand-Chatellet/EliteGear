document.addEventListener("DOMContentLoaded", () => {
    const showcase = document.getElementById('showcase');
    const carousel = document.getElementById('carousel');

    if (!showcase || !carousel) return;

    // Nombre de cartes lu dans le DOM : si on en ajoute ou en retire une,
    // rien d'autre n'est a changer ici.
    const cardCount = carousel.children.length;
    const step = 360 / cardCount;              // 60deg pour 6 cartes
    const lastIndex = cardCount - 1;

    // l'idée : tant qu'on scroll DANS la section showcase, on fait tourner
    // le carousel au lieu de scroller la page normalement (scroll-jacking léger)
    function update() {
        const sectionTop = showcase.offsetTop;
        const sectionScrollableHeight = showcase.offsetHeight - window.innerHeight;
        const scrolledInsideSection = window.scrollY - sectionTop;

        let index;
        if (scrolledInsideSection < 0) {
            // avant la section, carousel figé sur la première carte
            index = 0;
        } else if (scrolledInsideSection > sectionScrollableHeight) {
            // après la section, carousel figé sur la dernière
            index = lastIndex;
        } else {
            // dedans : on convertit la position de scroll en pourcentage, puis
            // on arrondit à la carte la plus proche. Sans cet arrondi la
            // rotation s'arrêtait entre deux cartes : aucune n'était alors
            // centrée et un trou apparaissait au milieu de l'écran.
            const progress = scrolledInsideSection / sectionScrollableHeight;
            index = Math.round(progress * lastIndex);
        }

        carousel.style.transform = `rotateY(${-index * step}deg)`;
    }

    // rAF : le scroll peut se déclencher des dizaines de fois par seconde,
    // inutile de recalculer plus souvent qu'un rafraîchissement d'écran
    let pending = false;
    window.addEventListener('scroll', () => {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
            pending = false;
            update();
        });
    });

    window.addEventListener('resize', update);
    update();
});
