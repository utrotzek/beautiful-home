import {mount} from "@vue/test-utils";
import templateCrud from "../../../../resources/js/components/Finance/TemplatesCrud";
import Vue from "vue";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);

describe("TemplateCrud", () => {
    let wrapper = null;
    const templates = [
        {
            id: 1,
            title: "Standard"
        },
        {
            id: 2,
            title:  "Nicht Standard"
        }
    ];

    beforeEach(() => {
        wrapper = mount(templateCrud,{
            propsData: {
                templates: templates
            }
        });
    });

    it ("renders properly", () => {
        expect(wrapper.element).toMatchSnapshot();
    });

    it("will fire edit event when edit button was clicked", () => {
        wrapper.find(".entry:nth-child(1) .edit-controls .edit").trigger("click");
        expect(wrapper.emitted().editTemplate[0]).toEqual([templates[0]]);
    });

    it("will fire delete event when delete button was clicked", () => {
        wrapper.find(".entry:nth-child(1) .edit-controls .delete").trigger("click");
        expect(wrapper.emitted().deleteTemplate[0]).toEqual([templates[0]]);
    });

    it("will fire create template event when form was submitted properly", () => {
        wrapper.find(".template-crud .template-name").setValue("My new template");
        wrapper.find(".template-crud .submit").trigger("click");
        expect(wrapper.emitted().createTemplate[0]).toEqual(["My new template"]);
    });
});
