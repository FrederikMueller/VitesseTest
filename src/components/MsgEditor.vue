<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  sendMessage: {
    type: Function,
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

const toolSelector = ref({
  list: [
    { title: "Chat", icon: "add", name: "chat", type: 0 },
  ],
  selected: 0,
})

const send = () => {
  let msg = message.value
  // remove the last "\n"
  if (msg[msg.length - 1] === "\n") {
    msg = msg.slice(0, -1)
  }
  if (msg.length > 0) {
    let item = toolSelector.value.list[toolSelector.value.selected]
    props.sendMessage({content: msg, tool: item.name, message_type: item.type})
  }
  message.value = ""
  toolSelector.value.selected = 0
}

const textArea = ref()
const usePrompt = (prompt) => {
  message.value = prompt
  textArea.value.focus()
}

const clickSendBtn = () => {
  send()
}

const enterOnly = (event) => {
  event.preventDefault();
  send()
}

defineExpose({
  usePrompt
})

const docDialogCtl = ref({
  dialog: false,
})
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
        icon="send"
        title="Send"
        class="ml-3"
        @click="clickSendBtn"
    ></v-btn>
  </div>
  <DocumentsManage
    :send-message="sendMessage"
    :control="docDialogCtl"
    ref="documentMan"
  />
</template>
