/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            karla: ["Karla", "sans-serif"],
            monoton: ["Monoton", "cursive"],
        },
        colors: {
            RR: "#ea1a85",
            RCB: "#0a0a0a",
            GT: "#0b4973",
            LSG: "#a6144f",
            SRH: "#f26522",
            PBKS: "#84171b",
            MI: "#003b7a",
            DC: "#0078bc",
            CSK: "#f4ad00",
            KKR: "#552792",
        },

        extend: {
            backgroundImage: {
                "gradient-radial":
                    "radial-gradient(21rem, #93284a, transparent 50%)",
                "gradient-radial-md":
                    "radial-gradient(36rem, #93284a, transparent 50%)",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
