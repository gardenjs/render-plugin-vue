async function create(afterRenderHook) {
  try {
    const { createApp } = await import('vue')
    const { default: VueApp } = await import('./src/VueRenderer.vue')

    let app = createApp(VueApp, { afterRenderHook })
    app.mount('#garden_app')
    return {
      destroy: () => app?.unmount?.(),
      updateComponent: (props) => {
        app?.unmount()
        app = createApp(VueApp, { ...props, afterRenderHook })
        app.mount('#garden_app')
      },
    }
  } catch (e) {
    console.error(e)
  }
}

export default { create }
