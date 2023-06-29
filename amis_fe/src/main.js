import { createApp } from 'vue'
import App from './App.vue'
import MISAResource from './js/base/resource.js'
import MISAEnum from './js/base/enum.js'
import MISACommon from './js/base/common.js'
import CallApi from './js/api/callApi.js'
import MButton from '@/components/base/button/MButton.vue'
import MTextfield from '@/components/base/input/textfield/MTextfield.vue'
import MCheckBox from '@/components/base/input/checkbox/MCheckbox.vue'
import MRadio from '@/components/base/input/radio/MRadio.vue'
import MCombobox from '@/components/base/combobox/MCombobox.vue'
import MDialogError from '@/components/base/dialog/MDialogError.vue'
import MDialogWarning from '@/components/base/dialog/MDialogWarning.vue'
import MToast from '@/components/base/toast/MToast.vue'
import vueRouter from './router/router'
import vueEmitter from 'tiny-emitter/instance'
import axios from 'axios'

const app = createApp(App);
app.component("MButton", MButton);
app.component("MTextfield", MTextfield);
app.component("MCheckBox", MCheckBox);
app.component("MRadio", MRadio);
app.component("MCombobox", MCombobox);
app.component("MDialogError", MDialogError);
app.component("MDialogWarning", MDialogWarning);
app.component("MToast", MToast);
app.use(vueRouter);
app.config.globalProperties.MISAResource = MISAResource;
app.config.globalProperties.MISAEnum = MISAEnum;
app.config.globalProperties.MISACommon = MISACommon;
app.config.globalProperties.CallApi = CallApi;
app.config.globalProperties.axios = axios;
app.config.globalProperties.vueEmitter = vueEmitter;
app.mount('#app');
