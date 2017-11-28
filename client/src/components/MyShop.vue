<template>
  <div class="myshop_page">
    <navbar-el/>
    <div class="ui container">
      <div class="ui grid">
        <div class="row">
          <div class="column">
            <h1>Shop</h1>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <h3>Add Item</h3>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <form class="ui form" enctype="multipart/form-data" id="formItem">
              <div class="field">
                <label>Name Item</label>
                <input type="text" name="name-item" placeholder="Name" v-model="newItem.name" id="nameItem">
              </div>
              <div class="field">
                <label>Price</label>
                <input type="text" name="price" placeholder="Price" v-model="newItem.price" id="price">
              </div>
              <div class="field">
                <label for="">Image</label>
                <div v-if="!image">
                  <input type="file" name="image" @change="onFileChange($event)">
                </div>
                <div v-else>
                  <button @click.prevent="removeImage" class="ui mini red button">
                    <i class="remove icon"></i>
                  </button>
                  <img :src="image" width="80" alt="">
                </div>
              </div>
              <button v-if="loading" class="ui green loading button">Loading</button>
              <button v-else-if="!loading && storageEdit.length == 0" class="ui green button" @click.prevent="setItem" type="submit">Submit</button>
              <button v-else class="ui green button" @click.prevent="updateItem" type="submit">Edit</button>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <h3>Your Item!</h3>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <paging></paging>
          </div>
        </div>
      </div>
    </div>
    <footer-el></footer-el>
  </div>
</template>

<script>
  import Navbar from './Navbar.vue'
  import Footer from './Footer.vue'
  import Pagination from './Pagination.vue'
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        newItem: {
          name: '',
          price: '',
          image: '',
          author: localStorage.asdfgh
        },
        image: ''
      }
    },
    components: {
      'navbar-el': Navbar,
      'footer-el': Footer,
      'paging': Pagination
    },
    computed: {
      ...mapState([
        'itemByUser',
        'loading',
        'storage',
        'storageEdit'
      ])
    },
    watch: {
      name: function(val) {
        console.log(val)
        this.newItem.name = val
      }
    },
    methods: {
      ...mapActions([
        'getItemByUser',
        'setStorage',
        'editItem'
      ]),
      setItem: function(e) {
        this.$store.dispatch('postItem', this.newItem)
        setTimeout(() => {
          this.newItem.name = '',
          this.newItem.price = '',
          this.image = ''
        }, 2000)
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        this.newItem.image = files[0]
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removeImage: function() {
        this.image = ''
      },
      modalDelete: function(e, id) {
        e.preventDefault()
        $(`#${id}.ui.mini.modal.delete_item`).modal('show')
      },
      deleteItem: function(e, id) {
        this.$store.dispatch('deleteItem', id)
      },
      getItemById: function() {
        if(localStorage.qaz && localStorage.wsx && localStorage.edc && localStorage.rfv){
          this.newItem.name = localStorage.qaz
          this.newItem.price = localStorage.wsx
          this.image = localStorage.edc
        }
        $('#nameItem').on('focus', function(){
          localStorage.removeItem('qaz')
        })
        $('#price').on('focus', function(){
          localStorage.removeItem('wsx')
        })
      },
      updateItem: function() {
        this.$store.dispatch('updateItem', this.newItem)
        setTimeout(() => {
          this.newItem.name = '',
          this.newItem.price = '',
          this.image = ''
        }, 2500)
      }
    },
    mounted () {
      if(!localStorage.qwerty){
        this.$router.push('/')
      }

      this.setStorage()
      this.getItemByUser()
    },
    updated () {
      this.getItemById()
    }
  }
</script>

<style scoped>
  .myshop_page h1 {
    margin-top: 10px;
  }
</style>
