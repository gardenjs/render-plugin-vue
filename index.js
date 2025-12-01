async function create(setup) {
  try {
    const { createApp } = await import('vue')
    const { default: VueApp } = await import('./src/VueRenderer.vue')

    let app = createApp(VueApp)
    setup?.(app)
    app.mount('#garden_app')
    return {
      destroy: () => app?.unmount?.(),
      updateComponent: (props) => {
        app?.unmount()
        app = createApp(VueApp, { ...props })
        setup?.(app)
        app.mount('#garden_app')
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default { create }
