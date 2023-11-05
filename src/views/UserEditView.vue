<script>
import http from '@/services/http.js'
import * as bootstrap from 'bootstrap';

export default {
    name: 'userCreate',
    data() {
        return {
            model: {
                user: {
                    name: '',
                    user: '',
                    password: '',
                    privilegio: ''

                }
            }
        }
    },

    mounted() {

        this.getUserById(this.$route.params.id)

    },
    methods: {
        async updateUser() {
            try {
                const response = await http.put('/usuario/update/' + this.$route.params.id, this.model.user, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("token")
                    }
                }
                ).then(
                    res => {
                        this.$router.push('/user')


                        this.model.user = {
                            name: '',
                            user: '',
                            password: '',
                            privilegio: ''

                        }
                    }
                )
            } catch (error) {

                if (error.response.status == 401) {
                    var myToast = new bootstrap.Toast(document.getElementById('myToast'), {
                        autohide: true,
                        delay: 3500,
                    });
                    myToast.show();
                }

            }
        },

        async getUserById(id) {
            try {
                const response = await http.get('/usuario/get/' + id, {
                    headers: {
                        Authorization: `Bearer ` + localStorage.getItem("token")
                    }
                }
                ).then(
                    res => {
                        this.model.user = res.data.data[0]
                    }
                )
            } catch (error) {
                console.log(error)

            }


        }
    }
}
</script>
<script setup>
import NavBar from '@/components/NavBar.vue'
</script>
<template>
    <main>

        <NavBar />
    </main>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>
                    Editar usuário
                </h4>
            </div>
            <form @submit.prevent="updateUser">
                <div class="card-body">
                    <div class="mb-3">
                        <label>Nome</label>
                        <input type="text" class="form-control" v-model="model.user.name" required>
                    </div>
                    <div class="mb-3">
                        <label>Usuário</label>
                        <input type="text" class="form-control" v-model="model.user.user" required>
                    </div>
                    <!-- <div class="mb-3">
                    <label >Senha</label>
                    <input type="password" class="form-control" v-model="model.user.password" required>
                </div> -->
                    <div class="mb-3">
                        <label class="form-group col-md-1">Privilégio </label>
                        <select id="privilegio" name="privilegio" class="form-control" v-model="model.user.privilegio"
                            required>

                            <option value="1">Administrador</option>
                            <option value="2">Padrão</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <button type="submit" class="submit btn btn-primary">Salvar</button>
                    </div>

                </div>
            </form>
        </div>

    </div>
    <!-- Toast -->
    <div>
        <div class="toast" id="myToast">
            <div class="toast-header">
                <strong class="me-auto"><i class="bi-gift-fill"></i> Falha</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                Você não tem permissão para executar essa operação! <a href="#"></a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.toast {
    position: absolute;
    top: 0;
    right: 0;
    margin: 1em;
    background-color: rgb(233, 102, 102);
}

.toast-header {
    background-color: rgb(226, 56, 56);
}
</style>