<template>
  <div>
    <div class="top login m-3" v-if="isTop" >
      <input v-model="searchQuery" type="text" placeholder="Search products" class="bordr col-6" />
      <button  @click="showForm" class="btn btn-success waves-effect waves-light col-2">Add Product</button>
    </div>

    <add-product v-if="isFormVisible" @productAdded="onProductAdded" @cancelAddProduct="cancelAddProduct" />

    <table class="table table-dark mb-0 m-3" style="width: 90%;" v-if="isTableVisible">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Size</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.size }}</td>
          <td>
            <button @click="editProduct(product)" class="btn btn-primary waves-effect waves-light" v-if="!isFormupdate" style="margin-right: 15px;">Edit</button>
            <button @click="deleteProduct(product.id)" class="btn btn-danger waves-effect waves-light">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <update-product v-if="isFormupdate" :product="selectedProduct" @productUpdated="onProductUpdated" @cancelUpdate="cancelUpdate" />
  </div>
</template>

<script>
import AddProduct from './AddProduct.vue';
import UpdateProduct from './Updateproduct.vue';

export default {
  data() {
    return {
      searchQuery: '',
      isFormVisible: false,
      isTableVisible: true,
      products: [],
      isFormupdate: false,
      isTop: true,
      selectedProduct: null
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    filteredProducts() {
      if (this.searchQuery) {
        console.log('Search Query:', this.searchQuery);
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        const filtered = this.products.filter(product => {
          return (
            product.name.toLowerCase().includes(lowerCaseQuery) ||
            product.description.toLowerCase().includes(lowerCaseQuery) ||
            product.size.toLowerCase().includes(lowerCaseQuery)
          );
        });
        console.log('Filtered Products:', filtered);
        return filtered;
      } else {
        // Return all products if search query is empty
        return this.products;
      }
    },
  },
  methods: {
    fetchProducts() {
      axios
        .get('/products')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    showForm() {
      this.isFormVisible = true;
      this.isTableVisible = false; 
      this.isTop = false;
    },
    onProductAdded(product) {
      this.products.push(product);
      this.cancelAddProduct();
    },
    cancelAddProduct() {
      this.isFormVisible = false;
      this.isTableVisible = true;
      this.isTop = true;
    },
    editProduct(product) {
      this.isFormupdate = true;
      this.isTableVisible = false;
      this.isTop = false;
      this.selectedProduct = product;
    },
    onProductUpdated(updatedProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products.splice(index, 1, updatedProduct);
      }
      this.cancelUpdate();
    },
    cancelUpdate() {
      this.isFormupdate = false;
      this.isTableVisible = true;
      this.isTop = true;
      this.selectedProduct = null;
    },
    deleteProduct(productId) {
      axios
        .delete(`/products/${productId}`)
        .then(response => {
          this.products = this.products.filter(product => product.id !== productId);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
  components: {
    AddProduct,
    UpdateProduct
  }
};
</script>

<style scoped>
.bordr{
  border-radius: 10px;
}
.top{
      display: flex;
    align-items: stretch;
    flex-direction: row;
    gap: 40px;
}
.addproduct{
display: flex;
    flex-direction: column;
        justify-content: center;
    align-items: center;

}
.but{
  display: flex;
    flex-direction: row;
    justify-content: space-between;
        width: 150%;
}
/* modules/form.css */

input , textarea{
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: background-color 0.3s;
}

input[type="submit"] {
  cursor: pointer;
}

.form {
  display: grid;
  grid-gap: var(--formGap);
}

.form input[type="password"],
.form input[type="text"],
.form input[type="submit"] ,
textarea{
  width: 150%;
}

.form__field {
  display: flex;
      padding-bottom: 20px;

}

.form__input {
  flex: 1;
      margin-bottom: 15px;
}

/* modules/login.css */

.login {
  color: var(--loginColor);
  margin-top: 35px;
}

.login label,
.login input[type="text"],
.login input[type="password"],
.login input[type="submit"],
textarea {
  border-radius: var(--loginBorderRadus);
  padding: 1rem;
}

.login label {
  background-color: var(--loginLabelBackgroundColor);
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.login input[type="password"],
.login input[type="text"],
textarea{
  background-color: var(--loginInputBackgroundColor);
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.login input[type="password"]:focus,
.login input[type="password"]:hover,
.login input[type="emtextail"]:focus,
.login input[type="text"]:hover,
textarea {
  background-color: var(--loginInputHoverBackgroundColor);
}

.login input[type="submit"] {
  background-color: var(--loginSubmitBackgroundColor);
  color: var(--loginSubmitColor);
  font-weight: 700;
  text-transform: uppercase;
}

.login input[type="submit"]:focus,
.login input[type="submit"]:hover {
  background-color: var(--loginSubmitHoverBackgroundColor);
}

/* modules/text.css */

p {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.text--center {
  text-align: center;
}

</style>