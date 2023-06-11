<template>
  <div class="first">
    <h1 class="name">Abdellah El Qodsi</h1>
    <h2 class="codeing">coding challenge</h2>
    <p class="mission">Challenge 1: Product Management
Develop a product management web application using Laravel and Vue.js. The
application should allow users to store and manage their products. Implement the
following features:<br />
1. User authentication and authorisation.<br />
2. Ability to add, edit, and delete products with details like name, description, size …<br />
3. Display a list of products with search and pagination functionality.<br />
4. Implement basic validation to ensure required product fields are filled.<br />
5. Enable users to filter products based on specific criteria (e.g., name, type …).</p>
<a href="./home" class="btn btn-success waves-effect waves-light col-5">Home Page</a>
  </div>
</template>

<script>
import router from '@/router.js';

export default {
    name: 'ExampleComponent',
};
</script>
<style scoped>
.first{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 100px;
    border: 10px solid white;
    padding: 100px;
}
.name{
  color: white;
    font-size: 48px;
    font-weight: 600;
}
.codeing{
  color: white;
    font-size: 40px;
    font-weight: 400;
}
.mission{
  font-size: 22px;
    text-align: center;
    color: white;
}
</style>
