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
    <select v-model="fishery">
      <option value='' selected><b>Aggregate All Fisheries</b></option>
      <option>Wroxeter</option>
      <option>Atcham (Below Tern)</option>
      <option>Atcham (Above Tern)</option>
      <option>Rossall Grange</option>
      <option>Montford Bridge</option>
    </select>
  </p>
  <p>
    <pager :on-search='getReturns' :on-select='viewReturn' :col-names='colNames' :items='items' :total-pages="totalPages" :total-items="totalItems" :no-items-label='noReturns' :filter-placeholder="filterReturns" :select-id='selectedId'/>
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
      items: [
        {id: 1, date: '20/10/2017', memberid: 'PP702', name: 'John Hunsley', fishery: 'Wroxeter'},
        {id: 2, date: '22/10/2017', memberid: 'PB666', name: 'Bob Smith', fishery: 'Atcham (Below Tern)'},
        {id: 3, date: '22/10/2017', memberid: 'PF121', name: 'Fred Bloggs', fishery: 'Atcham (Above Tern)'},
        {id: 4, date: '24/10/2017', memberid: 'PB666', name: 'Bob Smith', fishery: 'Rossall'}
      ],
      totalPages: 0,
      totalItems: 0,
      colNames: [
        {'label': 'ID', 'value': 'id'},
        {'label': 'Date', 'value': 'date'},
        {'label': 'Member ID', 'value': 'memberid'},
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
    getReturns: function () {

    },
    viewReturn: function (id) {
      var obj = {
        isShown: true,
        title: 'Return ID ' + id,
        message: 'message',
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
