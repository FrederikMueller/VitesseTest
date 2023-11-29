<template>
    <v-app>
      <v-layout class="rounded rounded-md">
        <v-main class="d-flex align-center justify-center" style="min-height: 1200px;">
          <index></index>
        </v-main>
      </v-layout>
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
  </v-app>
</template>
<script setup lang="ts">
import Index from "~/pages/index.vue";
const icons = [
  {
    name: "linkedin",
    icon: "mdi-linkedin",
    link: "https://www.edin.com/company/gkk-dialoggroup-gmbh"
  },
  {
    name: "instagram",
    icon: "mdi-instagram",
    link: "https://www.instagram.com/gkkdialoggroup/"
  },
  {
    name: "facebook",
    icon: "mdi-facebook",
    link: "https://www.facebook.com/gkkdialoggroup"
  }];
</script>
