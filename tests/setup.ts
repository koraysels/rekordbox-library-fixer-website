import { vi } from 'vitest'

// Mock the platform library if needed
vi.mock('platform', () => ({
  default: {
    os: {
      family: 'OS X'
    }
  }
}))

// Setup fetch mock globally
global.fetch = vi.fn()