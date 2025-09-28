/*
const gameCanvas = document.getElementById("game");
['pointerdown', 'pointerup', "keydown", "keyup"].forEach(evtName => {
    document.addEventListener(evtName, e => {
        if (e.__a) return;
        const newEvt = new e.constructor(evtName, e);
        newEvt.__a = true
        gameCanvas.dispatchEvent(newEvt);
    });
});*/