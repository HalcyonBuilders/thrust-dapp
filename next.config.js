/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
        DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
        NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/**",
            },
        ],
    },
};

module.exports = nextConfig;
