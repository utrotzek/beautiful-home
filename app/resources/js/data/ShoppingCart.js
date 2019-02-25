export default [
    {
        count: 3,
        recipe: {
            id: 1,
            title: "Gulasch Eintopf",
            rating: 4,
            image_src: '/storage/testimages/recipe_1.jpg',
            preparationTime: '20 Minuten',
            calorie: 200,
            nutrient: {
                fat: 10,
                protein: 30,
                carbohydrates: 40
            }
        },
        ingredients: [
            {
                id: 1,
                title: "Mehl",
                group: {
                    id: 1,
                    title: 'Getreideprodukte'
                },
                unit: {
                    id: 1,
                    title: 'Messerspitze',
                    abbreviation: 'Msp'
                },
                count: 1.5
            },
            {
                id: 1,
                title: "Passierte Tomaten",
                group: {
                    id: 3,
                    title: 'Tomatenprodukte'
                },
                unit: {
                    id: 1,
                    title: 'Gramm',
                    abbreviation: 'g'
                },
                count: 500
            }
        ]
    }
]