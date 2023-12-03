<script setup lang="ts">
import { useMessageStore } from "~/store/messageStore";

const store = useMessageStore();
</script>

<template>
    <v-main v-if="true">
      <Welcome v-if="!store.conversationStarted"/>
      <Conversation/>
    </v-main>
</template>
