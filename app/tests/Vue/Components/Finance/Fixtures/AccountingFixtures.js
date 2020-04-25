export default [
    {
        id: 1,
        title: "Rewe",
        totalAmount: -100,
        remainingAmount: 0,
        editMode: false,
        date: "01.01.3000",
        connectedPlanning: [
            {
                id: 100,
                totalAmount: -40,
                editMode: false,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
            },
            {
                id: 105,
                totalAmount: -60,
                editMode: false,
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
        remainingAmount: 0,
        editMode: false,
        date: "02.01.3000",
        connectedPlanning: [
            {
                id: 101,
                totalAmount: -25,
                editMode: false,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
            },
            {
                id: 102,
                totalAmount: -25,
                editMode: false,
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
        remainingAmount: 0,
        editMode: false,
        date: "03.01.3000",
        connectedPlanning: [
            {
                id: 110,
                totalAmount: 600,
                editMode: false,
                costCenter: {
                    id: 10,
                    title: "Gehalt"
                },
            },
            {
                id: 111,
                totalAmount: 400,
                editMode: false,
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
        remainingAmount: 0,
        editMode: false,
        date: "04.01.3000",
        connectedPlanning: [
            {
                id: 110,
                totalAmount: 100,
                editMode: false,
                costCenter: {
                    id: 10,
                    title: "Gehalt"
                },
            }
        ],
    }
];
