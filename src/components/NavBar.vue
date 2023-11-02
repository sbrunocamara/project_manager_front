<script setup>
import router from '@/router/index.js'
import { useAuth } from '@/stores/auth.js'
const auth = useAuth()

function logout(){
  auth.resetSession();
  router.push("/login");
  }

</script>

<template>
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="nav ">
        <li class="nav-item">
          <a class="nav-link btn btn-primary " aria-current="page" href="/home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link btn btn-primary " aria-current="page" href="/user">Usuários</a>
        </li>
      </ul>
      <button type="button" @click=logout(); class="logout btn btn-primary ms-auto me-4">Logout</button>
    </div>
  </div>
</nav>
</template>

<style scoped>

.nav-link{
  padding: 0.375rem 0.75rem;
  background-color: rgb(57, 176, 192);
  margin: 0 0.4em;
  color: #ffffff;
  border-color: rgb(57, 176, 192);
}

.btn-primary:hover {
  background-color: #0ed8d8;
  color: rgb(255, 255, 255);
  
  
}

.logout:hover{
  background-color: #fc7100;
  border-color: rgb(190, 86, 0);
}
.logout{
  background-color: rgb(190, 86, 0);
  border-color: rgb(190, 86, 0);
  

}
</style>
```