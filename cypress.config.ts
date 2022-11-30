import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)
      
          return null
        },
      })
    },
  },
  viewportWidth: 1536,
  viewportHeight: 864
});
