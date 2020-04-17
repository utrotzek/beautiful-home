import {mount} from "@vue/test-utils";
import Vue from "vue";
import ButtonRow from "../../../../resources/js/components/tools/ButtonRow";

describe("Overview", () => {
    let wrapper = null;

    const allEnabled = {
        showEdit: true,
        showSave: true,
        showDelete: true,
        showClose: true,
        showConnect: true,
        showCancel: true
    };

    beforeEach(() => {
        wrapper = mount(ButtonRow);
    });

    it ("renders properly", async () => {
        wrapper.setProps(allEnabled);
        await Vue.nextTick();
        expect(wrapper.element).toMatchSnapshot();
    });

    it ("can enable edit button", async () =>  {
        expect(wrapper.find(".save").exists()).toBeFalsy();

        wrapper.setProps({showSave: true});
        await Vue.nextTick();
        expect(wrapper.find(".save").exists()).toBeTruthy();
    });

    it ("can enable delete button", async () =>  {
        expect(wrapper.find(".delete").exists()).toBeFalsy();

        wrapper.setProps({showDelete: true});
        await Vue.nextTick();
        expect(wrapper.find(".delete").exists()).toBeTruthy();
    });

    it ("can enable close button", async () =>  {
        expect(wrapper.find(".close").exists()).toBeFalsy();

        wrapper.setProps({showClose: true});
        await Vue.nextTick();
        expect(wrapper.find(".close").exists()).toBeTruthy();
    });

    it ("can enable connect button", async () =>  {
        expect(wrapper.find(".connect").exists()).toBeFalsy();

        wrapper.setProps({showConnect: true});
        await Vue.nextTick();
        expect(wrapper.find(".connect").exists()).toBeTruthy();
    });

    it ("can enable cancel button", async () =>  {
        expect(wrapper.find(".cancel").exists()).toBeFalsy();

        wrapper.setProps({showCancel: true});
        await Vue.nextTick();
        expect(wrapper.find(".cancel").exists()).toBeTruthy();
    });

    it ("buttons can be clicked", async () =>  {
        wrapper.setProps(allEnabled);
        await Vue.nextTick();

        wrapper.find(".edit").trigger("click");
        expect(wrapper.emitted().edit).toBeTruthy();

        wrapper.find(".delete").trigger("click");
        expect(wrapper.emitted().deleteClick).toBeTruthy();

        wrapper.find(".close").trigger("click");
        expect(wrapper.emitted().close).toBeTruthy();

        wrapper.find(".connect").trigger("click");
        expect(wrapper.emitted().connect).toBeTruthy();

        wrapper.find(".save").trigger("click");
        expect(wrapper.emitted().save).toBeTruthy();

        wrapper.find(".cancel").trigger("click");
        expect(wrapper.emitted().cancel).toBeTruthy();
    });


    it ("buttons can be disabled", async () =>  {
        wrapper.setProps(allEnabled);
        wrapper.setProps({disabled: true});
        await Vue.nextTick();

        wrapper.find(".edit").trigger("click");
        expect(wrapper.emitted().edit).toBeFalsy();

        wrapper.find(".delete").trigger("click");
        expect(wrapper.emitted().deleteClick).toBeFalsy();

        wrapper.find(".close").trigger("click");
        expect(wrapper.emitted().close).toBeFalsy();

        wrapper.find(".connect").trigger("click");
        expect(wrapper.emitted().connect).toBeFalsy();

        wrapper.find(".save").trigger("click");
        expect(wrapper.emitted().save).toBeFalsy();

        //cancel button should never be disabled
        wrapper.find(".cancel").trigger("click");
        expect(wrapper.emitted().cancel).toBeTruthy();
    });


});
