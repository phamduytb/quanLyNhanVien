import { createApp } from 'vue'
import App from './App.vue'
import MISAResource from './lib/resource.js'
import MButton from '@/components/base/button/MButton.vue'
import MTextfield from '@/components/base/input/textfield/MTextfield.vue'
import MCheckBox from '@/components/base/input/checkbox/MCheckbox.vue'
import MRadio from '@/components/base/input/radio/MRadio.vue'
import MDialogError from '@/components/base/dialog/MDialogError.vue'
import MDialogWarning from '@/components/base/dialog/MDialogWarning.vue'
import MToast from '@/components/base/toast/MToast.vue'

const app = createApp(App);
app.component("MButton", MButton);
app.component("MTextfield", MTextfield);
app.component("MCheckBox", MCheckBox);
app.component("MRadio", MRadio);
app.component("MDialogError", MDialogError);
app.component("MDialogWarning", MDialogWarning);
app.component("MToast", MToast);
app.config.globalProperties.MISAResource = MISAResource;
app.mount('#app');
