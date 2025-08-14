import init from "./frontend.js";
import "/ui/inventory.js";
document.getElementById("start-screen-play-btn").onclick =
    startGame;
document
    .getElementById("game")
    .addEventListener("resize", () => { });
async function startGame() {
    document.getElementById("start-screen").inert = true;
    document.getElementById("start-screen").remove();

    try {
        let startTime = Date.now();
        console.log("starting");
        await init();
        console.log(`init in ${((Date.now() - startTime) / 1000).toFixed(3)}s`);
    } catch (e) {
        console.error(e);
    }
}