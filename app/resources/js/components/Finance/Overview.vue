<template>
    <div class="financial-overview">
        <h3>Umsätze</h3>
        <table
            id="currentAmountTable"
            class="table table-sm"
        >
            <thead>
                <tr>
                    <th></th>
                    <th>Einnahmen</th>
                    <th>Ausgaben</th>
                    <th>Summe</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="font-weight-bold">
                        Aktuell
                    </td>
                    <td>{{ accountingIncome }}</td>
                    <td>{{ accountingOutgoings }}</td>
                    <td>{{ accountingSum }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">
                        Planung
                    </td>
                    <td>{{ planningIncome }}</td>
                    <td>{{ planningOutgoings }}</td>
                    <td>{{ planningSum }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">
                        Gesamt
                    </td>
                    <td>{{ overallIncome }}</td>
                    <td>{{ overallOutgoings }}</td>
                    <td>{{ overallSum }}</td>
                </tr>
            </tbody>
        </table>

        <h3>Kostenstellen</h3>
        <table
            id="expensiveCostCenter"
            class="table table-sm"
        >
            <thead>
                <tr>
                    <th>Kostenstelle</th>
                    <th>Summe</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>!!!Nicht zugeordnet!!!</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>Einkaufen</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>Sparbuch</td>
                    <td>500</td>
                </tr>
                <tr>
                    <td>Tanken</td>
                    <td>100</td>
                </tr>
                <tr>
                    <td>Elektronik</td>
                    <td>300</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "OverviewVue",
    props: {
        planningItems: {
            type: Array,
            required: true,
            default() {
                return [
                    {
                        id: 1,
                        costCenter: {
                            id: 1,
                            title: "Einkaufen"
                        },
                        description: "Gesamter Monat",
                        totalAmount: -100,
                        date: "25.10.2019",
                    }
                ];
            }
        },
        accountingItems: {
            type: Array,
            required: true,
            default() {
                return  [
                    {
                        id: 1,
                        title: "Westdeutsche Lotterie GmbH & Co. OHG westlotto.de",
                        totalAmount: 100,
                        remainingAmount: 0,
                        date: "12.10.2019",
                        display: true,
                        connectedPlanning: [
                            {
                                id: 10,
                                totalAmount: -100,
                                costCenter: {
                                    id: 6,
                                    title: "Lotto"
                                },
                                description: "Regeömäßiger Spielschein",
                            },
                        ],
                    }
                ];
            }
        }
    },
    computed: {
        accountingIncome() {
            let i=0;
            let sum=0;

            for (i=0; i < this.accountingItems.length; i ++) {
                let totalAmount = this.accountingItems[i].totalAmount;
                if (totalAmount > 0){
                    sum+=totalAmount;
                }
            }
            return sum;
        },
        accountingOutgoings() {
            let i=0;
            let sum=0;

            for (i=0; i < this.accountingItems.length; i ++) {
                let totalAmount = this.accountingItems[i].totalAmount;
                if (totalAmount < 0){
                    sum+=totalAmount;
                }
            }
            return sum;
        },
        accountingSum() {
            return this.accountingIncome + this.accountingOutgoings;
        },
        planningIncome() {
            let i=0;
            let sum=0;

            for (i=0; i < this.planningItems.length; i ++) {
                let totalAmount = this.planningItems[i].totalAmount;
                if (totalAmount > 0){
                    sum+=totalAmount;
                }
            }
            return sum;
        },
        planningOutgoings() {
            let i=0;
            let sum=0;

            for (i=0; i < this.planningItems.length; i ++) {
                let totalAmount = this.planningItems[i].totalAmount;
                if (totalAmount < 0){
                    sum+=totalAmount;
                }
            }
            return sum;
        },
        planningSum() {
            return this.planningIncome + this.planningOutgoings;
        },
        overallIncome() {
            return this.accountingIncome + this.planningIncome;
        },
        overallOutgoings() {
            return this.accountingOutgoings + this.planningOutgoings;
        },
        overallSum() {
            return this.accountingSum + this.planningSum;
        }
    }
};
</script>

<style scoped>

</style>
