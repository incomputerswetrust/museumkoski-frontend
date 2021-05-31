import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import MainNav from '@/components/Navigation/MainNav.vue';
import Vuetify from 'vuetify';

describe('MainNav.vue', () => {
  describe('MainNAv - View Tests', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowMount(MainNav, {});
    });
    it(`renders properly`, () => {
      expect(wrapper.exists()).toBeTruthy();
    });
    it(`should render an h1 to screen`, () => {
      const h1 = wrapper.find('h1');
      expect(h1.exists()).toBeTruthy();
    });
    it(`should render a button with an icon (mdi-menu) for smaller screens`, () => {
      const menuButton = wrapper.find('v-btn-stub');
      const menuIcon = wrapper.find('v-icon-stub');
      expect(menuButton.exists()).toBeTruthy();
      expect(menuIcon.exists()).toBeTruthy();
      expect(menuIcon.text()).toBe('mdi-menu');
    });
    it(`button should also have a title for accesibility`, () => {
      const btn = wrapper.find('[title="Menu toggle button"]');
      expect(btn.exists()).toBeTruthy();
    });
    it(`should swap the icon base on menu status`, async () => {
      const menuButton = wrapper.find('v-btn-stub');
      const menuIcon = wrapper.find('v-icon-stub');
      expect(menuIcon.text()).toBe('mdi-menu');
      menuButton.trigger('click');
      await wrapper.vm.$nextTick();
      expect(menuIcon.text()).toBe('mdi-close-thick');
    });
  });
  describe('MainNAv - Functionality Tests', () => {
    //handling the vuetify issues and attaching it
    const localVue = createLocalVue();
    localVue.use(Vuetify);
    const exec = () => {
      return mount(MainNav, {
        localVue,
        vuetify: new Vuetify({}),
      });
    };
    beforeEach(() => jest.clearAllMocks());
    it(`should call handleExpanded on click (display value should be turned to true)`, async () => {
      const spy = jest.spyOn(MainNav.methods, 'handleExpanded');
      const wrapper = exec();
      expect(wrapper.vm.$data.display).toBeFalsy();
      const btn = wrapper.find('[title="Menu toggle button"]');
      btn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.display).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
    it(`should change the display value from true back to false`, async () => {
      const wrapper = exec();
      expect(wrapper.vm.$data.display).toBeFalsy();
      const btn = wrapper.find('[title="Menu toggle button"]');
      btn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.display).toBeTruthy();
      btn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.$data.display).toBeFalsy();
    });
    it(`should set height based on menu open or closed`, async () => {
      const wrapper = exec();
      await wrapper.setData({ display: true });
      expect(wrapper.vm.$data.height).not.toBe('60px');
      await wrapper.setData({ display: false });
      expect(wrapper.vm.$data.height).toBe('60px');
    });
    it(`should render a list of items when the menu is in open state`, async () => {
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const menu = wrapper.find('.expanded');
      expect(menu.exists()).toBeTruthy();
      const menuItems = wrapper.findAll('.menu-btn');
      expect(menuItems.length).toBeGreaterThan(3);
    });
    it(`render an button for access to admin account`, async () => {
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const menu = wrapper.find('.expanded');
      expect(menu.exists()).toBeTruthy();
      const adminBtn = wrapper.find('[title="Button for admin account login"]');
      expect(adminBtn.exists()).toBeTruthy();
    });
    it(`should only render one account btn`, async () => {
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const menu = wrapper.find('.expanded');
      expect(menu.exists()).toBeTruthy();
      const adminBtn = wrapper.findAll(
        '[title="Button for admin account login"]',
      ).length;
      expect(adminBtn).toBe(1);
    });
    it(`should emit the route when a menu item is pressed`, async () => {
      const spy = jest.spyOn(MainNav.methods, 'handleMenuSelect');
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const sampleMenuList = ['Place', 'Slogan'];
      await wrapper.setData({ menuList: sampleMenuList });
      const firstSelection = wrapper.find(
        `[title="Button for route ${sampleMenuList[0]}"]`,
      );
      expect(firstSelection.exists()).toBeTruthy();
      firstSelection.trigger('click');
      expect(spy).toHaveBeenCalled();
      expect(wrapper.emitted().selection[0][0]).toBe(sampleMenuList[0]);
    });
    it(`should emit AdminLogin when the acount btn is clicked`, async () => {
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const sampleMenuList = ['Place', 'Slogan'];
      await wrapper.setData({ menuList: sampleMenuList });
      const adminBtn = wrapper.find('[title="Button for admin account login"]');
      expect(adminBtn.exists()).toBeTruthy();
      adminBtn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted().selection[0][0]).toBe('AdminLogin');
    });
    it(`sets the height if window width is < 762`, async () => {
      global.innerWidth = 700;
      global.dispatchEvent(new Event('resize'));
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const calculation = wrapper.vm.$data.menuList.length * 52;
      expect(wrapper.vm.$data.height).toBe(`${calculation}px`);
    });
    it(`sets the height if window width is < 762 and display turned off`, async () => {
      global.innerWidth = 700;
      global.dispatchEvent(new Event('resize'));
      const wrapper = exec();
      await wrapper.setData({ display: true });
      const calculation = wrapper.vm.$data.menuList.length * 52;
      expect(wrapper.vm.$data.height).toBe(`${calculation}px`);
      await wrapper.setData({ display: false });
      expect(wrapper.vm.$data.height).toBe(`60px`);

    });
  });
});
