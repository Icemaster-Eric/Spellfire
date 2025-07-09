import { defineConfig } from "vite";

export default defineConfig({
    server: {
        allowedHosts: [
            "spellfire-frontend.hutao.rip",
            "spellfire.online",
            "spellfire.io",
        ],
    },
});
