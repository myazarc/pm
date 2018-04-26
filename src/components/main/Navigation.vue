<template>
         <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
                         right
      app
    >
      <slot/>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
