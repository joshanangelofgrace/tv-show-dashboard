import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import tvShowDetailItem from '../components/tvShowDetailItem.vue'

describe('tvShowDetailItem', () => {
  it('renders tvShowDetailItem', () => {
    const wrapper = mount(tvShowDetailItem, { props: {
      label: 'Title',
      item: 'TV Show Title',
    }})
    expect(wrapper.text()).toContain('Title')
  })
})
