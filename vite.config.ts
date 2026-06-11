import { defineConfig, mergeConfig } from 'vite'
import base from './vite.base.config'
import dev from './vite.dev.config'
import prod from './vite.prod.config'

export default defineConfig(({ mode }) => {
  const envConf = mode === 'development' ? dev : prod
  // 深度合并，数组自动追加，而非覆盖
  return mergeConfig(base, envConf)
})
