import "./style.css";
import "./startScreen";
import { getTokenFromDiscordSdk } from "./auth/discordActivities";

if (+import.meta.env.VITE_IS_DISCORD_ACTIVITY_BUILD) {
    getTokenFromDiscordSdk();
} else {
}
