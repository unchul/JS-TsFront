import { createApp, h } from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import 'vuetify/styles' // Vuetify의 기본 스타일
import '@mdi/font/css/materialdesignicons.css' // 아이콘 폰트

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

import { createVuetify } from 'vuetify/lib/framework.mjs'
import { createPinia } from 'pinia'
import router from './router'

let app: VueApp<Element> | null = null;

export const vueAccountAppMount = (el: string | Element, eventBus: any) => {
    loadFonts().then(() => {
        const vuetify = createVuetify({
            components: {
                ...components,
                ...labsComponents,
            },
            directives: {
                ...directives,
            },
        });

        app = createApp({
            render: () => h(App, { eventBus }),
        });

        const pinia = createPinia();
        app.use(vuetify).use(router).use(pinia);
        app.provide('eventBus', eventBus);

        eventBus.on('vue-account-routing-event', (path: string) => {
            if (router.currentRoute.value.fullPath !== path) {
                router.push(path);
            }
        });
        app.mount(el);
    });
};

export const vueAccountAppUnmount = () => {
    if (app) {
        app.unmount();
        app = null;
    }
};