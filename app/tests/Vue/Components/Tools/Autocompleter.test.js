import { mount } from '@vue/test-utils';
import Autocompleter from '../../../../resources/js/components/tools/Autocompleter';

describe('Autocompleter', () => {
    const wrapper = mount(Autocompleter,{
        propsData: {
            items: [
                {id: 1,title: "a_item"},
                {id: 2,title: "b_item"},
                {id: 3,title: "c_item"},
                {id: 4,title: "d_item"},
                {id: 5,title: "c_item2"},
            ],
            searchKey: 'title',
            placeholder: 'Insert title...'
        }
    });

    test('The placeholder ist displayed correctly', () => {
        expect(wrapper.find('[data-vue-test="autocompleter"]').text()).toEqual(
            'Insert title...'
        );
    });
    test('Items can be filtered', () =>{
        wrapper.setData({
            query: 'd_'
        });

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
    })
});