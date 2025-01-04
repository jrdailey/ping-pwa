<script lang="ts" setup>
import { ref } from 'vue'

const localPingCount = ref(0)
const remotePingCount = ref(0)
const isPinging = ref(false)
const hasPonged = ref(false)

const handlePing = () => {
  localPingCount.value++
  isPinging.value = true
}
</script>

<template>
  <div class="text-slate-200 text-center">
    <button
      class="bg-cyan-700 px-8 py-4 font-bold rounded"
      @click="handlePing"
    >
      Ping
    </button>
    <p v-if="isPinging">
      Pinging...
    </p>
    <p v-if="hasPonged">
      Pong!
    </p>
    <p>
      Local Ping Count: {{ localPingCount }}.
    </p>
    <p>
      Remote Ping Count: {{ remotePingCount }}.
    </p>
  </div>
</template>