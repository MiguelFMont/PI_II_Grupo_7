document.querySelector("body").addEventListener("mousemove", eyeCircle);

function eyeCircle() {
    let pupils = document.querySelectorAll(".pupil");
    
    pupils.forEach((pupil) => {
        let react = pupil.getBoundingClientRect();
        let x = react.left + pupil.clientWidth / 2;
        let y = react.top + pupil.clientHeight / 2;

        let rad = Math.atan2(event.pageY - y, event.pageX - x);

        let move = 3;

        let moveX = Math.cos(rad) * move;
        let moveY = Math.sin(rad) * move;

        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    })
}