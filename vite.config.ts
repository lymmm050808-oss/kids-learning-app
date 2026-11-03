import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const demoMode = env.VITE_DEMO_MODE === 'true'
  return {
    base: demoMode ? '/kids-learning-app/' : '/',
    envPrefix: demoMode ? ['VITE_DEMO_MODE'] : 'VITE_',
    define: demoMode ? {
      'import.meta.env.VITE_SUPABASE_URL': 'undefined',
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': 'undefined',
    } : undefined,
    plugins: [react()],
  }
})
