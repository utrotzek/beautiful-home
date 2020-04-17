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

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("can display the default year", () => {
        expect(wrapper.find(".year-label").text()).toEqual("2019");
    });

    it("can deacrease and increase year", () => {
        wrapper.find(".decrease-year").trigger("click");
        expect(wrapper.emitted("update-year")[0]).toEqual([2018]);
        wrapper.find(".decrease-year").trigger("click");
        expect(wrapper.emitted("update-year")[1]).toEqual([2017]);

        wrapper.find(".increase-year").trigger("click");
        expect(wrapper.emitted("update-year")[2]).toEqual([2018]);
        wrapper.find(".increase-year").trigger("click");
        expect(wrapper.emitted("update-year")[3]).toEqual([2019]);

    });
});