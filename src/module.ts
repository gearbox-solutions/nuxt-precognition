import { defineNuxtModule, createResolver, addImportsDir, addServerImportsDir } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-precognition',
    configKey: 'nuxtPrecognition',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addImportsDir(resolver.resolve('./runtime/composables'))
    addServerImportsDir(resolver.resolve('./runtime/server/utils'))

    _nuxt.hook('vite:extendConfig', (config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || []

      const lodashIndex
        = config.optimizeDeps.exclude.indexOf('lodash')
      if (lodashIndex > -1) {
        config.optimizeDeps.exclude.splice(lodashIndex, 1)
      }

      if (!config.optimizeDeps.include.includes('lodash')) {
        config.optimizeDeps.include.push('lodash')
      }
    })
  },
})
