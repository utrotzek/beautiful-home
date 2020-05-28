import "../Mocks/MatchMedia.mock";
import {shallowMount} from "@vue/test-utils";
import Accounting from "../../../../resources/js/components/Finance/Accounting";
import moxios from "moxios";

import PeriodFixtures from "./Fixtures/PeriodFixtures";
import PlanningFixtures from "./Fixtures/PlanningFixtures";
import AccountingFixtures from "./Fixtures/AccountingFixtures";
import CostCenterFixtures from "./Fixtures/CostCenterFixtures";
import _ from "lodash";
import moment from "moment";
import Vue from "vue";

describe("Accounting element", () => {
    let wrapper, accountingTestData;

    beforeEach(() => {
        moxios.install(window.axios);

        accountingTestData = _.clone(AccountingFixtures);

        wrapper = shallowMount(Accounting,{
            propsData: {
                periodId: 1,
            },
            methods: {
                mounted: jest.fn(),
                refreshData: jest.fn(),
                startProgressBar: jest.fn(),
                stopProgressBar: jest.fn(),
                updateCostCenters: jest.fn(),
                triggerResize: jest.fn()
            }
        });

        moxios.stubRequest("/api/finance/costCenter", {
            status: 200,
            response: _.clone(CostCenterFixtures)
        });
    });

    afterEach( () => {
        moxios.uninstall(window.axios);
    });

    it ("renders properly", async () => {
        wrapper.setData(
            {
                headline: "January 3000",
                accountingData: accountingTestData,
                costCenterData: _.clone(CostCenterFixtures),
                currentPeriod: _.clone(PeriodFixtures[0]),
                loaded: true
            }
        );
        await Vue.nextTick();
        expect(wrapper.element).toMatchSnapshot();
    });

    it  ("can load data", (done) => {
        moxios.stubRequest(/\/api\/finance\/period\/.*/, {
            status: 200,
            response: PeriodFixtures[0]
        });

        moxios.stubRequest(/\/api\/finance\/plannings\/forPeriod\/\d+/, {
            status: 200,
            response: PlanningFixtures
        });

        moxios.stubRequest(/\/api\/finance\/accountings\/forPeriod\/\d+/, {
            status: 200,
            response: accountingTestData
        });

        wrapper.vm.loadData();
        moxios.wait(() => {
            expect(wrapper.vm.year).toEqual(3000);
            expect(wrapper.vm.planningData).toEqual(PlanningFixtures);
            expect(wrapper.vm.accountingData).toEqual(accountingTestData);
            expect(wrapper.vm.costCenterData).toEqual(CostCenterFixtures);
            expect(wrapper.vm.loaded).toEqual(true);
            done();
        });
    });


    it ("can save new accountings", (done) => {
        let newAccounting = {
            id: 9999,
            title: "Rewe",
            totalAmount: -100,
            remainingAmount: 0,
            editMode: false,
            date: "01.01.3000",
            isNew: true
        };

        wrapper.vm.updateRemainingAccountingAmount = jest.fn();
        wrapper.vm.accountingData.push(newAccounting);
        wrapper.vm.saveAccounting(newAccounting);

        let newAccountingAfterSave = _.clone(newAccounting);
        newAccountingAfterSave.id = 1234;
        moxios.stubRequest("/api/finance/accounting", {
            status: 200,
            response: newAccountingAfterSave
        });

        moxios.wait(() => {
            expect(wrapper.vm.accountingData[wrapper.vm.accountingData.length -1]).toEqual(newAccountingAfterSave);
            done();
        });
    });

    it ("will update remainingAmount after saving existing accountings", (done) => {
        let accounting = _.clone(accountingTestData[0]);
        wrapper.vm.accountingData = _.clone([accounting]);

        accounting.isNew = false;
        accounting.remainingAmount = -100;
        accounting.connectedPlanning = [];

        moxios.stubRequest(/\/api\/finance\/accounting\/.*/, {
            status: 200,
            response: {
                remainingAmount: -30,
                connectedPlanning: [{
                    title: "new element"
                }]
            }
        });

        let expectedAcccounting = _.clone(accounting);
        expectedAcccounting.remainingAmount = -30;
        expectedAcccounting.connectedPlanning = [{
            title: "new element"
        }];

        wrapper.vm.saveAccounting(accounting);

        moxios.wait(() => {
            expect(wrapper.vm.accountingData[0].remainingAmount).toEqual(expectedAcccounting.remainingAmount);
            done();
        });
    });

    it ("can update a negative remaining amount properly", () => {
        let accounting = {
            totalAmount:-100,
            remainingAmount: 0,
            connectedPlanning: [
                {totalAmount: -10},
                {totalAmount: -15}
            ]
        };

        wrapper.vm.updateRemainingAccountingAmount(accounting);
        expect(accounting.remainingAmount).toEqual(-75);
    });

    it ("can update a positive remaining amount properly", () => {
        let accounting = {
            totalAmount:100,
            remainingAmount: 0,
            connectedPlanning: [
                {totalAmount: 10},
                {totalAmount: 15}
            ]
        };

        wrapper.vm.updateRemainingAccountingAmount(accounting);
        expect(accounting.remainingAmount).toEqual(75);
    });

    it ("can save new plannings", (done) => {
        let newPlanning = {
            id: 9999,
            title: "Rewe",
            totalAmount: -100,
            isNew: true
        };

        let newPlanningAfterSave = _.clone(newPlanning);
        newPlanningAfterSave.id = 1234;
        moxios.stubRequest("/api/finance/planning", {
            status: 200,
            response: newPlanningAfterSave
        });

        wrapper.vm.savePlanning(newPlanning);
        moxios.wait(() => {
            const lastPlanning = wrapper.vm.planningData[wrapper.vm.planningData.length -1];
            expect(lastPlanning).toEqual(newPlanningAfterSave);
            done();
        });

    });

    it ("can update plannings", (done) => {
        let updatedPlanning = {
            id: 1234,
            title: "Rewe",
            totalAmount: -100,
            isNew: false
        };

        moxios.stubRequest(/\/api\/finance\/planning\/.*/, {
            status: 200,
        });

        wrapper.vm.savePlanning(updatedPlanning);
        moxios.wait(() => {
            done();
        });
    });

    it ("can delete new plannings",  () => {
        wrapper.vm.planningData = _.clone(PlanningFixtures);
        wrapper.vm.planningData[0].isNew = true;

        const deleteId = wrapper.vm.planningData[0].id;
        wrapper.vm.deletePlanning(deleteId);
        expect(wrapper.vm.planningData).not.toContain(PlanningFixtures[0]);
    });

    it ("can delete existing plannings", (done) => {
        wrapper.vm.planningData = _.clone(PlanningFixtures);
        wrapper.vm.planningData[0].isNew = false;
        moxios.stubRequest(/\/api\/finance\/planning\/.*/, {
            status: 200,
        });

        const deleteId = wrapper.vm.planningData[0].id;
        wrapper.vm.deletePlanning(deleteId);
        moxios.wait(() => {
            expect(wrapper.vm.planningData).not.toContain(PlanningFixtures[0]);
            done();
        });
    });

    it ("can delete connections", (done) => {
        const saveMethod = jest.spyOn(wrapper.vm, "saveAccounting");
        saveMethod.mockReturnValue("dummy");
        moxios.stubRequest(/\/api\/finance\/costCenterAccounting\/101/, {
            status: 200,
        });

        wrapper.vm.deleteConnection(AccountingFixtures[1].id, accountingTestData[1].connectedPlanning[0]);
        moxios.wait(() => {
            expect(saveMethod).toHaveBeenCalled();
            done();
        });
    });

    it ("can add accounting planning connection", (done) => {
        wrapper.vm.saveAccounting = jest.fn();
        wrapper.vm.deactivateConnectionMode = jest.fn();
        wrapper.vm.savePlanning = jest.fn();
        const saveAccounting = jest.spyOn(wrapper.vm, "saveAccounting");
        const deactivateConnectionMode = jest.spyOn(wrapper.vm, "deactivateConnectionMode");
        const savePlanning = jest.spyOn(wrapper.vm, "savePlanning");

        moxios.stubRequest("/api/finance/costCenterAccounting", {
            status: 200
        });

        wrapper.vm.doAccountingPlanningConnection(PlanningFixtures[0], accountingTestData[1], -100);
        moxios.wait(() => {
            expect(saveAccounting).toHaveBeenCalled();
            expect(savePlanning).toHaveBeenCalled();
            expect(deactivateConnectionMode).toHaveBeenCalled();

            expect(PlanningFixtures[0].totalAmount).toEqual(0);
            done();
        });
    });

    it ("totalAmount can be calculated properly", () => {
        let planningNegativeTotalAmount = {totalAmount: -100};
        wrapper.vm.updatePlanningTotalAmount(planningNegativeTotalAmount, -50);
        expect(planningNegativeTotalAmount.totalAmount).toEqual(-50);

        let planningToLargeNegativeTotalAmount = {totalAmount: -100};
        wrapper.vm.updatePlanningTotalAmount(planningToLargeNegativeTotalAmount, -200);
        expect(planningToLargeNegativeTotalAmount.totalAmount).toEqual(0);

        let planningPositiveTotalAmount = {totalAmount: 100};
        wrapper.vm.updatePlanningTotalAmount(planningPositiveTotalAmount, 50);
        expect(planningPositiveTotalAmount.totalAmount).toEqual(50);

        let planningToLargePositiveTotalAmount = {totalAmount: 100};
        wrapper.vm.updatePlanningTotalAmount(planningToLargePositiveTotalAmount, 200);
        expect(planningToLargePositiveTotalAmount.totalAmount).toEqual(0);
    });

    it ("can deactivate connection mode", () => {
        wrapper.vm.createConnectionData = {
            planningData: {totalAmount: 10},
            accountingId: 100
        };
        wrapper.vm.deactivateConnectionMode();
        expect(wrapper.vm.createConnectionData.accountingId).toEqual(0);
    });

    it ("sets planningId to zero on connection mode deactivation if total amount is zero", () => {
        wrapper.vm.createConnectionData = {
            planningData: {totalAmount: 0},
            enabled: true,
            planningId: 100,
            accountingId: 100
        };
        wrapper.vm.deactivateConnectionMode();
        expect(wrapper.vm.createConnectionData.accountingId).toEqual(0);
        expect(wrapper.vm.createConnectionData.planningId).toEqual(0);
        expect(wrapper.vm.createConnectionData.enabled).toEqual(false);
    });

    it ("can update connected plannings", (done) => {
        const updatedConnectedPlanning = accountingTestData[0].connectedPlanning[0];
        const accountingId = accountingTestData[0].id;
        const saveAccounting = jest.spyOn(wrapper.vm, "saveAccounting");

        wrapper.vm.accountingData = accountingTestData;

        wrapper.vm.updateConnectedPlanning(updatedConnectedPlanning, accountingId);
        moxios.stubRequest(/\/api\/finance\/costCenterAccounting\/.*/, {
            status: 200
        });

        moxios.wait(() => {
            expect(saveAccounting).toHaveBeenCalled();
            done();
        });
    });

    it ("can update the remaining amount", () => {
        let accounting = {
            totalAmount: 100,
            connectedPlanning: [
                {totalAmount: 20},
                {totalAmount: 40}
            ]
        };
        wrapper.vm.updateRemainingAmount(accounting);
        expect(accounting.remainingAmount).toEqual(40);
    });

    it ("can delete existing accountings", (done) => {
        wrapper.vm.accountingData = _.clone(accountingTestData);

        moxios.stubRequest(/\/api\/finance\/accounting\/.*/, {
            status: 200
        });
        wrapper.vm.deleteAccounting(accountingTestData[1]);

        moxios.wait(() => {
            !expect(wrapper.vm.accountingData).not.toContain(accountingTestData[1]);
            done();
        });
    });

    it ("can delete new accountings", (done) => {
        let accountingData = _.clone(accountingTestData);
        accountingData[1].isNew = true;
        wrapper.setData({accountingData: _.clone(accountingData)});

        wrapper.vm.deleteAccounting(accountingData[1]);
        moxios.wait(() => {
            !expect(wrapper.vm.accountingData).not.toContain(accountingData[1]);
            done();
        });
    });

    it ("can create a dummy new accounting", () => {
        const hasUnsavedAccountings = jest.spyOn(wrapper.vm, "hasUnsavedNewAccountings");
        const expectedPeriod =  _.clone(PeriodFixtures[0]);
        hasUnsavedAccountings.mockReturnValue(false);

        wrapper.setData({
            currentPeriod:  _.clone(PeriodFixtures[0]),
            year: expectedPeriod.year,
            month: expectedPeriod.month
        });
        wrapper.vm.currentPeriod =

        wrapper.vm.createNewAccounting();

        const expectedNewAccounting = {
            id: 9999999,
            title: "",
            totalAmount: "",
            remainingAmount: -20,
            date: moment(expectedPeriod.year + "-" + expectedPeriod.month + "-1", "YYYY-MM-DD").toDate(),
            display: true,
            isNew: true,
            editMode: true,
            connectedPlanning: [],
            period: expectedPeriod
        };
        const actualNewAccounting = wrapper.vm.accountingData[wrapper.vm.accountingData.length -1];
        expect(expectedNewAccounting).toEqual(actualNewAccounting);
    });

    it ("can create a dummy new planning", () => {
        const expectedPeriod =  _.clone(PeriodFixtures[0]);
        wrapper.vm.hasUnsavedNewPlannings = jest.fn();
        wrapper.vm.getUniquePlanningId = jest.fn();
        wrapper.vm.hasUnsavedNewPlannings.mockReturnValue(false);
        wrapper.vm.getUniquePlanningId.mockReturnValue("12345");

        wrapper.setData({
            currentPeriod:  _.clone(PeriodFixtures[0]),
            year: expectedPeriod.year,
            month: expectedPeriod.month
        });

        const expectedNewPlanning = {
            id: "12345",
            costCenter: {
                id: 99999,
                title: "----------"
            },
            description: "",
            totalAmount: "",
            date: moment(expectedPeriod.year + "-" + expectedPeriod.month + "-1", "YYYY-MM-DD").toDate(),
            display: true,
            editMode:  true,
            isNew: true,
            period: expectedPeriod
        };
        wrapper.vm.createNewPlanning();

        const actualNewPlanning = wrapper.vm.planningData[wrapper.vm.planningData.length -1];
        expect(actualNewPlanning).toEqual(expectedNewPlanning);
    });

    it ("can determine unsaved plannings", () => {
        wrapper.setData({
            planningData: _.clone(PlanningFixtures)
        });
        expect(wrapper.vm.hasUnsavedNewPlannings()).toBeFalsy();
        wrapper.vm.planningData[0].isNew = true;
        expect(wrapper.vm.hasUnsavedNewPlannings()).toBeTruthy();
    });

    it ("can determine unsaved accountings", () => {
        wrapper.setData({
            accountingData: [
                {isNew: false},
                {isNew: false}
            ]
        });
        expect(wrapper.vm.hasUnsavedNewAccountings()).toBeFalsy();
        wrapper.vm.accountingData[0].isNew = true;
        expect(wrapper.vm.hasUnsavedNewAccountings()).toBeTruthy();
    });

    it ("can create a unique planning id", () => {
        wrapper.setData({planningData: _.clone(PlanningFixtures)});
        expect(wrapper.vm.getUniquePlanningId()).toEqual(5);
    });

    it ("can trigger connection mode properly", () => {
        wrapper.setData({planningData: _.clone(PlanningFixtures)});
        expect(wrapper.vm.createConnectionData.enabled).toBeFalsy();
        wrapper.vm.triggerConnectionMode(1, true);

        expect(wrapper.vm.createConnectionData.enabled).toBeTruthy();
        expect(wrapper.vm.createConnectionData.planningData).toEqual(PlanningFixtures[0]);
        expect(wrapper.vm.createConnectionData.planningId).toEqual(1);

        wrapper.vm.triggerConnectionMode(1, false);
        expect(wrapper.vm.createConnectionData.enabled).toBeFalsy();
    });

    it ("can toggle planning collapse state", async () => {
        wrapper.setData({
            currentPeriod: _.clone(PeriodFixtures[0]),
            planningCollapsed: false,
            loaded: true
        });
        await Vue.nextTick();

        wrapper.find("#planningCollapseButton").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.planningCollapsed).toBeTruthy();

        wrapper.find("#planningCollapseButton").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.planningCollapsed).toBeFalsy();
    });

    it ("can force planning collapse state", () => {
        wrapper.setData({planningCollapsed: true});
        wrapper.vm.collapsePlanning(false);
        expect(wrapper.vm.planningCollapsed).toBeFalsy();
    });

    it ("can toggle overview collapse state", async () => {
        wrapper.setData({
            currentPeriod: _.clone(PeriodFixtures[0]),
            overviewCollapsed: false,
            loaded: true
        });
        await Vue.nextTick();

        wrapper.find("#overviewCollapseButton").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.overviewCollapsed).toBeTruthy();

        wrapper.find("#overviewCollapseButton").trigger("click");
        await Vue.nextTick();
        expect(wrapper.vm.overviewCollapsed).toBeFalsy();
    });
    it ("can force overview collapse state", () => {
        wrapper.setData({overviewCollapsed: true});
        wrapper.vm.collapseOverview(false);
        expect(wrapper.vm.overviewCollapsed).toBeFalsy();
    });

    it ("can import templates", (done) => {
        wrapper.setData({
            currentPeriod: _.clone(PeriodFixtures[0]),
            year: PeriodFixtures[0].year,
            month: PeriodFixtures[0].month
        });

        const savePlanning = jest.spyOn(wrapper.vm, "savePlanning");

        moxios.stubRequest(/\/api\/finance\/plannings\/forTemplate\/.*/, {
            status: 200,
            response: [
                {
                    date: "4000-10-01",
                    totalAmount: 100,
                },
                {
                    date: "4000-10-05",
                    totalAmount: 200,
                }
            ]
        });

        wrapper.vm.importTemplate({id: 1});

        moxios.wait(() => {
            expect(savePlanning).toBeCalledTimes(2);
            expect(savePlanning).toHaveBeenNthCalledWith(
                1,
                {
                    date: "3000-01-01",
                    isNew: true,
                    period: PeriodFixtures[0],
                    templates: null,
                    totalAmount: 100
                }
            );

            expect(savePlanning).toHaveBeenNthCalledWith(
                2,
                {
                    date: "3000-01-05",
                    isNew: true,
                    period: PeriodFixtures[0],
                    templates: null,
                    totalAmount: 200
                }
            );
            done();
        });
    });

    it ("can update the cost center filter", () => {
        wrapper.vm.updateCostCenterFilter("updated filter");
        expect(wrapper.vm.costCenterFilter).toEqual("updated filter");
    });
});
