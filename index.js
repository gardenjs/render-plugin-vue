async function create() {
  try {
    const { createApp } = await import('vue')
    const { default: VueApp } = await import('./src/VueRenderer.vue')

    let app = createApp(VueApp)
    app.mount('#garden_app')
    return {
      destroy: () => app?.unmount?.(),
      updateComponent: (props) => {
        app?.unmount()
        app = createApp(VueApp, { ...props })
        app.mount('#garden_app')
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default { create }
