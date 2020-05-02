import {shallowMount} from "@vue/test-utils";
import templateSelector from "../../../../../resources/js/components/Finance/Modals/TemplateSelector";
import moxios from "moxios";
import _ from "lodash";

import TemplateDataFixtures from "../Fixtures/TemplateFixtures";
describe("accounting and planning connection modal", () => {
    let wrapper = null;

    beforeEach(async () => {
        moxios.install(window.axios);
        wrapper = shallowMount(templateSelector,{
            propsData: {show: true}
        });

        //mock functions
        wrapper.vm.$refs.modalProgress.start = jest.fn();
        wrapper.vm.$refs.modalProgress.done = jest.fn();

        moxios.stubRequest("/api/finance/template", {
            status: 200,
            response: _.clone(TemplateDataFixtures)
        });
        await wrapper.vm.loadTemplates();
    });

    afterEach( () => {
        moxios.uninstall(window.axios);
    });

    it ("renders properly", async () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("can select a template", async () => {
        wrapper.find(".template-entry:first-child").trigger("click");
        expect(wrapper.emitted().templateSelected[0]).toEqual([TemplateDataFixtures[0]]);
    });

    it ("can be closed", async () => {
        wrapper.find(".close").trigger("click");
        expect(wrapper.emitted().close).toBeTruthy();
    });
});
