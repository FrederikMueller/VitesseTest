<script setup lang="ts">
import { useTheme } from 'vuetify'
import MainScreen from "~/pages/MainScreen.vue";

const theme = useTheme()
function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

<template>
  <v-app>
    <v-app-bar :elevation="2" rounded>
      <v-toolbar-title class="text-green-darken-3 font-weight-bold">gkk Chatbot 0.1.0</v-toolbar-title>
      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
        </select>
      </div>
      <v-btn @click="toggleTheme" icon="mdi-brightness-4"></v-btn>
    </v-app-bar>
    <v-layout class="rounded rounded-md">
      <v-main class="d-flex align-center justify-center" style="min-height: 1200px;">
        <MainScreen></MainScreen>
      </v-main>
    </v-layout>
    <Footer></Footer>
  </v-app>
</template>
