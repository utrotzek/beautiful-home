import "../Mocks/MatchMedia.mock";
import moment from "moment";
import {shallowMount} from "@vue/test-utils";
import AccountingSidebar from "../../../../resources/js/components/Finance/AccountingSidebar";
import Vue from "vue";
import filters from "../../../../resources/js/filters";
import AccountingFixtures from "./Fixtures/AccountingFixtures";
import PlanningFixtures from "./Fixtures/PlanningFixtures";
import PeriodDataFixtures from "./Fixtures/PeriodFixtures";
import ToggleButton from "vue-js-toggle-button";
Vue.use(ToggleButton);
Vue.use(filters);

describe("Planning sidebar", () => {
    let wrapper = null;
    let accountingData = null;
    let planningData = null;
    let periodData = null;
    let costCenterFilter = [];
    let createConnectionData = {
        enabled: false,
        planningId: 0,
        accountingId: 0,
        planningTotalAmount: 0,
        accountingTotalAmount: 0,
        desiredAmount: 0,
        accountingData: null,
        planningData: null
    };

    beforeEach(() => {
        accountingData = AccountingFixtures;
        periodData = PeriodDataFixtures[0];
        planningData = PlanningFixtures;

        wrapper = shallowMount(AccountingSidebar,{
            propsData: {
                period: periodData,
                accountingData: accountingData,
                costCenterFilter: costCenterFilter,
                createConnectionData: createConnectionData
            }
        });

        wrapper.setData(
            {
                searchQuery: "",
                showModal: false,
                importerVisible: false,
                temp: false,
                showFinishedAccountings: true,
                showUnfinishedAccountings: true,
            }
        );
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("Can create new accounting entries", async () => {
        wrapper.find(".new-accounting").trigger("click");
        await Vue.nextTick();
        expect(wrapper.emitted().createNewAccounting).toBeTruthy();
    });

    it ("Can toggle the importer", async () => {
        expect(wrapper.vm.importerVisible).toBeFalsy();
        wrapper.find(".toggle-importer").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.importerVisible).toBeTruthy();
        wrapper.find(".toggle-importer").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.importerVisible).toBeFalsy();
    });

    it ("entries can be searched by date", async () => {
        wrapper.vm.accountingSearched("02.01.3000");
        await Vue.nextTick();
        expect(wrapper.vm.filteredAccounting.length).toEqual(1);
        expect(wrapper.vm.filteredAccounting).toEqual([accountingData[1]]);
    });

    it ("date search can handle date objects", async () => {
        accountingData[1].date = moment("02.01.3000", "DD.MM.YYYY").toDate();
        wrapper.vm.accountingSearched("02.01.3000");
        await Vue.nextTick();
        expect(wrapper.vm.filteredAccounting.length).toEqual(1);
        expect(wrapper.vm.filteredAccounting).toEqual([accountingData[1]]);
    });

    it ("entries can be searched by title", async () => {
        wrapper.vm.accountingSearched("Rewe");
        await Vue.nextTick();
        expect(wrapper.vm.filteredAccounting.length).toEqual(1);
        expect(wrapper.vm.filteredAccounting).toEqual([accountingData[0]]);
    });

    it ("can apply cost center filter", async () => {
        accountingData[3].connectedPlanning[0].costCenter = null;
        accountingData[2].connectedPlanning = [];
        wrapper.setProps(
            {
                costCenterFilter: [
                    { id: 1, title: "Einkaufen"}
                ]
            }
        )
        await Vue.nextTick();
        expect(wrapper.vm.filteredAccounting.length).toEqual(2);
        expect(wrapper.vm.filteredAccounting).toContain(accountingData[1]);
        expect(wrapper.vm.filteredAccounting).toContain(accountingData[0]);
    });

    it ("can hide finished accountings", async () => {
        accountingData[0].remainingAmount = -100.0;
        accountingData[0].totalAmount = -100.0;
        wrapper.vm.showFinishedAccountings = false;
        expect(wrapper.vm.filteredAccounting.length).toEqual(1);
        expect(wrapper.vm.filteredAccounting).toContain(accountingData[0]);
    });

    it ("can hide unfinished accountings", async () => {
        accountingData[0].remainingAmount = -100.0;
        accountingData[0].totalAmount = -100.0;
        wrapper.vm.showUnfinishedAccountings = false;
        expect(wrapper.vm.filteredAccounting.length).toEqual(3);
        expect(wrapper.vm.filteredAccounting).not.toContain(accountingData[0]);
    });

    it ("connection mode will be disabled depending on remaining amount", async () => {
        createConnectionData.enabled = true;
        createConnectionData.planningData = {
            totalAmount: 0
        };
        expect(wrapper.vm.accountingClass(1)).toEqual({"deactivated": true});
    });

    it ("update accounting will fire event", async () => {
        wrapper.vm.updateAccounting(accountingData[0]);
        expect(wrapper.emitted().updateAccounting[0]).toEqual([accountingData[0]]);
    });

    it ("delete accounting will fire event", async () => {
        wrapper.vm.deleteAccounting(accountingData[0]);
        expect(wrapper.emitted().deleteAccounting[0]).toEqual([accountingData[0]]);
    });

    it ("delete connection will fire event", async () => {
        wrapper.vm.deleteConnection(1, {connection: "to remove"});
        expect(wrapper.emitted().deleteConnection[0]).toEqual([1, {connection: "to remove"}]);
    });

    it ("update connection will fire event", async () => {
        wrapper.vm.updateConnectedPlanning(planningData[0], 2);
        expect(wrapper.emitted().updateConnectedPlanning[0]).toEqual([planningData[0], 2]);
    });

    it ("can show connection modal", async () => {
        wrapper.vm.doShowConnectionModal(1);
        expect(wrapper.vm.showModal).toBeTruthy();
    });

    it ("can calculate desired amount properly when having negative amount", async () => {
        accountingData[0].remainingAmount = -100;
        createConnectionData = {
            enabled: true,
            accountingId: 1,
            planningData: planningData[0]
        };

        wrapper.setProps({createConnectionData: createConnectionData});
        wrapper.vm.doShowConnectionModal(1);
        expect(wrapper.vm.createConnectionData.desiredAmount).toEqual(-100);
    });

    it ("desired amount will be calculated properly when having positive amount", async () => {
        accountingData[0].remainingAmount = 100;
        planningData[0].totalAmount = 100;
        createConnectionData = {
            enabled: true,
            accountingId: 1,
            planningData: planningData[0]
        };

        wrapper.setProps({createConnectionData: createConnectionData});

        wrapper.vm.doShowConnectionModal(1);
        expect(wrapper.vm.createConnectionData.desiredAmount).toEqual(100);
    });

    it ("can hide connection modal", async () => {
        wrapper.vm.showModal = true;
        wrapper.vm.closeModal();
        expect(wrapper.vm.showModal).toBeFalsy();
    });

    it ("desired amount will match remaining amount even when having a higher negative planning amount", async () =>  {
        accountingData[0].remainingAmount = -200;
        planningData[0].totalAmount = -100;
        createConnectionData = {
            enabled: true,
            accountingId: 1,
            planningData: planningData[0]
        };

        wrapper.setProps({createConnectionData: createConnectionData});
        wrapper.vm.doShowConnectionModal(1);
        expect(wrapper.vm.createConnectionData.desiredAmount).toEqual(-100);
    });

    it ("desired amount will match remaining amount even when having a higher positive planning amount", async () =>  {
        accountingData[0].remainingAmount = 200;
        planningData[0].totalAmount = 100;
        createConnectionData = {
            enabled: true,
            accountingId: 1,
            planningData: planningData[0]
        };

        wrapper.setProps({createConnectionData: createConnectionData});
        wrapper.vm.doShowConnectionModal(1);
        expect(wrapper.vm.createConnectionData.desiredAmount).toEqual(100);
    });

    it ("can trigger accounting planning connection", async () => {
        const planning = planningData[0];
        const accounting = accountingData[0];
        const desiredAmount = -30;
        wrapper.vm.doAccountingPlanningConnection(planning, accounting, desiredAmount);

        expect(wrapper.emitted().doAccountingPlanningConnection[0]).toEqual([planning, accounting, desiredAmount]);
    });
});
