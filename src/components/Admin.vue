<template>
<div>
<h4 v-if="authenticated && admin">
  View Member Returns
  <p>
    <button class="btn btn-primary btn-margin" @click="viewReturns = true; catchTotals = false">View Returns</button>&nbsp;
    <button class="btn btn-primary btn-margin" @click="viewReturns = false; catchTotals = true">Catch Statistics</button>
  </p>
</h4>
<h4 v-if="!authenticated">
  You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
</h4>
 <body v-if="authenticated && admin && viewReturns">
  <p>
    <select v-model="fishery" @change="getReturns(10, 1, filter)">
      <option value='' selected><b>Aggregate All Fisheries</b></option>
      <option v-for="fishery in fisheries" v-bind:value="fishery.lookupValue">
        {{ fishery.lookupValue }}
      </option>
    </select>
  </p>
  <p>
    <pager :filter='filter' :on-search='getReturns' :on-select='viewReturn' :col-names='colNames' :items='items' :total-pages="totalPages" :total-items="totalItems" :no-items-label='noReturns' :filter-placeholder="filterReturns" :select-id='selectedId'/>
  </p>
  <modal :showModal="showModal" :closeAction="closeAction">
    <span slot="header"><b>Catch Return ID</b>&nbsp;{{selectedReturn.id}}</span>
    <span slot="body">
      <table class="return-details">
        <tr>
          <td><b>Member ID</b></td>
          <td>{{selectedReturn.memberId}}</td>
        </tr>
        <tr>
          <td><b>Name</b></td>
          <td>{{selectedReturn.name}}</td>
        </tr>
        <tr>
          <td><b>Fishery</b></td>
          <td>{{selectedReturn.fishery}}</td>
        </tr>
        <tr>
          <td><b>Fished From</b></td>
          <td>{{selectedReturn.from}}&nbsp;:&nbsp;{{selectedReturn.fromhh}}:{{selectedReturn.frommm}}</td>
        </tr>
        <tr>
          <td><b>Fished To</b></td>
          <td>{{selectedReturn.to}}&nbsp;:&nbsp;{{selectedReturn.tohh}}:{{selectedReturn.tomm}}</td>
        </tr>
      </table>
      <br/>
      <table v-if="selectedReturn.catches && selectedReturn.catches.length > 0">
        <tr v-if="selectedReturn.catches[0].species !== 'BLANK'">
          <th>Species</th>
          <th>Count</th>
          <th>Average Weight</th>
        </tr>
        <tr v-for="mycatch in selectedReturn.catches">
          <td>{{mycatch.species}}</td>
          <td v-if="mycatch.species !== 'BLANK'">{{mycatch.count}}</td>
          <td v-if="mycatch.species !== 'BLANK'">{{mycatch.pounds}}lbs&nbsp;{{mycatch.ounces}}oz</td>
        </tr>
      </table>
      <br/>
      <span v-if="selectedReturn.notes"><b>Notes:</b></span></br>
      <span v-if="selectedReturn.notes">{{selectedReturn.notes}}</span>
    </span>
  </modal>
 </body>
 <stats v-if="authenticated && admin && catchTotals" />
</div>
</template>

<script>
import pager from 'vue-pager'
import datepicker from 'vuejs-datepicker'
import modal from 'modal-vue'
import stats from '@/components/Stats'

export default {
  name: 'admin',
  props: ['auth', 'authenticated', 'admin'],
  components: {
    pager,
    datepicker,
    modal,
    stats
  },
  data () {
    return {
      showModal: false,
      selectedReturn: {},
      fisheries: [],
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
      fromdate: new Date(),
      todate: new Date(),
      state: {
        fromdate: new Date(),
        todate: new Date(),
        disabled: {
          from: new Date()
        }
      }
    }
  },
  mounted () {
    this.loadFisheries()
  },
  methods: {
    getReturns: function (pageSize, pageNumber, filter) {
      this.$http.get('http://lymm.stateless-services.com:8080/app/returns/', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'page': pageNumber, 'size': pageSize, 'fishery': this.fishery, 'filter': filter}}).then(function (response) {
        console.log(response)
        this.items = response.data.content
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.totalElements
      }, function (response) {
        console.log(response)
      })
    },
    viewReturn: function (id) {
      console.log(id)
      this.$http.get('http://lymm.stateless-services.com:8080/app/return/' + id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
        console.log(response)
        this.selectedReturn = response.data
        this.showModal = true
      }, function (response) {
        console.log(response)
      })
    },
    closeAction: function () {
      this.showModal = false
    },
    loadFisheries: function () {
      this.$http.get('http://lymm.stateless-services.com:8080/app/lookup/FISHERY', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'}}).then(function (response) {
        console.log(response)
        this.fisheries = response.data
      }, function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
