import { reactive, ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL

interface ApiCallbacks<ApiData> {
  onSuccess: ((data: ApiData) => void) | null;
  onFailure: ((error: Error) => void) | null;
}

export type ApiOptions = {
  method: string,
}

export const defaultApiOptions = {
  method: 'GET'
}

export const useApi = <ApiData>(resourceName: string, options: ApiOptions) => {
  const resourceUrl = `${apiUrl}/${resourceName}`
  const apiOptions = {
    ...defaultApiOptions,
    ...options,
  }
  const isLoading = ref(false)

  // Callbacks storage
  const callbacks: ApiCallbacks<ApiData> = reactive({
    onSuccess: null,
    onFailure: null,
  })

  // Register success callback
  const onSuccess = (callback: (data: ApiData) => void) => {
    callbacks.onSuccess = callback
  }
  // Register failure callback
  const onFailure = (callback: (error: Error) => void) => {
    callbacks.onFailure = callback
  }
  // Execute fetch
  const execute = () => {
    isLoading.value = true

    fetch(resourceUrl, {
      method: apiOptions.method,
    })
    .then(response => response.json())
    .then(data => callbacks.onSuccess?.(data))
    .catch(error => callbacks.onFailure?.(error))
    .finally(() => isLoading.value = false)
  }

  return {
    execute,
    isLoading,
    onSuccess,
    onFailure,
  }
}
