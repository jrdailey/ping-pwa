<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }

    return {
      count,
      increment,
    }
  },
}
</script>
