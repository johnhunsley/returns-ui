<template>
  <div>
    <body>
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
      <p>From date: <datepicker :value="state.fromdate" :disabled="state.disabled" v-model="fromdate"></datepicker></p>
      <p>To date: <datepicker :value="state.todate" :disabled="state.disabled" v-model="todate"></datepicker></p>
      <p><button class="btn btn-primary btn-margin" @click="getStats()">Go</button></p>
      <modal :showModal="showModal" :closeAction="closeAction">
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
    </body>
  </div>
</template>

<script>
import pager from 'vue-pager'
import datepicker from 'vuejs-datepicker'
import modal from 'modal-vue'

export default {
  name: 'stats',
  components: {
    pager,
    datepicker,
    modal
  },
  data () {
    return {
      fishery: '',
      fromdate: new Date(),
      todate: new Date(),
      showModal: false,
      stats: null,
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
    getStats: function () {
      this.stats = null
      console.log(this.fromdate)
      console.log(this.todate)
      this.$http.get('http://lymm.stateless-services.com:8080/app/returns/stats', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'fishery': this.fishery, 'toDate': this.formatDate(this.todate), 'fromDate': this.formatDate(this.fromdate)}}).then(function (response) {
        console.log(response)
        this.stats = response.data
        this.showModal = true
      }, function (response) {
        console.log(response)
      })
    },
    closeAction: function () {
      this.showModal = false
    },
    formatDate: function (date) {
      var d = new Date(date)
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()
      var year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }
  }
}
</script>
