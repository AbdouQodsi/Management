import './bootstrap.js';
import { createApp } from 'vue';
import loginComonent from './components/LoginComponent.vue';
import mainComponent from './components/ExampleComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import Product from './components/Product.vue';
import AddProduct from './components/AddProduct.vue';
import Updateproduct from './components/Updateproduct.vue';
import router from './router.js';

const app = createApp({});

app.component('login', loginComonent);
app.component('maincomponent', mainComponent);
app.component('register-component', RegisterComponent);
app.component('product', Product);
app.component('addproduct', AddProduct);
app.component('updateproduct', Updateproduct);
app.use(router);
app.mount('#app');
