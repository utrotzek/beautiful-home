import "../Mocks/MatchMedia.mock";
import _ from "lodash";
import {mount} from "@vue/test-utils";
import PlanningElement from "../../../../resources/js/components/Finance/PlanningElement";
import Vue from "vue";
import Vuelidate from "vuelidate";
import filters from "../../../../resources/js/filters";
import VCalendar from "v-calendar";
import PlanningDataFixtures from "./Fixtures/PlanningFixtures";
import CostCenterFixtures from "./Fixtures/CostCenterFixtures";

Vue.use(filters);
Vue.use(Vuelidate);
Vue.use(VCalendar);

describe("PlanningElement", () => {
    let wrapper = null;
    let planningData = null;

    beforeEach(() => {
        planningData = _.clone(PlanningDataFixtures[0]);
        wrapper = mount(PlanningElement,{
            propsData: {
                year: 3000,
                month: 1,
                planningItem: planningData,
                isConnected: false,
                hasDate: true,
                editMode: false,
                costCenterData: CostCenterFixtures,
                allowConnection: true

            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("renders negative/positive class propery", () => {
        wrapper.setData(
            {
                localPlanningItem: {
                    totalAmount: -100
                }
            }
        );
        expect(wrapper.vm.negativePostiveClass).toEqual({negative: true, positive: false});

        wrapper.setData(
            {
                localPlanningItem: {
                    totalAmount: 100
                }
            }
        );
        expect(wrapper.vm.negativePostiveClass).toEqual({negative: false, positive: true});
    });

    it ("calculates start date properly", () => {
        const expectedDate = "1.1.3000";
        const date = wrapper.vm.startDate;
        const actualDate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
        expect(actualDate).toEqual(expectedDate);
    });

    it ("calculates end date properly", () => {
        const expectedDate = "31.1.3000";
        const date = wrapper.vm.endDate;
        const actualDate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
        expect(actualDate).toEqual(expectedDate);
    });

    it ("will set total amount to an empty value if the value is set to zero",async () =>{
        wrapper.vm.localPlanningItem.totalAmount = "0";
        await Vue.nextTick();
        expect(wrapper.vm.localPlanningItem.totalAmount).toEqual("");
    });
    //TODO: test validation

    it ("Can display and close the button overlay", async () => {
        //expect overlay is closed initially
        expect(wrapper.find(".overlay").exists()).toBeFalsy();

        //open overlay
        wrapper.find(".show-overlay-button").trigger("click");
        await Vue.nextTick();
        expect(wrapper.find(".overlay").exists()).toBeTruthy();

        //close overlay
        wrapper.find(".overlay .close").trigger("click");
        await Vue.nextTick();

        const expectedId = planningData.id;
        expect(wrapper.emitted().close[0]).toEqual([expectedId]);
        expect(wrapper.find(".overlay").exists()).toBeFalsy();
    });

    it ("Can fire delete event", async () => {
        wrapper.vm.displayOverlay = true;
        await Vue.nextTick();

        wrapper.find(".overlay .delete").trigger("click");
        expectDeletion();
    });

    it ("Can fire connect event", async () => {
        wrapper.vm.displayOverlay = true;
        await Vue.nextTick();

        wrapper.find(".overlay .connect").trigger("click");

        const expectedId = planningData.id;
        expect(wrapper.emitted().connect[0]).toEqual([expectedId]);
    });

    it ("Edit mode can be enabled", async () => {
        wrapper.vm.displayOverlay = true;
        await Vue.nextTick();

        wrapper.find(".overlay .edit").trigger("click");
        expect(wrapper.vm.localEditMode).toBeTruthy();
    });

    it ("deletes new item on cancellation", async () => {
        wrapper.vm.localPlanningItem.isNew = true;
        wrapper.vm.displayOverlay = true;
        wrapper.vm.localEditMode = true;
        await Vue.nextTick();

        wrapper.find(".overlay .cancel").trigger("click");
        await Vue.nextTick();
        expectDeletion();
    });

    it ("resets existing item to initial values on cancellation", async () => {
        //initialize data and store original values
        planningData.isNew = false;
        const originalPlanningData = _.clone(planningData);
        wrapper.vm.localEditMode = true;
        await Vue.nextTick();

        //manipulate data
        wrapper.vm.localPlanningItem.totalAmount = 3000;
        wrapper.vm.localPlanningItem.description = "My new descrpition";
        wrapper.vm.displayOverlay = true;
        await Vue.nextTick();

        //click on "cancel" and expect values have been restored to original values
        wrapper.find(".overlay .cancel").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.localPlanningItem).toStrictEqual(originalPlanningData);
    });

    it ("Will save and fires event", async () => {
        wrapper.vm.localEditMode = true;
        wrapper.vm.displayOverlay = true;
        await Vue.nextTick();

        //click an "cancel" and expect values have been restored to original values
        wrapper.find(".overlay .save").trigger("click");
        await Vue.nextTick();

        expect(wrapper.vm.localEditMode).toBeFalsy();
        expect(wrapper.vm.displayOverlay).toBeFalsy();
        expect(wrapper.emitted().save[0]).toEqual([planningData]);
    });

    it ("can update cost centers", async() => {
        wrapper.vm.costCenterUpdate(CostCenterFixtures[2]);
        expect(wrapper.vm.localPlanningItem.costCenter).toEqual(CostCenterFixtures[2]);
    });

    function expectDeletion() {
        const expectedId = planningData.id;
        expect(wrapper.emitted().delete[0]).toEqual([expectedId]);
    }
});
