<template>
    <div class="financial-overview">
        <div class="bank-balance">
            <span class="label">Kontostand:</span>
            <span class="amount positive">{{ accountingSum | toCurrency }}</span>
        </div>
        <hr >
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
                    <td class="text-right">{{ accountingIncome | toCurrency }}</td>
                    <td class="text-right">{{ accountingOutgoings | toCurrency }}</td>
                    <td class="text-right">{{ accountingSum | toCurrency }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">
                        Planung
                    </td>
                    <td class="text-right">{{ planningIncome | toCurrency }}</td>
                    <td class="text-right">{{ planningOutgoings | toCurrency }}</td>
                    <td class="text-right">{{ planningSum | toCurrency }}</td>
                </tr>
                <tr>
                    <td class="font-weight-bold">
                        Gesamt
                    </td>
                    <td class="text-right">{{ overallIncome | toCurrency }}</td>
                    <td class="text-right">{{ overallOutgoings | toCurrency }}</td>
                    <td class="text-right">{{ overallSum | toCurrency }}</td>
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
                    <th class="text-right">Summe</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, key) in topCostCenter"
                    :key="key"
                >
                    <td>{{ item.title }}</td>
                    <td class="text-right">{{ item.amount | toCurrency }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "OverviewVue",
    filters: {
        toCurrency (value) {
            if (typeof value !== "number") {
                return value;
            }
            var formatter = new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2
            });
            return formatter.format(value);
        }

    },
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
                    sum+=parseFloat(totalAmount);
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
                    sum+=parseFloat(totalAmount);
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
                    sum+=parseFloat(totalAmount);
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
        },
        topCostCenter() {
            let accIndex = 0;
            let topCostCenters = [];

            for (accIndex = 0; accIndex < this.accountingItems.length; accIndex++){
                let accountingItem = this.accountingItems[accIndex];
                let accConnectedIndex = 0;
                for (accConnectedIndex = 0; accConnectedIndex < accountingItem.connectedPlanning.length; accConnectedIndex++){
                    let connectedItem = accountingItem.connectedPlanning[accConnectedIndex];
                    let costCenterItem = connectedItem.costCenter;
                    let value = connectedItem.totalAmount;

                    if (value < 0){
                        value = value *-1;
                    }

                    let existingCostCenterItem = topCostCenters.find(costCenter => costCenter.id === costCenterItem.id );
                    if (!existingCostCenterItem){
                        topCostCenters.push({
                            title: costCenterItem.title,
                            amount: parseFloat(connectedItem.totalAmount),
                            value: parseFloat(value),
                            id: costCenterItem.id
                        });
                    }else{
                        existingCostCenterItem.amount += parseFloat(connectedItem.totalAmount);
                        existingCostCenterItem.value += parseFloat(value);
                    }
                }
            }

            topCostCenters = _.sortBy(topCostCenters, "value").reverse();
            return topCostCenters;
        }
    }
};
</script>

<style scoped>

</style>
