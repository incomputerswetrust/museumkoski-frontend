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
      v-btn(icon class="admin-btn" color="white" title="Button for admin account login" @click.prevent="handleMenuSelect('AdminLogin')")
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
      const windowWidth = window.innerWidth;
      if (windowWidth < 760) {
        if (value) {
          this.height = `${this.menuList.length * 52}px`;
        } else {
          this.height = '60px';
        }
      } else {
        if (value) {
          this.height = `${this.menuList.length * 33}px`;
        } else {
          this.height = '60px';
        }
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

@media screen and (min-width: 320px) and (max-width: 460px) {
  nav button {
    margin-left: 0.7rem;
  }
}
@media screen and (min-width: 500px) and (max-width: 740px) {
  nav button {
    margin-left: 4em;
  }
}
@media screen and (min-width: 800px) and (max-width: 820px) {
  nav button {
    margin-left: 8em;
  }
}
@media screen and (min-width: 768px) and (max-width: 2000px) {
  nav button {
    margin-left: 8em;
  }
  nav {
    .expanded {
      margin-left: -5rem;
      display: grid;
      grid-template-columns: repeat(3, 0.2fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      .admin-btn {
        grid-row-start: 3;
        grid-column-start: 2;
      }
    }
  }
}
@media screen and (min-width: 1024px) and (max-width: 1366px) {
  nav button {
    margin-left: 12em;
  }
}

@media screen and (min-width: 1366px) and (max-width: 1366px) {
  nav button {
    margin-left: 18em;
  }
  nav {
    .expanded {
      margin-left: -5rem;
      display: grid;
      grid-template-columns: repeat(3, 0.2fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      .admin-btn {
        grid-row-start: 3;
        grid-column-start: 2;
      }
    }
  }
}
@media screen and (min-width: 1304px) and (max-width: 1200px) {
  nav button {
    margin-left: 15em;
  }
  nav {
    .expanded {
      margin-left: -5rem;
      display: grid;
      grid-template-columns: repeat(3, 0.2fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
      .admin-btn {
        grid-row-start: 3;
        grid-column-start: 2;
      }
    }
  }
}
@media screen and (min-width: 1364px) and (max-width: 2000px) {
  nav button {
    margin-left: 10em;
  }
  nav {
    .expanded {
      margin-left: -5rem;
      display: grid;
      grid-template-columns: repeat(3, 0.2fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
    }
  }
}
@media screen and (min-width: 1700px) {
  nav button {
    margin-left: 28em;
  }
  nav {
    .expanded {
      margin-left: -5rem;
      display: grid;
      grid-template-columns: repeat(4, 0.2fr);
      grid-column-gap: 10px;
      grid-row-gap: 10px;
    }
  }
}
</style>
