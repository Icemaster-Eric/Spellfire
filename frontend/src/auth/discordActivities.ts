import { DiscordSDK } from "@discord/embedded-app-sdk";

export async function getTokenFromDiscordSdk() {
    const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    await discordSdk.ready();
    const { code } = await discordSdk.commands.authorize({
        client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
        response_type: "code",
        state: "",
        prompt: "none",
        scope: ["identify", "guilds", "applications.commands"],
    });
    console.log("code: ", code);
    const response = await fetch("/.proxy/backend/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            code,
        }),
    });
    const access_token = await response.text();
    console.log("access token:", access_token);
    // Authenticate with Discord client (using the access_token)
    let auth = await discordSdk.commands.authenticate({
        access_token,
    });
    console.log(auth);
}
