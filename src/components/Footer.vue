<script setup lang="ts">
  const icons = [
    {
      name: "linkedin",
      icon: "mdi-linkedin",
      link: "https://www.linkedin.com/company/gkk-hx/mycompany/"
    },
    {
      name: "instagram",
      icon: "mdi-instagram",
      link: "https://www.instagram.com/gkk.hx/"
    },
    {
      name: "facebook",
      icon: "mdi-facebook",
      link: "https://www.facebook.com/gkkDialogGroup/"
    }];
</script>

<template>
  <v-footer class="d-flex flex-column">
    <v-spacer></v-spacer>
    <div class="px-4 py-2 text-center w-100">
      {{ new Date().getFullYear() }} — <strong>gkk DialogGroup GmbH</strong>
      <v-btn
        v-for="icon in icons"
        :key="icon.name"
        :href="icon.link"
        :icon="icon.icon"
        class="mx-1"
        variant="text"
        size="small"
      ></v-btn>
    </div>
  </v-footer>
</template>
