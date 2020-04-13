<template>
    <div class="financial-overview">
        <div class="bank-balance">
            <span class="label">Kontostand:</span>
            <span class="amount positive">{{ accountingSum | toCurrency }}</span>
        </div>
        <table
            id="currentAmountTable"
            class="table table-sm mt-3"
        >
            <thead>
                <tr>
                    <th class="text-right"></th>
                    <th class="text-right">
                        Einnahmen
                    </th>
                    <th class="text-right">
                        Ausgaben
                    </th>
                    <th class="text-right">
                        Summe
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="font-weight-bold">
                        Umsätze
                    </td>
                    <td class="text-right">
                        {{ accountingIncome | toCurrency }}
                    </td>
                    <td class="text-right">
                        {{ accountingOutgoings | toCurrency }}
                    </td>
                    <td class="text-right">
                        {{ accountingSum | toCurrency }}
                    </td>
                </tr>
                <tr>
                    <td class="font-weight-bold">
                        Planung
                    </td>
                    <td class="text-right">
                        {{ planningIncome | toCurrency }}
                    </td>
                    <td class="text-right">
                        {{ planningOutgoings | toCurrency }}
                    </td>
                    <td class="text-right">
                        {{ planningSum | toCurrency }}
                    </td>
                </tr>
                <tr>
                    <td class="font-weight-bold">
                        Gesamt
                    </td>
                    <td class="text-right">
                        {{ overallIncome | toCurrency }}
                    </td>
                    <td class="text-right">
                        {{ overallOutgoings | toCurrency }}
                    </td>
                    <td class="text-right">
                        {{ overallSum | toCurrency }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div
            v-if="topOutgoingCostCenter.length > 0"
            id="top-outgoing"
        >
            <h3>Ausgaben</h3>
            <table
                class="table table-sm"
            >
                <thead>
                    <tr>
                        <th>Kostenstelle</th>
                        <th class="text-right">
                            Summe
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, key) in topOutgoingCostCenter"
                        :key="key"
                    >
                        <td>
                            <span
                                class="filter fas fa-filter"
                                :class="isActive(item)"
                                @click="toggleFilter(item)"
                            ></span>
                            {{ item.title }}
                        </td>
                        <td class="text-right">
                            {{ item.amount | toCurrency }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            v-if="topIncomeCostCenter.length > 0"
            id="top-income"
        >
            <h3>Einnahmen</h3>
            <table
                class="table table-sm"
            >
                <thead>
                    <tr>
                        <th>Kostenstelle</th>
                        <th class="text-right">
                            Summe
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, key) in topIncomeCostCenter"
                        :key="key"
                    >
                        <td>
                            <span
                                class="filter fas fa-filter"
                                :class="isActive(item)"
                                @click="toggleFilter(item)"
                            ></span>
                            {{ item.title }}
                        </td>

                        <td class="text-right">
                            {{ item.amount | toCurrency }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
    data() {
        return {
            costCenterFilter: []
        };
    },
    computed: {
        accountingIncome() {
            let i=0;
            let sum=0;

            for (i=0; i < this.accountingItems.length; i ++) {
                let totalAmount = this.accountingItems[i].totalAmount;
                if (totalAmount > 0){
                    sum+=parseFloat(totalAmount);
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
            return parseFloat(this.planningIncome) + parseFloat(this.planningOutgoings);
        },
        overallIncome() {
            return parseFloat(this.accountingIncome) + parseFloat(this.planningIncome);
        },
        overallOutgoings() {
            return parseFloat(this.accountingOutgoings) + parseFloat(this.planningOutgoings);
        },
        overallSum() {
            return parseFloat(this.accountingSum) + parseFloat(this.planningSum);
        },
        topIncomeCostCenter() {
            return this.topCostCenter().filter(item => {return item.amount > 0; });
        },
        topOutgoingCostCenter() {
            return this.topCostCenter().filter(item => {return item.amount < 0; });
        },
    },
    methods: {
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
        },
        toggleFilter(toggleItem){
            const index = this.costCenterFilter.findIndex((item) => { return toggleItem.id === item.id; });
            if (index > -1){
                this.costCenterFilter.splice(index, 1);
            }else{
                const newFilterItem = {
                    id: toggleItem.id,
                    title: toggleItem.title
                };
                this.costCenterFilter.push(newFilterItem);
            }

            this.$emit("filterChanged", this.costCenterFilter);
        },
        isActive(checkItem){
            const index = this.costCenterFilter.findIndex((item) => { return checkItem.id === item.id; });
            if (index > -1){
                return "active";
            }else{
                return "inactive";
            }
        }
    }
};
</script>

<style scoped>
    .filter {
        cursor: pointer;
        margin-right: 1em;
    }
    .inactive {
        color: #E9ECEF;
    }

    .inactive:hover {
        color: #212529;
    }
</style>
