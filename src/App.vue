<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
$background: rgba(75, 100, 110, 0.849);
body {
  background: $background;
}
.v-application--wrap {
  background: $background;
}
// Better naming >< needs to be done
:root {
  --color-bgcomplimatary: rgba(67, 81, 92, 0.849);
  --color-background: $background;
}
</style>
