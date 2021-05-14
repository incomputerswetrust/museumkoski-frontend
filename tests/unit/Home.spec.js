import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('Home renders to screen', () => {
    const wrapper = shallowMount(Home, {});
    expect(wrapper.exists()).toBeTruthy();
  });
});
