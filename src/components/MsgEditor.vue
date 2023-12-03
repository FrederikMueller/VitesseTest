<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  sendMessage: {
    type: Function as PropType<(message: Message) => void>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const message = ref('')
const rows = ref(1)
const autoGrow = ref(true)

const hint = computed(() => {
  return t('pressEnterToSendYourMessageOrShiftEnterToAddANewLine')
})

watchEffect(() => {
  const lines = message.value.split(/\r\n|\r|\n/).length
  if (lines > 8) {
    rows.value = 8
    autoGrow.value = false
  } else {
    rows.value = 1
    autoGrow.value = true
  }
})

const send = () => {
  let msg = message.value
  // remove the last "\n"
  if (msg[msg.length - 1] === "\n") {
    msg = msg.slice(0, -1)
  }
  if (msg.length > 0) {
    props.sendMessage({TimeStamp: Date.now().toString(), Body: msg, MessageType: 'user'})
  }
  message.value = ""
}

const textArea = ref()
const usePrompt = (prompt:string) => {
  message.value = prompt
  textArea.value.focus()
}

const clickSendBtn = () => {
  send()
}

const enterOnly = (event:any) => {
  event.preventDefault();
  send()
}
</script>

<template>
  <div
      class="flex-grow-1 d-flex align-center justify-space-between"
  >
    <v-textarea
        ref="textArea"
        v-model="message"
        :label="$t('messageLabel.chat')"
        :placeholder="hint"
        :rows="rows"
        max-rows="8"
        :auto-grow="autoGrow"
        :disabled="disabled"
        :loading="loading"
        :hide-details="true"
        clearable
        variant="outlined"
        class="userinputmsg"
        @keydown.enter.exact="enterOnly"
    ></v-textarea>
    <v-btn
        :disabled="loading"
        icon="mdi-send"
        title="Send"
        class="ml-3"
        @click="clickSendBtn"
    ></v-btn>
  </div>
</template>
