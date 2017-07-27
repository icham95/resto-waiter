<template>
  <div>
    <select v-model="selectedTable" id="select">
      <option value="default"> --- Choose Table --- </option>
      <option v-for="table in tables" :value="table"> {{ table.nama }} | {{ table.no }} </option>
    </select>
    <div class="headline" style="width:100%;margin-top:15px;margin-bottom:15px;">
      Foods
    </div>
    <div>
      <div v-for="food in foods" :key="food.id" style="margin-bottom:20px;">
        <v-layout row wrap>
          <v-flex xs8>
            <v-checkbox id="check"
              v-model="selectedFoods" 
              light
              :label="food.nama"
              :value="food"
              @click.native.prevent="addOrder(food)">
            </v-checkbox>
          </v-flex>
          <v-flex xs4>
            jumlah : <input type="number" v-model="food.jumlah" style="max-width:100%;border:1px solid black;">
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        selectedTable: 'default',
        selectedFoods: []
      }
    },
    computed: {
      ...mapGetters([
        'tables',
        'foods'
      ])
    },
    methods: {
      ...mapActions([
        'ftoggleMenuServicing',
        'faddOrders',
        'faddTable'
      ]),
      addOrder (food) {
        this.faddOrders(this.selectedFoods)
      }
    },
    mounted () {
      this.$socket.emit('getDataTablesWaiter')
      this.$socket.emit('getDataFoodsWaiter')
      this.ftoggleMenuServicing(true)
    },
    destroyed () {
      this.ftoggleMenuServicing(false)
    },
    watch: {
      selectedTable () {
        this.faddTable(this.selectedTable)
      }
    }
  }
</script>

<style scoped>
  #select {
    width: 100%;
    border:1px solid black;
    height:37px;
  }
  #check.input-group {
    margin:0;
  }
</style>
