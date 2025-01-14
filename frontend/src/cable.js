import { createConsumer } from '@rails/actioncable'

const wsUrl = import.meta.env.VITE_WS_URL
const consumer = createConsumer(wsUrl)

export default consumer
