<script setup>
import { ref, reactive } from 'vue'
import http from '@/services/http.js'
import { useAuth } from '@/stores/auth.js'
import router from '@/router/index.js'

import * as bootstrap from 'bootstrap';

window.bootstrap = bootstrap;

const auth = useAuth()
const user = reactive({})

async function login() {
    const userName = user.user
    const password = user.password

    const dataUser = reactive({
        "user": userName,
        "password": password
    })

    try {
        const response = await http.post('/login', dataUser)

        await auth.setToken(response?.data.token)
        await auth.setUser(userName)

        router.push("/home");

    } catch (error) {
        var myToast = new bootstrap.Toast(document.getElementById('myToast'), {
            autohide: true,
            delay: 3500,
        });
        myToast.show();
    }


}
</script>

<template>
    <div class="menu-login">
        <div class="card " style="width: 18rem;">
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Usuário</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="user.user">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password">
                    </div>
                    <button type="submit" class=" submit btn btn-primary">Entrar</button>
                </form>
            </div>
        </div>
      
    </div>
    <div>
        <div class="toast" id="myToast">
            <div class="toast-header">
                <strong class="me-auto"><i class="bi-gift-fill"></i> Falha ao entrar</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                Usuário ou Senha inválidos! <a href="#"></a>
            </div>
        </div>
    </div>
</template>


<style scoped>
.menu-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/login.jpg');
    background-size: cover;
}

.submit {
    background-color: rgb(57, 176, 192);
    border-color: rgb(57, 176, 192);
    /* margin-top: 1em; */
    margin: auto;
    display: flex;

}

.toast {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1em;
    background-color: rgb(248, 115, 115);
}
</style>
```