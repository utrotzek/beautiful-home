import {mount} from "@vue/test-utils";
import Vue from "vue";
import Overview from "../../../../resources/js/components/Finance/Overview";
import filters from "../../../../resources/js/filters";
Vue.use(filters);

import AccountingFixtures from "./Fixtures/AccountingFixtures";
import PlanningFixtures from "./Fixtures/PlanningFixtures";

describe("Overview", () => {
    let wrapper = null;
    const planningItems = PlanningFixtures;
    const accountingItems = AccountingFixtures;

    beforeEach(() => {
        wrapper = mount(Overview,{
            propsData: {
                accountingItems: accountingItems,
                planningItems: planningItems
            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });


    it ("calculates accountingIncome correctly", () => {
        expect(wrapper.vm.accountingIncome).toBe(1100.0);
    });

    it ("calculates accountingOutgoings correctly", () => {
        expect(wrapper.vm.accountingOutgoings).toBe(-150.0);
    });

    it ("calculates accountingSum correctly", () => {
        expect(wrapper.vm.accountingSum).toBe(950.0);
    });

    it ("calculates planningIncome correctly", () => {
        expect(wrapper.vm.planningIncome).toBe(1100.0);
    });

    it ("calculates planningOutgoings correctly", () => {
        expect(wrapper.vm.planningOutgoings).toBe(-250.0);
    });

    it ("calculates planningSum correctly", () => {
        expect(wrapper.vm.planningSum).toBe(850.0);
    });

    it ("calculates overallIncome correctly", () => {
        expect(wrapper.vm.overallIncome).toBe(2200.0);
    });

    it ("calculates overallOutgoings correctly", () => {
        expect(wrapper.vm.overallOutgoings).toBe(-400.0);
    });

    it ("calculates overallSum correctly", () => {
        expect(wrapper.vm.overallSum).toBe(1800.0);
    });

    it ("calculates topIncomeCostCenter correctly", () => {
        const expectedIncomeArray = [
            {
                title: "Gehalt",
                amount: 700,
                value: 700,
                id: 10
            },
            {
                title: "Lotto",
                amount: 400,
                value: 400,
                id: 11
            }
        ];
        expect(wrapper.vm.topIncomeCostCenter).toEqual(expectedIncomeArray);
    });

    it ("calculates topOutgoingCostCenter correctly", () => {
        const expectedIncomeArray = [
            {
                title: "Einkaufen",
                amount: -90,
                value: 90,
                id: 1
            },
            {
                title: "Sonstiges",
                amount: -60,
                value: 60,
                id: 3
            }
        ];
        expect(wrapper.vm.topOutgoingCostCenter).toEqual(expectedIncomeArray);
    });

    it ("can filter cost centers", () => {
        wrapper.find("#top-outgoing tr:nth-child(1) .filter").trigger("click");

        const expectedOneFilter = [
            {
                id: 1,
                title: "Einkaufen"
            },
        ];
        expect(wrapper.emitted().filterChanged[0]).toEqual([expectedOneFilter]);

        wrapper.find("#top-outgoing tr:nth-child(2) .filter").trigger("click");

        const expectedTwoFilter = [
            {
                id: 1,
                title: "Einkaufen"
            },
            {
                id: 3,
                title: "Sonstiges"
            },
        ];
        expect(wrapper.emitted().filterChanged[1]).toEqual([expectedTwoFilter]);
    });

    it ("can unfilter cost centers", () => {
        wrapper.find("#top-outgoing tr:nth-child(1) .filter").trigger("click");
        wrapper.find("#top-outgoing tr:nth-child(2) .filter").trigger("click");
        wrapper.find("#top-outgoing tr:nth-child(1) .filter").trigger("click");
        wrapper.find("#top-outgoing tr:nth-child(2) .filter").trigger("click");

        const expectedNoFilter = [];
        expect(wrapper.emitted().filterChanged[0]).toEqual([expectedNoFilter]);
    });
});
