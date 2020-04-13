export default [
    {
        id: 1,
        title: "Rewe",
        totalAmount: -100,
        connectedPlanning: [
            {
                id: 100,
                totalAmount: -40,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
            },
            {
                id: 105,
                totalAmount: -60,
                costCenter: {
                    id: 3,
                    title: "Sonstiges"
                },
            },
        ],
    },
    {
        id: 2,
        title: "Edeka",
        totalAmount: -50,
        connectedPlanning: [
            {
                id: 101,
                totalAmount: -25,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
            },
            {
                id: 102,
                totalAmount: -25,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
            }
        ],
    },
    {
        id: 3,
        title: "Einnahme",
        totalAmount: 1000,
        connectedPlanning: [
            {
                id: 110,
                totalAmount: 600,
                costCenter: {
                    id: 10,
                    title: "Gehalt"
                },
            },
            {
                id: 111,
                totalAmount: 400,
                costCenter: {
                    id: 11,
                    title: "Lotto"
                },
            }
        ],
    },
    {
        id: 4,
        title: "Einnahme 2",
        totalAmount: 100,
        connectedPlanning: [
            {
                id: 110,
                totalAmount: 100,
                costCenter: {
                    id: 10,
                    title: "Gehalt"
                },
            }
        ],
    }
];
