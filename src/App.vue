<template>
  <v-app id="app" standalone>
    <notifications position='top right'/>

    <!-- drawer left -->
    <v-navigation-drawer
      temporary
      v-model="drawer" 
      :mini-variant.sync="mini" 
      light 
      overflow
      fixed
      v-if="logged === true"
    >
      <v-list class="pa-0">
        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>Waiter</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>

        <div>
          <v-divider></v-divider>
          <v-list-tile v-for="item in MenuSidebar" :key="item.path"
          @click.native.prevent="$router.push(item.path)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider></v-divider>
          <v-list-tile @click.native.prevent="logout()">
            <v-list-tile-action>
              <v-icon>subdirectory_arrow_left</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>

      </v-list>

    </v-navigation-drawer>
    <!-- end drawer left -->

    <!-- drawer right -->
    <v-navigation-drawer
      temporary
      v-model="drawer1" 
      :mini-variant.sync="mini1" 
      light 
      overflow
      fixed
      v-if="logged === true && toggleMenuServicing === true"
      right
    >
      <v-list class="pa-0">
        <v-list-tile avatar tag="div">
          <v-list-tile-content>
            <v-list-tile-title>List Orders</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <div style="padding-left:25px;padding-right:25px;">
          Meja {{ orderTable.no }} || {{ orderTable.nama }}
        </div>
        <v-container style="padding-top:10px;">
          Orders : 
          <v-divider></v-divider>
          <li v-for="order in orders">
             <div>- {{ order.nama }}</div>
             <div> Jumlah : {{ order.jumlah }}</div>
             <v-divider></v-divider>
          </li>
        </v-container>
        <v-btn block primary @click.native.prevent="sendOrders()"> send </v-btn>
      </v-list>

    </v-navigation-drawer>
    <!-- end drawer right -->

    <v-toolbar fixed class="purple" dark>
      <v-toolbar-side-icon v-if="logged === true" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Waiter</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon v-if="logged === true && toggleMenuServicing === true " @click.native.stop="drawer1 = !drawer1"></v-toolbar-side-icon>
    </v-toolbar>
    
    <main id="main">
      <v-container fluid>
        <!--v-router-->
        <Auth v-if="logged === false"></Auth>
        <router-view v-else="logged === true"></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>

  import { mapGetters, mapActions } from 'vuex'
  import Auth from '@/components/Auth'
  import MenuSidebar from '@/data/MenuSidebar.js'

  export default {
    components: {
      Auth
    },
    data () {
      return {
        drawer: null,
        mini: false,
        drawer1: null,
        mini1: false,
        MenuSidebar
      }
    },
    methods: {
      ...mapActions([
        'changeLogged'
      ]),
      logout () {
        this.changeLogged(false)
        let LS = this.$localStorage.set('dataUserLevelWaiter')
        LS = {}
        LS.logged = false
      },
      sendOrders () {
        if (this.orders.length > 0 && this.orderTable !== 'default' && this.orderTable.id !== undefined) {
          let orders = {
            table: this.orderTable,
            orders: this.orders,
            from: this.$localStorage.get('dataUserLevelWaiter').body,
            information: 'testing'
          }
          this.$socket.emit('sendOrdersFromWaiter', orders)
        }
      }
    },
    computed: {
      ...mapGetters([
        'logged',
        'toggleMenuServicing',
        'orders',
        'orderTable',
        'LoginWaiterFeedback'
      ])
    },
    mounted () {
      let LS = this.$localStorage.get('dataUserLevelWaiter')
      if (LS.logged === true) {
        this.changeLogged(true)
      }
    },
    watch: {
      logged () {
        if (this.logged === 'rejected') {
          this.$notify({
            type: 'error',
            title: 'Pesan',
            text: 'Username dan Password tidak sama.'
          })
          this.changeLogged(false)
        }
        if (this.logged === true) {
          this.$notify({
            title: 'Pesan',
            text: 'Selamat datang.'
          })
        }
      }
    }
  }
</script>

<style>
  #main {
    padding-top:25px;
  }
</style>
