<script>
import { RouterLink } from 'vue-router';
import http from '@/services/http.js'
import * as bootstrap from 'bootstrap';
import moment from 'moment'

export default {
  name: 'usuarios',

  data() {
    return {
      usuarios: [],
      modal: null,
      user_id: null
    }
  },

  mounted() {
    this.getUsers()
  },

  methods: {

    async getUsers() {

      try {

        const response = await http.get('/usuario/get', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(
          res => {
            this.usuarios = res.data.data
          }
        )
      } catch (error) {

      }

    },
    async confirmDelete(id){
      
      this.modal = new bootstrap.Modal(document.getElementById('exampleModal'),focus)
      this.modal.show()

      this.user_id = id
  
    },

    async deleteUser() {

        try {

          const response = await http.delete('/usuario/delete/' + this.user_id, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("token")
            }
          }
          ).then(
            res => {

            }
          )
          this.modal.hide()
          this.getUsers()
          var myToast = new bootstrap.Toast(document.getElementById('myToast'), {
            autohide: true,
            delay: 3500,
          });
          myToast.show();
        } catch (error) {

        }
      }
    },

}

</script>
<script setup>
import NavBar from '@/components/NavBar.vue'
</script>
<template>
  <main>

    <NavBar />
  </main>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Usuários
          <RouterLink to="/user/new" class="btn btn-primary float-end">Novo Usuário</RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Criado em</th>
              <th>Grupo</th>
              <th class="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in this.usuarios" :key="index">
              <td>{{ usuario.name }}</td>
              <td>{{ usuario.user }}</td>
              <td>{{ moment(usuario.created_at).format('DD/MM/YYYY') }}</td>
              <td>{{ usuario.grupo.descricao }}</td>
              <td class="actions">
                <RouterLink :to="{ path: '/user/edit/' + usuario.id }" class=" button_edit btn btn-success ">
                  Editar
                </RouterLink>
                <button type="button" @click="confirmDelete(usuario.id)" class=" button_edit btn btn-danger">
                  Excluir
                </button>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
  <!-- Toast -->
  <div>
    <div class="toast" id="myToast">
      <div class="toast-header">
        <strong class="me-auto"><i class="bi-gift-fill"></i> Removido</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        Usuário removido com sucesso! <a href="#"></a>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Você tem certeza?</h5>
          <button type="button" class="close" data-dismiss="modal" @click="this.modal.hide()" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
         Você tem certeza que deseja excluir este usuário?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary"  @click="this.modal.hide()" data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="this.deleteUser()" >Confirmar</button>
        </div>
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
  background-color: rgb(198, 238, 204);
}

.toast-header {
  background-color: rgb(70, 243, 93);
}

.button_edit {

margin-left: 1em;
 
}

.actions{
  display: flex;
    justify-content: center;
}

.close{
  border-style: none;
  background-color: transparent;
}
</style>