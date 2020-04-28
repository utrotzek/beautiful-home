import {mount} from "@vue/test-utils";
import connectionModals from "../../../../../resources/js/components/Finance/Modals/ConnectionModal";
import Vue from "vue";

import PlanningDataFixtures from "../Fixtures/PlanningFixtures";
import AccountingFixtures from "../Fixtures/AccountingFixtures";

describe("accounting and planning connection modal", () => {
    let wrapper = null;
    let planningData = PlanningDataFixtures[0];
    let accountingData = AccountingFixtures[0];
    accountingData.remainingAmount = -100;

    beforeEach(() => {
        wrapper = mount(connectionModals,{
            propsData: {
                accounting: accountingData,
                planning: planningData,
                show: true,
                desiredAmount: -100
            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("can fire close event", async () =>{
        wrapper.find(".close").trigger("click");
        await Vue.nextTick();
        expect(wrapper.emitted().close).toBeTruthy();
    });

    it ("can fire do connection event", async () =>{
        wrapper.vm.localDesiredAmount = -50;
        wrapper.find(".do-connection").trigger("click");
        await Vue.nextTick();

        expect(wrapper.emitted().doAccountingPlanningConnection[0]).toEqual([
            planningData,
            accountingData,
            -50
        ]);
    });

    it ("desired amount can be set to full remaining amount", async () =>{
        wrapper.vm.localDesiredAmount = -50;
        wrapper.find(".use-full-amount").trigger("click");
        await Vue.nextTick();

        expect(wrapper.vm.localDesiredAmount).toEqual(-100);
    });

    it ("local desired amount will be in sync with desired amount", async () =>{
        wrapper.setProps({desiredAmount: 100});
        await Vue.nextTick();
        expect(wrapper.vm.localDesiredAmount).toEqual(100);

        wrapper.setProps({desiredAmount: -120});
        await Vue.nextTick();
        expect(wrapper.vm.localDesiredAmount).toEqual(-120);

    });
});
