import { createApp } from "vue";
import App from "./App.vue";
import MISAResource from "./assets/js/base/resource.js";
import MISAEnum from "./assets/js/base/enum.js";
import MISACommon from "./assets/js/base/common.js";
import vueRouter from "./router/router";
import vueEmitter from "tiny-emitter/instance";
import axios from "axios";
//vuetify
// import  "vuetify/dist/vuetify.min.css"
import "vuetify/styles";
// import { createVuetify } from 'vuetify/lib/framework.mjs'
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(vueRouter);
app.use(vuetify);
app.config.globalProperties.$_MISAResource = MISAResource;
app.config.globalProperties.$_MISAEnum = MISAEnum;
app.config.globalProperties.$_MISACommon = MISACommon;
app.config.globalProperties.$_axios = axios;
app.config.globalProperties.vueEmitter = vueEmitter;
app.mount("#app");
