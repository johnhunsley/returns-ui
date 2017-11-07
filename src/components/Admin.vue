<template>
<div>
<h4 v-if="authenticated && admin">
  View Member Returns
  <p>
    <button class="btn btn-primary btn-margin" @click="viewReturns = true; catchTotals = false">View Returns</button>&nbsp;
    <button class="btn btn-primary btn-margin" @click="viewReturns = false; catchTotals = true">Catch Totals</button>
  </p>
</h4>
<h4 v-if="!authenticated">
  You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
</h4>
 <body v-if="authenticated && admin && viewReturns">
  <p>
    <select v-model="fishery" @change="getReturns(10, 1, filter)">
      <option value='' selected><b>Aggregate All Fisheries</b></option>
      <option>Wroxeter</option>
      <option>Atcham (Below Tern)</option>
      <option>Atcham (Above Tern)</option>
      <option>Rossall Grange</option>
      <option>Montford Bridge</option>
    </select>
  </p>
  <p>
    <pager :filter='filter' :on-search='getReturns' :on-select='viewReturn' :col-names='colNames' :items='items' :total-pages="totalPages" :total-items="totalItems" :no-items-label='noReturns' :filter-placeholder="filterReturns" :select-id='selectedId'/>
  </p>
 </body>
 <body v-if="authenticated && admin && catchTotals">
  <p>
    <select v-model="fishery">
      <option value='' selected><b>Aggregate All Fisheries</b></option>
      <option>Wroxeter</option>
      <option>Atcham (Below Tern)</option>
      <option>Atcham (Above Tern)</option>
      <option>Rossall Grange</option>
      <option>Montford Bridge</option>
    </select>
  </p>
  <p>From date: <datepicker :value="state.fromdate" :disabled="state.disabled"></datepicker></p>
  <p>To date: <datepicker :value="state.fromdate" :disabled="state.disabled"></datepicker></p>
 </body>
</div>
</template>

<script>
import pager from 'vue-pager'
import datepicker from 'vuejs-datepicker'

export default {
  name: 'admin',
  props: ['auth', 'authenticated', 'admin'],
  components: {
    pager,
    datepicker
  },
  data () {
    return {
      fishery: '',
      catchTotals: false,
      viewReturns: false,
      items: [],
      totalPages: 0,
      totalItems: 0,
      filter: '',
      colNames: [
        {'label': 'ID', 'value': 'id'},
        {'label': 'Date', 'value': 'from'},
        {'label': 'Member ID', 'value': 'memberId'},
        {'label': 'Name', 'value': 'name'},
        {'label': 'Fishery', 'value': 'fishery'}
      ],
      noReturns: 'No Returns',
      filterReturns: 'Filter Returns',
      selectedId: 'id',
      state: {
        fromdate: new Date(),
        todate: new Date(),
        disabled: {
          from: new Date()
        }
      }
    }
  },
  methods: {
    getReturns: function (pageSize, pageNumber, filter) {
      console.log(localStorage.getItem('access_token'))
      this.$http.get('http://localhost:8080/app/returns/', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'page': pageNumber, 'size': pageSize, 'fishery': this.fishery, 'filter': filter}}).then(function (response) {
        console.log(response)
        this.items = response.data.content
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.totalElements
      }, function (response) {
        console.log(response)
      })
    },
    viewReturn: function (id) {
      var obj = {
        isShown: true,
        title: 'Return ID ' + id,
        message: 'return & catch details here',
        type: 'success',
        onClose: this.onClose
      }
      this.$Simplert.open(obj)
    }
  }
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
