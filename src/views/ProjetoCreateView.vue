<script>
import http from '@/services/http.js'
import * as bootstrap from 'bootstrap';

export default {
    name: 'projectCreate',
    data() {
        return {
            model: {
                project: {
                    descricao: '',
                    usuario: ''
                }
            }
        }
    },
    methods : {
        async createProject(){

            this.model.project.usuario = localStorage.getItem("user")
            try {
                const response = await http.post('/projeto/add', this.model.project, {
                    headers: {
                        Authorization: `Bearer `+localStorage.getItem("token")
                    }
                }
                ).then(
                    res=>{
                        this.$router.push('/home')


                        this.model.project = {
                            descricao: '',
                            usuario: ''
                        
                        }
                    }
                )
            } catch (error) {
           
                if(error.response.status == 401){
            var myToast = new bootstrap.Toast(document.getElementById('myToast'), {
            autohide: true,
            delay: 3500,
          });
          myToast.show();
        }
                
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
                    Novo Projeto
                </h4>
            </div>
            <form  @submit.prevent="createProject">
            <div class="card-body">
                <div class="mb-3" >
                    <label >Descricão</label>
                    <input type="text" class="form-control" v-model="model.project.descricao" required>
                </div>
                <div class="mb-3">
                    <button type="submit" class="submit btn btn-primary" >Salvar</button>
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