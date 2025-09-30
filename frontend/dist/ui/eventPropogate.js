
const gameCanvas = document.getElementById("game");
['pointerdown', 'pointerup', "keydown", "keyup"].forEach(evtName => {
    gameCanvas.addEventListener(evtName, console.log);
    document.addEventListener(evtName, e => {
        if (e.__a) return;
        const newEvt = new e.constructor(evtName, e);
        newEvt.__a = true;
        console.log("got ev")
        gameCanvas.dispatchEvent(newEvt);
    });
});