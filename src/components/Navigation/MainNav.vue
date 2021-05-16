<template lang="pug">
nav(:style="{height}")
    .brand
        v-row
            v-col(cols="9")
                h1 This is a test title
            v-col(cols="3")
                v-btn(icon color="white" title="Menu toggle button" @click.native="handleExpanded")
                    v-icon {{ display ? 'mdi-close-thick' : 'mdi-menu'}}

    .expanded(v-if="display")
      .menu-btn(v-for="item in menuList" :key="item")
        v-btn(text color="white" :title="'Button for route ' + item " @click.prevent="handleMenuSelect(item)") {{ item }}
      v-btn(icon color="white" title="Button for admin account login" @click.prevent="handleMenuSelect('AdminLogin')")
        v-icon mdi-account-lock
</template>

<script>
export default {
  data: () => ({
    height: '60px',
    display: false,
    menuList: [
      'About',
      'Exhibits',
      'Events',
      'sights',
      'Information',
      'Location',
      'Contact',
    ],
  }),
  methods: {
    handleExpanded() {
      this.display = !this.display;
    },
    handleMenuSelect(item) {
      this.$emit('selection', item);
    },
  },
  watch: {
    display(value) {
      if (value) {
        this.height = `${this.menuList.length * 52}px`;
      } else {
        this.height = '60px';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding-top: 1rem;
  background: var(--color-bgcomplimatary);
  color: whitesmoke;
  width: 100vw;
}

nav .expanded {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

nav h1 {
  padding-left: 1rem;
}
nav button {
  margin-left: 1rem;
}
</style>
