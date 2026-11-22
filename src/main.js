import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/main.scss';

async function start() {
  const app = createApp(App);
  const baseUrl = new URL(import.meta.env.BASE_URL, location.origin);
  const callback = new URL(location.href);
  const isCodeQaCallback =
    callback.pathname === baseUrl.pathname &&
    (callback.searchParams.has('code') || callback.searchParams.has('error'));

  if (isCodeQaCallback) {
    const { codeQaAuth } = await import('./lib/codeQa');
    const result = callback.searchParams.has('code') ? await codeQaAuth?.auth.getSession() : null;
    app.use(router);
    await router.isReady();
    await router.replace({
      name: 'tools-code-qa',
      query: result?.data.session ? {} : { login: 'failed' }
    });
  } else {
    app.use(router);
  }

  app.mount('#app');
}

void start();
