import {mount} from "@vue/test-utils";
import Vue from "vue";
import Search from "../../../../resources/js/components/tools/Search";

describe("Overview", () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(Search,{
            propsData: {
            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("fires event if query field changes", () =>  {
        const expectedTerm = "My search term";

        enterSearchTerm();
        expect(wrapper.emitted().searched[0]).toEqual([expectedTerm]);
    });

    it ("can clear the search term", async () =>{
        const expectedSearchTerm = "";

        enterSearchTerm();
        await Vue.nextTick();
        wrapper.find(".search-clear").trigger("click");

        expect(wrapper.emitted().searched[1]).toEqual([expectedSearchTerm]);

    });

    function enterSearchTerm() {
        const searchTerm = "My search term";
        wrapper.find(".search-control").setValue(searchTerm);
        wrapper.find(".search-control").trigger("keyup");
    }
});
