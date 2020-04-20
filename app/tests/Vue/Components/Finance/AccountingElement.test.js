import "../Mocks/MatchMedia.mock";
import _ from "lodash";
import {mount} from "@vue/test-utils";
import AccountingElement from "../../../../resources/js/components/Finance/AccountingElement";
import Vue from "vue";
import Vuelidate from "vuelidate";
import filters from "../../../../resources/js/filters";
import { vueTopprogress } from "vue-top-progress";
import VCalendar from "v-calendar";
import AccountingFixtures from "./Fixtures/AccountingFixtures";
import moment from "moment";

Vue.component("Progressbar", vueTopprogress);
Vue.use(filters);
Vue.use(Vuelidate);
Vue.use(VCalendar);

describe("Accounting element", () => {
    let wrapper = null;
    let accountingData = null;

    beforeEach(() => {
        //TODO: fix this
        //clone is a workaround because the component is unfortunately manipulating the properties
        //directly (which is wrong)
        accountingData = _.cloneDeep(AccountingFixtures[0]);

        wrapper = mount(AccountingElement,{
            propsData: {
                year: 3000,
                month: 1,
                showConnectTarget: false,
                accountingData: accountingData
            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("renders properly in edit mode", async () => {
        await enableEditMode();
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("will have empty input field instead of 0 if the amount becomes zero", async () => {
        wrapper.vm.localAccountingData.totalAmount = "0";
        await enableEditMode();
        expect(wrapper.find(".amount input").element.value).toEqual("");
    });

    it("remaining amount will be synced with total amount as long it is a new item", async () => {
        wrapper.vm.localAccountingData.isNew = true;

        await enableEditMode();
        wrapper.vm.localAccountingData.totalAmount = -300.40;
        await Vue.nextTick();
        expect(wrapper.vm.localAccountingData.remainingAmount).toEqual(-300.40);

        wrapper.vm.localAccountingData.totalAmount = -400.20;
        await Vue.nextTick();
        expect(wrapper.vm.localAccountingData.remainingAmount).toEqual(-400.20);

    });

    it ("can switch to edit mode", async () => {
        expect(wrapper.vm.localAccountingData.editMode).toBeFalsy();

        wrapper.find(".action-buttons .edit").trigger("click");
        await Vue.nextTick();

        expect(wrapper.vm.localAccountingData.editMode).toBeTruthy();
    });

    it ("will fire delete event when delete button was clicked", async () => {
        wrapper.find(".action-buttons .delete").trigger("click");
        await Vue.nextTick();
        expect(wrapper.emitted().deleteAccounting[0]).toEqual([accountingData]);
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

    it ("will validate totalAmount properly", async() => {
        await enableEditMode();
        const amountSelector = ".remaining-amount input";

        //set form data
        wrapper.find(amountSelector).setValue("");
        await Vue.nextTick();

        //assertions
        expect(wrapper.find(amountSelector).classes()).toContain("is-invalid");
        expect(wrapper.find(".save").attributes("disabled")).toEqual("disabled");
    });

    it ("will validate title properly", async() => {
        await enableEditMode();
        const titleSelector = ".accounting-title textarea";

        //set form data
        wrapper.find(titleSelector).setValue("");
        await Vue.nextTick();

        //assertions
        expect(wrapper.find(titleSelector).classes()).toContain("is-invalid");
        expect(wrapper.find(".save").attributes("disabled")).toEqual("disabled");
    });

    it ("will fire event when connection target was clicked", async () => {
        wrapper.setProps({showConnectTarget: true});
        await Vue.nextTick();

        wrapper.find(".connectTarget").trigger("click");
        await Vue.nextTick();

        expect(wrapper.emitted().doConnection[0]).toEqual([accountingData.id]);
    });

    it ("will fire event when connected planning was deleted", async  () =>{
        const connectedPlanningToDelete = accountingData.connectedPlanning[0];
        wrapper.vm.deletePlanning(connectedPlanningToDelete.id);
        expect(wrapper.emitted().deleteConnection[0]).toEqual(
            [
                accountingData.id,
                connectedPlanningToDelete
            ]
        );
    });

    it ("will fire event when connected planning was updated", async () => {
        let updatedConnectedPlanning = accountingData.connectedPlanning[0];
        let expectedUpdatedItem = _.cloneDeep(updatedConnectedPlanning);

        updatedConnectedPlanning.editMode = true;
        wrapper.vm.saveEditPlanning(updatedConnectedPlanning);

        expect(wrapper.emitted().updateConnectedPlanning[0]).toEqual(
            [
                expectedUpdatedItem,
                accountingData.id
            ]
        );
    });

    it ("can toggle edit mode for connected planning", async () => {
        const connectedPlanningToDelete = accountingData.connectedPlanning[0];

        wrapper.vm.editPlanning(connectedPlanningToDelete.id, true);
        expect(connectedPlanningToDelete.editMode).toBeTruthy();

        wrapper.vm.editPlanning(connectedPlanningToDelete.id, false);
        expect(connectedPlanningToDelete.editMode).toBeFalsy();
    });

    it ("wont fire event when form is invalid", () => {
        accountingData.title = "";
        wrapper.vm.save();
        expect(wrapper.emitted().updateData).toBeFalsy();
    });

    it ("can be edited", async () => {
        await enableEditMode();

        wrapper.vm.date = moment("03.03.3000", "DD.MM.YYYY").toDate();
        await wrapper.vm.$nextTick();

        wrapper.find(".save").trigger("click");
        await wrapper.vm.$nextTick();

        const expectedDate = moment("03.03.3000", "DD.MM.YYYY").toDate();
        const expectedData =  {
            id: 1,
            title: "Rewe",
            totalAmount: -100,
            remainingAmount: 0,
            editMode: false,
            date: expectedDate,
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
        };
        expect(wrapper.emitted().updateData[0]).toEqual([expectedData]);
    });

    it ("will fire delete event if cancel was clicked and accounting is new", async () => {
        accountingData.isNew = true;
        wrapper.vm.cancel();
        expect(wrapper.emitted().deleteAccounting[0]).toEqual([accountingData]);
    });

    it ("will restore original data when cancel was clicked", async () => {
        const originalAccountingData = _.clone(accountingData);
        accountingData.title = "my changed title";
        accountingData.totalAmount = "-300";
        accountingData.date = moment("03.03.2003", "DD.MM.YYYY").toDate();
        wrapper.vm.cancel();
        expect(accountingData).toEqual(originalAccountingData);
    });

    async function enableEditMode(){
        wrapper.vm.localAccountingData.editMode = true;
        await Vue.nextTick();
    }
});
