<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useApi, useSocket } from '@/composables'
import { Channel } from '@/types'
import { Ping } from '@generated/types'

const localPingCount = ref(0)
const remotePingCount = ref(0)
const hasPonged = ref(false)

const {
  execute: executePing,
  isLoading: isPinging,
  onSuccess: onPingCreateSuccess,
  onFailure: onPingCreateFailure,
} = useApi<Ping>('ping', { method: 'POST' })

const {
  execute: requestPingIndex,
  onSuccess: onPingIndexSuccess,
  onFailure: onPingIndexFailure,
} = useApi<Ping>('ping', { method: 'GET' })

const { onReceived: onPingReceived } = useSocket<Ping>(Channel.PingChannel)

const handlePing = () => {
  localPingCount.value++
  hasPonged.value = false

  executePing()
}

onMounted(() => requestPingIndex())

onPingCreateSuccess(() => hasPonged.value = true)
onPingCreateFailure((error) => console.error('Ping error', error))

onPingIndexSuccess((pingData) => remotePingCount.value = pingData.count)
onPingIndexFailure(error => console.error('Ping index error', error))

onPingReceived((remotePing: Ping) => remotePingCount.value = remotePing.count)
</script>

<template>
  <div class="text-slate-200 text-center">
    <button
      class="bg-cyan-700 hover:bg-cyan-800 active:bg-cyan-900 active:ring-slate-900 px-16 py-4 font-bold rounded"
      @click="handlePing"
    >
      Ping
    </button>
    <div class="mt-2 italic">
      <span v-if="isPinging">
        Pinging...
      </span>
      <span v-if="hasPonged">
        Pong!
      </span>
    </div>
    <div class="mt-2">
      <p>
        Local Ping Count: {{ localPingCount }}.
      </p>
      <p>
        Remote Ping Count: {{ remotePingCount }}.
      </p>
    </div>
  </div>
</template>