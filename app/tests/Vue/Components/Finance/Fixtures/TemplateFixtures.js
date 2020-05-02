export default [
    {
        id: 1,
        title: "Default template",
        plannings: [
            {
                id: 1,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
                description: "Eintrag 1",
                totalAmount: -100,
                isNew: false,
            },
            {
                id: 2,
                costCenter: {
                    id: 1,
                    title: "Sparen"
                },
                description: "Eintrag 2",
                totalAmount: -100,
                isNew: false,
            }

        ]
    },
    {
        id: 2,
        title: "Another template",
        plannings: [
            {
                id: 1,
                costCenter: {
                    id: 1,
                    title: "Versicherung"
                },
                description: "Eintrag 2",
                totalAmount: -200,
                isNew: false,
            },
            {
                id: 2,
                costCenter: {
                    id: 1,
                    title: "Gehalt"
                },
                description: "Eintrag 4",
                totalAmount: 1000,
                isNew: false,
            }

        ]
    }
];
