<script setup lang="ts">
import copy from 'copy-to-clipboard'

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true
  },
  messageIndex: {
    type: Number,
    required: true
  }
})

const snackbar = ref(false)
const snackbarText = ref('')
const showSnackbar = (text:string) => {
  snackbarText.value = text
  snackbar.value = true
}

const copyMessage = () => {
  copy(props.message.Body)
  showSnackbar('Copied!')
}

// TODO: Fix Icons
function selectMessageIcon(message: Message) {
  if (message.MessageType == 'assistant') {
    return "travel_explore"
  } else if (message.MessageType == 'system') {
    return "local_library"
  } else if (message.MessageType == 'user') {
    return "article"
  }
  return ""
}

const message_icon = selectMessageIcon(props.message)

</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        v-if="message_icon"
        variant="text"
        class="ma-2"
      >
          <v-icon :icon="message_icon"></v-icon>
      </v-btn>
    </template>
  </v-menu>
  <v-menu
  >
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          icon
          variant="text"
          class="mx-1 ma-2"
      >
        <v-icon icon="more_horiz"></v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          @click="copyMessage()"
          :title="$t('copy')"
          prepend-icon="content_copy"
      >
      </v-list-item>
    </v-list>
  </v-menu>

  <v-snackbar
      v-model="snackbar"
      location="top"
      timeout="2000"
  >
    {{ snackbarText }}
  </v-snackbar>
</template>

<style scoped>

</style>
