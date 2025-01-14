import { describe, expect, it } from 'vitest'
import SimpleCounter from '../../src/components/SimpleCounter.vue'
import { mount } from '@vue/test-utils'

describe('SimpleCounter.vue', () => {
  it('renders the initial count', () => {
    const wrapper = mount(SimpleCounter)
    expect(wrapper.text()).toContain('0')  // The initial count is 0
  })

  it('increments the count when clicked', async () => {
    const wrapper = mount(SimpleCounter)
    const button = wrapper.find('button')

    // Simulate a click on the button
    await button.trigger('click')

    // Assert that the count has been incremented
    expect(wrapper.text()).toContain('1')
  })
})
