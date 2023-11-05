<script>
import { RouterLink } from 'vue-router';
import http from '@/services/http.js'
import moment from 'moment'
import * as bootstrap from 'bootstrap';

import axios from 'axios';

export default {

  name: 'projetos',

  data() {
    return {
      model: {
        requisito: {
          descricao: '',
          codigo: '',
          projeto: '',
          usuario: ''
        }
      },
      projetos: [],
      modal: null,
      modal_requisitos: null,
      modal_confirm_requisito: null,
      modalRequisitosUpdate: null,
      project_id: null,
      visible: true,
      requisitos: [],
      requisto_delete: null,
      requisito_update: null,
      file_url :'',
      file_base64:'',
    }
  },

  mounted() {
    this.getProjects()

  },

  methods: {

    // Projects
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
    // Requisitos
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
        if (this.modal_requisitos != null) {
          this.modal_requisitos.hide()
        }
        if (this.modalRequisitosUpdate != null) {
          this.modalRequisitosUpdate.hide()
        }

        this.modal_requisitos = new bootstrap.Modal(document.getElementById('modalRequisitos'), focus)
        this.modal_requisitos.show()

      } catch (error) {
        console.log(error)
      }

    },
    async confirmDeleteRequisitos(id, projeto) {

      this.modal_confirm_requisito = new bootstrap.Modal(document.getElementById('confirmDeleteRequisitos'), focus)
      this.modal_confirm_requisito.show()

      this.requisto_delete = id

    },

    async deleteRequisito() {

      try {

        const response = await http.delete('/requisito/delete/' + this.requisto_delete, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(
          res => {

          }
        )
        this.modal_confirm_requisito.hide()
        this.getRequisitos(this.project_id)
        var myToast = new bootstrap.Toast(document.getElementById('requisitoRemoved'), {
          autohide: true,
          delay: 3500,
        });
        myToast.show();
      } catch (error) {

      }
    },
    async getRequisitoById(id) {

      try {

        const response = await http.get('/requisito/get/requisito/' + id, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(


          res => {
            this.model.requisito = res.data.data[0]
          }
        )


      } catch (error) {
        console.log(error)

      }
    },
    async modalUpdateRequisito(id, projeto) {

      await this.getRequisitoById(id)

      this.project_id = projeto
      this.requisito_update = id

      if (this.modal_requisitos != null) {
        this.modal_requisitos.hide()
      }

      this.modalRequisitosUpdate = new bootstrap.Modal(document.getElementById('modalRequisitosUpdate'), focus)
      this.modalRequisitosUpdate.show()

    },
    async UpdateRequisito() {

      this.model.requisito.usuario = localStorage.getItem("user")
      this.model.requisito.projeto = this.project_id

      try {
        const response = await http.put('/requisito/update/' + this.requisito_update, this.model.requisito, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(
          res => {
            this.getRequisitos(this.project_id)


            this.model.requisito = {
              descricao: '',
              codigo: '',
              projeto: '',
              usuario: ''

            }
          }
        )
      } catch (error) {
        console.log(error)

        if (error.response.status == 401) {
          var myToast = new bootstrap.Toast(document.getElementById('noAuth'), {
            autohide: true,
            delay: 3500,
          });
          myToast.show();
        }
      }


    },
    // Download
    async getRelatorio(id) {
      
      try {

        const response = await http.get('/relatorio/pdf/' + id, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("token")
          }
        }
        ).then(


          res => {
            this.file_url = res.data.URL
            this.file_base64 = res.data.base64

          },       
        )

        

        axios({
    url: 'http://'+this.file_url,
    method: 'GET',
    responseType: 'blob',
    headers: { 
  'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
},
}).then((response) => {

     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
     var fileLink = document.createElement('a');
  
     fileLink.href = fileURL;
     fileLink.setAttribute('download', 'file.pdf');
     document.body.appendChild(fileLink);
   
     

     fileLink.click();
});


      } catch (error) {
        console.log(error)

      }

    },

  },


}

</script>
<script setup>
import NavBar from '@/components/NavBar.vue'
</script>
<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
                <button class="btn btn-primary button_edit" type="button" @click="getRequisitos(projeto.id)">
                  Expandir
                </button>
                <button type="button" class="btn btn-download fa fa-download" @click="getRelatorio(projeto.id)">
                 Relatório
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Toast PROJECT REMOVED-->
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
  <!-- Toast -->
  <!-- Toast REQUISITO REMOVED-->
  <div>
    <div class="toast" id="requisitoRemoved">
      <div class="toast-header">
        <strong class="me-auto"><i class="bi-gift-fill"></i> Removido</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        Requisito removido com sucesso! <a href="#"></a>
      </div>
    </div>
  </div>
  <!-- Toast -->

  <!-- Toast SEM AUTORIZAÇÃO-->
  <div>
    <div class="toast noAuth" id="noAuth">
      <div class="toast-header noAuth-header">
        <strong class="me-auto"><i class="bi-gift-fill"></i> Falha</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        Você não tem permissão para executar essa operação! <a href="#"></a>
      </div>
    </div>
  </div>
  <!-- Toast -->

  <!-- Modal CONFIRM DELETE PROJECT-->
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
  <!-- Modal -->

  <!-- Modal CONFIRM DELETE REQUISITOS-->
  <div class="modal fade" id="confirmDeleteRequisitos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Você tem certeza?</h5>
          <button type="button" class="close" data-dismiss="modal" @click="this.modal_confirm_requisito.hide()"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Você tem certeza que deseja excluir este requisito?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="this.modal_confirm_requisito.hide()"
            data-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="this.deleteRequisito()">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <!-- Modal REQUISITOS TABLE -->
  <div class="modal fade modalRequisitos modal-dialog modal-lg" id="modalRequisitos" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Requisitos</h5>
          <button type="button" class="close" data-dismiss="modal" @click="this.modal_requisitos.hide()"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
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
                    <button type="button" @click="modalUpdateRequisito(requisito.id, requisito.projeto)"
                      class="button_edit btn btn-success">
                      Editar
                    </button>
                    <button type="button" @click="confirmDeleteRequisitos(requisito.id, requisito.projeto)"
                      class="button_edit btn btn-danger">
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="this.modal_requisitos.hide()"
            data-dismiss="modal">Voltar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <!-- Modal REQUISITOS UPDATE-->
  <div class="modal fade modalRequisitos modal-dialog modal-lg" id="modalRequisitosUpdate" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Requisitos</h5>
          <button type="button" class="close" data-dismiss="modal" @click="this.getRequisitos(this.project_id)"
            aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="container mt-5">
          <div class="card">
            <div class="card-header">
              <h4>
                Editar requisito
              </h4>
            </div>
            <form @submit.prevent="UpdateRequisito">
              <div class="card-body">
                <div class="mb-3">
                  <label>Descrição</label>
                  <input type="text" class="form-control" v-model="model.requisito.descricao" required>
                </div>
                <div class="mb-3">
                  <label>Código</label>
                  <input type="text" class="form-control" v-model="model.requisito.codigo" required>
                </div>

                <div class="mb-3">
                  <button type="submit" class="submit btn btn-primary">Salvar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="this.getRequisitos(this.project_id)"
            data-dismiss="modal">Voltar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
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

.noAuth {
  position: absolute;
  top: 0;
  right: 0;
  margin: 1em;
  background-color: rgb(233, 102, 102);
}

.noAuth-header {
  background-color: rgb(226, 56, 56);
}

.button_edit {

  margin-left: 1em;

}

.btn-download {
  margin-left: 2em;
  background-color: rgb(193, 235, 10);

  /* background-color: DodgerBlue;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 18px; */
}

.btn-download:hover {
  background-color: rgb(187, 255, 0);
}

.actions {
  display: flex;
  justify-content: center;
}

.close {
  border-style: none;
  background-color: transparent;
}

.modalRequisitos {
  display: table;
}
</style>


