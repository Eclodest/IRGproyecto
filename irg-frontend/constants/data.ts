export type Restaurante = {
    name: string;
    ranking: number;
    menu: string[];
};

export const restaurantsData: Record<string, Restaurante> = {
    "astor": {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
    },
    "el-rey-de-los-tacos": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
    },

    "astor2024": {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
    },
    "tacos2023": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
    },
};