import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import Autocompleter from '../../../../resources/js/components/tools/Autocompleter';

describe('Autocompleter', () => {
    const mockedDirective = {
        inserted(el, binding) {
            //do nothing
        }
    };

    let wrapper = null;

    function enableAutoCompleter(){
        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
    }

    function selectFirstItem(){
        wrapper.setData({editMode: true});
        wrapper.find('[data-vue-test="resultList"] li:first-child').trigger('mousedown.prevent');
    }
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

    it('can display placeholder text', () => {
        wrapper.setProps({placeholder: 'Insert title...'});
        expect(wrapper.find('[data-vue-test="autocompleter"]').text()).toEqual(
            'Insert title...'
        );
    });
    it('can filter items using a query', () =>{
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
    it('can create new items when none were found for query string', () => {
        const newItemName = 'MyUnknownQueryString';
        wrapper.setProps({enableInlineCreation: true});
        //invoke empty search result
        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        wrapper.setData({ query: newItemName});
        //click on create button
        wrapper.find('[data-vue-test="create-new-item-button"]').trigger('mousedown');

        expect(wrapper.emitted('create')[0]).toEqual([newItemName]);
    });
    it('can hide select box when user clicks or uses tab key on component', () => {
        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        expect(wrapper.vm.editMode).toBeTruthy();

        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('blur');
        expect(wrapper.vm.editMode).toBeFalsy();

        wrapper.find('[data-vue-test="autocompleter"]').trigger('click');
        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.tab');
        expect(wrapper.vm.editMode).toBeFalsy();

        wrapper.find('[data-vue-test="autocompleter"]').trigger('keyup.tab');
        expect(wrapper.vm.editMode).toBeTruthy();
    });
    it('can list all items if configured so', () => {
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
    it('selects an item if the users clicks on any', () => {
        wrapper.setProps({showAllItemsOnEmptyQuery: true});
        selectFirstItem();
        //event selected is emitted and selected item will be given as argument
        expect(wrapper.emitted().selected[0]).toEqual([{id: 1,title: "a_item"}])

    });

    it('can select items using arrow down key', () => {
        wrapper.setProps({showAllItemsOnEmptyQuery: true});
        enableAutoCompleter();

        expect(wrapper.vm.selected).toBe(0);
        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.down');
        expect(wrapper.vm.selected).toBe(1);
        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.down');
        expect(wrapper.vm.selected).toBe(2);
    });

    it('will not select items out of bounds when pressing the arrow down key more often than available items', () => {
        wrapper.setProps({showAllItemsOnEmptyQuery: true});
        enableAutoCompleter();

        const maxSelectedIndex = wrapper.vm.matchedItems.length -1;
        for (let i=0; i < maxSelectedIndex + 10;i++){
            wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.down');
        }
        expect(wrapper.vm.selected).toBe(maxSelectedIndex);
    });

    it('can select items using arrow up keys', () => {
        const maxSelectedIndex = wrapper.vm.matchedItems.length -1;

        wrapper.setProps({showAllItemsOnEmptyQuery: true});
        wrapper.setData({selected: maxSelectedIndex});
        enableAutoCompleter();

        expect(wrapper.vm.selected).toBe(maxSelectedIndex);
        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.up');
        expect(wrapper.vm.selected).toBe(maxSelectedIndex-1);
        wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.up');
        expect(wrapper.vm.selected).toBe(maxSelectedIndex-2);
    });

    it('will not select items out of bounds when pressing the arrow  up key more often than available items', () => {
        wrapper.setProps({showAllItemsOnEmptyQuery: true});
        enableAutoCompleter();

        const maxSelectedIndex = wrapper.vm.matchedItems.length -1;
        for (let i=0; i < maxSelectedIndex + 10;i++){
            wrapper.find('[data-vue-test="autocompleter-input"]').trigger('keydown.up');
        }
        expect(wrapper.vm.selected).toBe(0);
    });

    it('can preselect items', () => {
        let localWrapper = mount(Autocompleter,{
            directives: {
                focus: mockedDirective
            },
            propsData: {
                valueKey: "id",
                searchKey: 'title',
                preselectedValue: 2,
                items: [
                    {id: 1,title: "a_item"},
                    {id: 2,title: "b_item"},
                ]
            }
        });

        expect(localWrapper.vm.selectedItem).toEqual({id: 2,title: "b_item"})
    });

    it('can be configured whether to reset query after item selection', () => {
        const queryFixture = 'a_';

        //case do not reset
        wrapper.setProps({queryShouldBeReset: false});

        wrapper.setData({query: queryFixture});

        expect(wrapper.vm.query).toBe(queryFixture);
        selectFirstItem();
        expect(wrapper.vm.query).toBe(queryFixture);

        //case do not reset
        wrapper.setProps({queryShouldBeReset: true});
        wrapper.setData({query: queryFixture});

        expect(wrapper.vm.query).toBe(queryFixture);
        selectFirstItem();
        expect(wrapper.vm.query).toBe('');
    });
});