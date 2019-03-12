import { shallowMount } from '@vue/test-utils'
import Autocompleter from '../../../../resources/js/components/tools/Autocompleter';

describe('Autocompleter', () => {
    const mockedDirective = {
        inserted(el, binding) {
            //do nothing
        }
    };

    let wrapper = null;

    beforeEach(() =>{
        wrapper = shallowMount(Autocompleter,{
            directives: {
                focus: mockedDirective
            },
            propsData: {
                items: [
                    {id: 1,title: "a_item"},
                    {id: 2,title: "b_item"},
                    {id: 3,title: "c_item"},
                    {id: 4,title: "d_item"},
                    {id: 5,title: "c_item2"}
                ],
                searchKey: 'title'
            }
        });
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
    it('Input box disappears when the focus is lost or the user pressed the tab key', () => {
        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        expect(wrapper.vm.editMode).toBeTruthy();

        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('blur');
        expect(wrapper.vm.editMode).toBeFalsy();

        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.tab');
        expect(wrapper.vm.editMode).toBeFalsy();
    });
    it('All items will be list if so configured', () => {
        wrapper.setProps({showAllItemsOnEmptyQuery: true});

        expect(wrapper.vm.matchedItems).toEqual(
            [
                {id: 1,title: "a_item"},
                {id: 2,title: "b_item"},
                {id: 3,title: "c_item"},
                {id: 4,title: "d_item"},
                {id: 5,title: "c_item2"}
            ]
        );
    });
    it('select an item if the users clicks on an item', () => {
        wrapper.setProps({showAllItemsOnEmptyQuery: true});
        //open autocompleter and select first item
        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        wrapper.find('[data-vue-test="resultList"] li:first-child').trigger('mousedown.prevent');

        //event selected is emitted and selected item will be given as argument
        expect(wrapper.emitted().selected[0]).toEqual([{id: 1,title: "a_item"}])

    });
});