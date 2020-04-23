import "../Mocks/MatchMedia.mock";
import _ from "lodash";
import {shallowMount} from "@vue/test-utils";
import PlanningSidebar from "../../../../resources/js/components/Finance/PlanningSidebar";
import Vue from "vue";
import filters from "../../../../resources/js/filters";
import PlanningDataFixtures from "./Fixtures/PlanningFixtures";
import CostCenterFixtures from "./Fixtures/CostCenterFixtures";
import TemplateFixtures from "./Fixtures/TemplateFixtures";

Vue.use(filters);

describe("Planning sidebar", () => {
    let wrapper = null;
    let planningData = null;
    let costCenterData = null;

    beforeEach(() => {
        planningData = PlanningDataFixtures;
        costCenterData = CostCenterFixtures;

        wrapper = shallowMount(PlanningSidebar,{
            propsData: {
                headline: "Fixture headline",
                year: 3000,
                month: 1,
                planningData: planningData,
                costCenterData: costCenterData,
                allowConnect: true,
                allowTemplateImport: false
            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("can toggle template selector", async () => {
        expect(wrapper.vm.showTemplateSelector).toBeFalsy();
        wrapper.vm.toggleTemplateSelector();
        expect(wrapper.vm.showTemplateSelector).toBeTruthy();
        wrapper.vm.toggleTemplateSelector();
        expect(wrapper.vm.showTemplateSelector).toBeFalsy();
    });

    it ("fires import event when importing template", async () => {
        const expectedTemplate = TemplateFixtures[0];

        wrapper.vm.importTemplate(expectedTemplate);
        expect(wrapper.emitted().importTemplate[0]).toEqual([expectedTemplate]);
    });

    it("fires create event when creating cost center", async() => {
        const expectedCostCenter = "My new cost center";
        wrapper.vm.createCostCenter(expectedCostCenter);
        expect(wrapper.emitted().createCostCenter[0]).toEqual([expectedCostCenter]);
    });

    it ("fires connect planning event when connecting planning", async () => {
        wrapper.vm.connectPlanning(999, true);
        expect(wrapper.emitted().connectPlanning[0]).toEqual([999, true]);
    });

    it ("fires delete planning event when deleting planning", async () => {
        wrapper.vm.deletePlanning(999);
        expect(wrapper.emitted().deletePlanning[0]).toEqual([999]);
    });

    it ("fires create planning event when deleting planning", async () => {
        wrapper.vm.createNewPlanning();
        expect(wrapper.emitted().createNewPlanning).toBeTruthy();
    });

    it ("fires save event when saving planning", async () => {
        const expectedSavedPlanning = {id: 1, title: "savedPlanning", totalAmount: -100};
        wrapper.vm.savePlanning(expectedSavedPlanning);
        expect(wrapper.emitted().save[0]).toEqual([expectedSavedPlanning]);
    });

    it ("can filter plannings by title", async () => {
        const expectedPlannings = [
            planningData[0],
            planningData[1]
        ];

        wrapper.vm.planningSearched("Einkauf");
        const filteredPlannings = wrapper.vm.filteredPlanning;
        expect(filteredPlannings).toEqual(expectedPlannings);
    });

    it ("can filter plannings by description", async () => {
        const expectedPlannings = [
            planningData[2],
            planningData[3]
        ];

        wrapper.vm.planningSearched("person 1");
        const filteredPlannings = wrapper.vm.filteredPlanning;
        expect(filteredPlannings).toEqual(expectedPlannings);
    });

    it ("displays a text if no planning entries are active", async () => {
        const fixtureData = [
            {
                id: 1,
                costCenter: {
                    id: 1,
                    title: "Einkaufen"
                },
                description: "Eintrag 1",
                totalAmount: 0,
                isNew: false
            }
        ];
        wrapper.setProps({planningData: fixtureData});
        await Vue.nextTick();

        expect(wrapper.text()).toContain("Keine Planungseinträge vorhanden");
    });

    it ("displays a text if query doesn't match any entries", async () => {
        wrapper.vm.planningSearched("This query string does not exist");
        await Vue.nextTick();
        expect(wrapper.text()).toContain("Für den eingegebenen Suchbegriff wurden keine Einträge gefunden");
    });

    it ("can determine if click of planning item should be enabled", async () =>{
        wrapper.vm.connectPlanningMode = false;
        wrapper.vm.connectPlanningId = 100;
    });
});
