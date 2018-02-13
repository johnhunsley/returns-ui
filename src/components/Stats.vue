<template>
  <div>
    <body>
      <p>
      <select v-model="fishery">
        <option value='' selected><b>Aggregate All Fisheries</b></option>
        <option v-for="fishery in fisheries" v-bind:value="fishery.lookupValue">
          {{ fishery.lookupValue }}
        </option>
      </select>
      </p>
      <p>From date: <datepicker :value="state.fromdate" :disabled="state.disabled" v-model="fromdate"></datepicker></p>
      <p>To date: <datepicker :value="state.todate" :disabled="state.disabled" v-model="todate"></datepicker></p>
      <p>
        <button class="btn btn-primary btn-margin" @click="getBasicStats()">Show Stats</button>
        <button class="btn btn-primary btn-margin" @click="getBarChart()">Bar Chart</button>
        <button class="btn btn-primary btn-margin" @click="getPieChart()">Pie Chart</button>
        <button class="btn btn-primary btn-margin" @click="getSessionCount()">Count Sessions</button>
      </p>
      <modal :showModal="showStatsModal" :closeAction="closeAction">
        <span slot="header"><b>Catch Stats</b>&nbsp;{{this.formatDate(fromdate)}}&nbsp;-&nbsp;{{this.formatDate(todate)}}</span>
        <span slot="body">
          <table class="statsTable" v-if="stats">
            <tr>
            <th><b>Species</b></th>
            <th><b>Count</b></th>
            </tr>
            <tr v-for="stat in stats">
              <td>{{stat.species}}</td>
            <td>{{stat.count}}</td>
            </tr>
          </table>
        </span>
      </modal>
      <modal :showModal="showBarModal" :closeAction="closeAction">
        <span slot="header"><b>Catch Stats</b>&nbsp;{{this.formatDate(fromdate)}}&nbsp;-&nbsp;{{this.formatDate(todate)}}</span>
        <span slot="body">
        <barchart
          :chart-data="datacollection"></barchart>
        </span>
      </modal>
      <modal :showModal="showPieModal" :closeAction="closeAction">
        <span slot="header"><b>Catch Percentages</b>&nbsp;{{this.formatDate(fromdate)}}&nbsp;-&nbsp;{{this.formatDate(todate)}}</span>
          <span slot="body">
            <piechart :chart-data="datacollection"></piechart>
        </span>
      </modal>
      <modal :showModal="showSessionsCount" :closeAction="closeAction">
        <span slot="header"><b>Number of Sessions</b>&nbsp;{{this.formatDate(fromdate)}}&nbsp;-&nbsp;{{this.formatDate(todate)}}</span>
          <span slot="body">
            <barchart
          :chart-data="datacollection"></barchart>
        </span>
      </modal>
    </body>
  </div>
</template>

<script>
import pager from 'vue-pager'
import datepicker from 'vuejs-datepicker'
import modal from 'modal-vue'
import barchart from '@/components/BarChart'
import piechart from '@/components/PieChart'
import {API_CONFIG} from './api-variables.js'

export default {
  name: 'stats',
  components: {
    pager,
    datepicker,
    modal,
    barchart,
    piechart
  },
  data () {
    return {
      fisheries: [],
      fishery: '',
      fromdate: new Date(),
      todate: new Date(),
      showStatsModal: false,
      showBarModal: false,
      showPieModal: false,
      showSessionsCount: false,
      stats: null,
      state: {
        fromdate: new Date(),
        todate: new Date(),
        disabled: {
          from: new Date()
        }
      },
      datacollection: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.loadFisheries()
  },
  methods: {
    getStats: function () {
      this.stats = null
      console.log(this.fromdate)
      console.log(this.todate)
      this.$http.get(API_CONFIG.baseUrl + '/app/returns/stats', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'fishery': this.fishery, 'toDate': this.formatDate(this.todate), 'fromDate': this.formatDate(this.fromdate)}}).then(function (response) {
        console.log(response)
        this.stats = response.data
      }, function (response) {
        console.log(response)
      })
    },
    getBasicStats: function () {
      this.getStats()
      this.showStatsModal = true
    },
    getBarChart: function () {
      this.$http.get(API_CONFIG.baseUrl + '/app/returns/stats', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'fishery': this.fishery, 'toDate': this.formatDate(this.todate), 'fromDate': this.formatDate(this.fromdate)}}).then(function (response) {
        console.log(response)

        var mylabels = []
        var mydata = []

        for (var i = 0; i < response.data.length; i++) {
          console.log(response.data[i])
          mylabels.push(response.data[i].species)
          mydata.push(response.data[i].count)
        }

        this.datacollection = {
          labels: mylabels,
          datasets: [
            {
              label: 'Total Captures',
              backgroundColor: '#10CF58',
              data: mydata
            }
          ]
        }
      }, function (response) {
        console.log(response)
      })

      this.showBarModal = true
    },
    getPieChart: function () {
      this.$http.get(API_CONFIG.baseUrl + '/app/returns/stats', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'fishery': this.fishery, 'toDate': this.formatDate(this.todate), 'fromDate': this.formatDate(this.fromdate)}}).then(function (response) {
        console.log(response)
        var mylabels = [response.data.length]
        var mydata = [response.data.length]
        var backgroundColor = [response.data.length]

        // work out percentages
        var total = 0

        for (var i = 0; i < response.data.length; i++) {
          total += response.data[i].count
        }

        console.log(total)

        for (var k = 0; k < response.data.length; k++) {
          var item = response.data[k]
          mylabels[k] = item.species
          var count = Math.floor(item.count)
          mydata[k] = Math.floor((count / total) * 100)
          backgroundColor[k] = '#' + Math.random().toString(16).slice(2, 8).toUpperCase()
        }

        this.datacollection = {
          labels: mylabels,
          datasets: [
            {
              backgroundColor: backgroundColor,
              data: mydata
            }
          ]
        }
      }, function (response) {
        console.log(response)
      })

      this.showPieModal = true
    },
    getSessionCount: function () {
      this.$http.get(API_CONFIG.baseUrl + '/app/returns/sessions', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'fishery': this.fishery, 'toDate': this.formatDate(this.todate), 'fromDate': this.formatDate(this.fromdate)}}).then(function (response) {
        console.log(response)

        var mylabels = []
        var mydata = []

        for (var i = 0; i < response.data.length; i++) {
          mylabels.push(response.data[i].dayStartDate)
          mydata.push(response.data[i].count)
        }

        this.datacollection = {
          labels: mylabels,
          datasets: [
            {
              label: 'Total Sessions',
              backgroundColor: '#10CF58',
              data: mydata
            }
          ]
        }
      }, function (response) {
        console.log(response)
      })

      this.showSessionsCount = true
    },
    closeAction: function () {
      this.showStatsModal = false
      this.showBarModal = false
      this.showPieModal = false
      this.showSessionsCount = false
      this.datacollection = {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: []
          }
        ]
      }
    },
    formatDate: function (date) {
      var d = new Date(date)
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()
      var year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    loadFisheries: function () {
      this.$http.get(API_CONFIG.baseUrl + '/app/lookup/FISHERY', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'}}).then(function (response) {
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
<style>
.statsTable {
  min-width: 90%;
  max-width: 90%
}
.return-details {
  min-width: 50%;
  max-width: 60%
}
.return-details td, th {
  border: 0px
}
</style>

</style>
