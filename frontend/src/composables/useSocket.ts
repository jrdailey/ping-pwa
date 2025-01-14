import { onDeactivated, onMounted, reactive, ref } from 'vue'
import { Channel } from '@/types'
import consumer from '@/cable'

interface SocketCallbacks<MessageData> {
  onReceived: ((data: MessageData) => void) | null;
}

export const useSocket = <MessageData>(channel: Channel) => {
  // Callbacks storage
  const callbacks: SocketCallbacks<MessageData> = reactive({
    onReceived: null,
  })
  // Register received callback
  const onReceived = (callback: (data: MessageData) => void) => {
    callbacks.onReceived = callback
  }
  const subscription = ref()

  onMounted(() => {
    subscription.value = consumer.subscriptions.create(
      { channel },
      {
        received: callbacks.onReceived,
      }
    )
  })

  onDeactivated(() => {
    if (subscription.value) {
      consumer.subscriptions.remove(subscription.value)
    }
  })

  return {
    onReceived,
  }
}
