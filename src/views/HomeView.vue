<script>
import { RouterLink } from 'vue-router';
import http from '@/services/http.js'
import moment from 'moment'
import * as bootstrap from 'bootstrap';


export default {

  name: 'projetos',

  data() {
    return {
      projetos: [],
      modal: null,
      project_id: null,
      visible: true,
      requisitos: []
    }
  },

  mounted() {
    this.getProjects()

  },

  methods: {

    async getProjects() {

      try {

        const response = await http.get('/projeto/get', {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(

          res => {
            this.projetos = res.data.data
          }

        )

      } catch (error) {
      }

    },
    async confirmDelete(id) {

      this.modal = new bootstrap.Modal(document.getElementById('exampleModal'), focus)
      this.modal.show()

      this.project_id = id

    },

    async deleteProject() {

      try {

        const response = await http.delete('/projeto/delete/' + this.project_id, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(
          res => {

          }
        )
        this.modal.hide()
        this.getProjects()
        var myToast = new bootstrap.Toast(document.getElementById('myToast'), {
          autohide: true,
          delay: 3500,
        });
        myToast.show();
      } catch (error) {

      }
    },
    collapse() {
      let collapse = new bootstrap.Collapse(document.getElementById('collapseExample'), {
        toggle: false
      })
      collapse.show()
    },
    async getRequisitos(id) {

      try {

        const response = await http.get('/requisito/get/' + id, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(

          res => {
            this.requisitos = res.data.data
          }


        )

        let collapse = new bootstrap.Collapse(document.getElementById('collapseExample'), {
          toggle: false
        })
        collapse.show()

      } catch (error) {
        console.log(error)
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
          Projetos
          <RouterLink to="/projeto/new" class="btn btn-primary float-end">Novo Projeto</RouterLink>
        </h4>
      </div>

      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data</th>
              <th>Usuário</th>
              <th class="actions">Actions</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(projeto, index) in this.projetos" :key="index">

              <td>{{ projeto.descricao }}</td>
              <td>{{ moment(projeto.data).format('DD/MM/YYYY') }}</td>
              <td>{{ projeto.usuarioProjeto.name }}</td>
              <td class="actions">
                <RouterLink :to="{ path: '/projeto/edit/' + projeto.id }" class=" button_edit btn btn-success">
                  Editar
                </RouterLink>
                <button type="button" @click="confirmDelete(projeto.id)" class="button_edit btn btn-danger">
                  Excluir
                </button>
                <p>
                  <button class="btn btn-primary" type="button" @click="getRequisitos(projeto.id)" data-toggle="collapse"
                    data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Button
                  </button>
                </p>


              </td>

            </tr>
            <!-- COLLAPSE -->
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Descrição</th>
                      <th>Data</th>
                      <th>Usuário</th>
                      <th>Código</th>
                      <th class="actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(requisito, index) in this.requisitos" :key="index">
                      <td>{{ requisito.descricao }}</td>
                      <td>{{ moment(requisito.data).format('DD/MM/YYYY') }}</td>
                      <td>{{ requisito.usuarioRequisito.name }}</td>
                      <td>{{ requisito.codigo }}</td>
                      <td class="actions">
                        <RouterLink to="/" class=" button_edit btn btn-success">
                          Editar
                        </RouterLink>
                        <button type="button" @click="confirmDelete(projeto.id)" class="button_edit btn btn-danger">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- COLLAPSE -->
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
        Projeto removido com sucesso! <a href="#"></a>
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
          Você tem certeza que deseja excluir este projeto?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="this.modal.hide()"
            data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="this.deleteProject()">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.button_edit {

  margin-left: 1em;

}

.actions {
  display: flex;
  justify-content: center;
}

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

.actions {
  display: flex;
  justify-content: center;
}

.close {
  border-style: none;
  background-color: transparent;
}
</style>


