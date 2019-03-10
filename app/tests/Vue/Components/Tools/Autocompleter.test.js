import { shallowMount } from '@vue/test-utils'
import Autocompleter from '../../../../resources/js/components/tools/Autocompleter';

describe('Autocompleter', () => {
    const mockedDirective = {
        inserted(el, binding) {
            //do nothing
        }
    };

    const wrapper = shallowMount(Autocompleter,{
        directives: {
            focus: mockedDirective
        },
        propsData: {
            items: [
                {id: 1,title: "a_item"},
                {id: 2,title: "b_item"},
                {id: 3,title: "c_item"},
                {id: 4,title: "d_item"},
                {id: 5,title: "c_item2"},
            ],
            searchKey: 'title'
        }
    });

    it('The placeholder ist displayed correctly', () => {
        wrapper.setProps({placeholder: 'Insert title...'});
        expect(wrapper.find('[data-vue-test="autocompleter"]').text()).toEqual(
            'Insert title...'
        );
    });
    it('Items can be filtered', () =>{
        wrapper.setData({query: 'd_'});

        expect(wrapper.vm.matchedItems).toEqual(
            [
                {id: 4,title: "d_item"}
            ]
        );

        wrapper.setData({
            query: 'c_'
        });

        expect(wrapper.vm.matchedItems).toEqual(
            [
                {id: 3,title: "c_item"},
                {id: 5,title: "c_item2"},
            ]
        );
    });
    it('New items can be created when no items are found for certain query string', () => {
        const newItemName = 'MyUnknownQueryString';
        wrapper.setProps({enableInlineCreation: true});
        //invoke empty search result
        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        wrapper.setData({ query: newItemName});
        //click on create button
        wrapper.find('[data-vue-test="create-new-item-button"]').trigger('mousedown');

        expect(wrapper.emitted('create')[0]).toEqual([newItemName]);
    });
});