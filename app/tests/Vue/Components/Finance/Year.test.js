import { mount } from "@vue/test-utils";
import year from "../../../../resources/js/components/Finance/Year.vue";

describe("year", () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(
            year,
            {
                propsData: {
                    year: 2019
                }
            }
        );
    });

    it("can display the default templateCrud", () => {
        expect(wrapper.find(".templateCrud-label").text()).toEqual("2019");
    });

    it("can deacrease and increase templateCrud", () => {
        wrapper.find(".decrease-templateCrud").trigger("click");
        expect(wrapper.emitted("update-year")[0]).toEqual([2018]);
        wrapper.find(".decrease-templateCrud").trigger("click");
        expect(wrapper.emitted("update-year")[1]).toEqual([2017]);

        wrapper.find(".increase-templateCrud").trigger("click");
        expect(wrapper.emitted("update-year")[2]).toEqual([2018]);
        wrapper.find(".increase-templateCrud").trigger("click");
        expect(wrapper.emitted("update-year")[3]).toEqual([2019]);

    });

    function expectUpdatedValue(value){
    }
});
