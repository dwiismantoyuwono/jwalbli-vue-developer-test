import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,
  plugins: [
    typography(),
  ],
})
