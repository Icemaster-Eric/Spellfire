import init from "./frontend.js";
//import "/ui/menu.js";
import "/ui/eventPropogate.js";
import "/uiActionHandler.js";
document.getElementById("start").onclick =
    startGame;

document
    .getElementById("game")
    .addEventListener("resize", () => { });

async function startGame() {
    abc.remove();
    try {
        let startTime = Date.now();
        console.log("starting");
        await init();
        console.log(`init in ${((Date.now() - startTime) / 1000).toFixed(3)}s`);
    } catch (e) {
        console.error(e);
    }
}