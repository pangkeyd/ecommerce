<template>
  <div>
    <paginate
      name="languages"
      :list="itemByUser"
      :per="5"
    >
      <table class="ui grey table" v-if="itemByUser.length > 0">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in paginated('languages')" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <img :src="item.image" width="80">
            </td>
            <td>
              <a href="#" class="ui mini blue  button" id="editItem" @click="modalEdit($event, item._id)">Edit</a>
              <a href="#" class="ui mini blue button" id="deleteItem" @click="modalDelete($event, item._id)">Delete</a>
            </td>
          </tr>

          <!-- DELETE MODAL -->
          <div :id="item._id" class="ui mini modal delete_item">
            <i class="close icon"></i>
            <div class="header">
              Delete Item
            </div>
            <div class="content">
              <div class="description">
                <p>Are you sure want to Delete this <span style="font-weight: bold">{{ item.name }}</span></p>
              </div>
            </div>
            <div class="actions">
              <div class="ui green deny button">
                Nope
              </div>
              <div class="ui red right labeled icon button" @click="deleteItem($event, item._id)">
                Yes
                <i class="checkmark icon"></i>
              </div>
            </div>
          </div>

          <!-- EDIT MODAL -->
          <div :id="item._id" class="ui mini modal edit_item">
            <i class="close icon"></i>
            <div class="header">
              Edit Item
            </div>
            <div class="content">
              <div class="description">
                <p>Are you sure want to Edit this <span style="font-weight: bold">{{ item.name }}</span></p>
              </div>
            </div>
            <div class="actions">
              <div class="ui red deny button">
                Nope
              </div>
              <div class="ui green right labeled icon button" @click="editItem( item._id)">
                Yes
                <i class="checkmark icon"></i>
              </div>
            </div>
          </div>

        </tbody>
      </table>
      <h3 style="text-align: center" v-else>Tidak Ada Item!</h3>
    </paginate>

    <paginate-links for="languages"></paginate-links>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        paginate: ['languages'],
        formEditItem: {
          name: '',
          price: '',
          image: '',
          author: localStorage.rfv
        }
      }
    },
    computed: {
      ...mapState([
        'itemByUser'
      ])
    },
    methods: {
      ...mapActions([
        'getItemByUser'
      ]),
      modalDelete: function(e, id) {
        e.preventDefault()
        $(`#${id}.ui.mini.modal.delete_item`).modal('show')
      },
      deleteItem: function(e, id) {
        this.$store.dispatch('deleteItem', id)
      },
      modalEdit: function(e, id) {
        e.preventDefault()
        $(`#${id}.ui.mini.modal.edit_item`).modal('show')
      },
      editItem: function(id) {
        this.$store.dispatch('editItem', id)
      }
    },
    mounted () {
      this.getItemByUser()
    }
  }
</script>

<style scoped>

</style>
