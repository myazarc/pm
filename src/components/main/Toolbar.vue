<template>
   <v-toolbar app fixed clipped-left>

      <v-toolbar-title v-html="title">Application</v-toolbar-title>
      <slot/>
    </v-toolbar>
</template>

<script>
export default {
  props: ['title'],
};
</script>

