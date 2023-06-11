<template>
  <div class="addproduct">
    <form @submit.prevent="updateProduct" class="form login">
      <h2>Edit Product</h2>
      <input type="text" v-model="updatedProduct.name" placeholder="Name" class="form__input" required>
      <span class="error" v-if="formErrors.name">{{ formErrors.name[0] }}</span>

      <textarea v-model="updatedProduct.description" placeholder="Description" class="form__input"></textarea>
      <span class="error" v-if="formErrors.description">{{ formErrors.description[0] }}</span>

      <input type="text" v-model="updatedProduct.size" placeholder="Size" class="form__input">
      <span class="error" v-if="formErrors.size">{{ formErrors.size[0] }}</span>

      <div class="but">
        <button type="submit" class="btn btn-success waves-effect waves-light col-5">Update</button>
        <button @click="cancelUpdate" class="btn btn-warning waves-effect waves-light col-5">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      updatedProduct: {
        id: null,
        name: '',
        description: '',
        size: ''
      },
      formErrors: {}
    };
  },
  mounted() {
    this.updatedProduct.id = this.product.id;
    this.updatedProduct.name = this.product.name;
    this.updatedProduct.description = this.product.description;
    this.updatedProduct.size = this.product.size;
  },
  methods: {
    updateProduct() {
      const productId = this.updatedProduct.id; 
      axios.put(`/products/${productId}`, this.updatedProduct)
        .then(response => {
          this.$emit('productUpdated', response.data); 
          this.resetForm();
        })
        .catch(error => {
          if (error.response && error.response.status === 422) {
            this.formErrors = error.response.data.errors;
            console.log(this.formErrors);
          } else {
            console.error(error);
          }
        });
    },
    cancelUpdate() {
      this.$emit('cancelUpdate'); 
    },
    resetForm() {
      this.updatedProduct = {
        id: null,
        name: '',
        description: '',
        size: ''
      };
    }
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