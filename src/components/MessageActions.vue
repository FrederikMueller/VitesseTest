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

function selectMessageIcon(message: Message) {
  if (message.MessageType == 'assistant') {
    return "mdi-robot"
  } else if (message.MessageType == 'system') {
    return "mdi-information"
  } else if (message.MessageType == 'user') {
    return "mdi-account"
  }
  return ""
}

const message_icon = selectMessageIcon(props.message)

</script>

<template>
  <div class="d-inline-block">
    <v-btn
      :title="$t('messageType')"
      variant="text"
      :icon="message_icon"
    />
<!--    <v-btn-->
<!--      @click="copyMessage()"-->
<!--      :title="$t('copy')"-->
<!--      variant="text"-->
<!--      icon="mdi-content-copy"-->
<!--    />-->
  </div>

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
