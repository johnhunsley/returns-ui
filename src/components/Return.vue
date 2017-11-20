<template>
<div>
<h4 v-if="authenticated">
  <p>Select a fishery to submit a catch return</p>
</h4>
<h4 v-if="!authenticated">
  You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
</h4>
<body v-if="authenticated">
  <div >
    <p>
      <select v-model="fishery">
        <option disabled selected>select fishery</option>
        <option>Wroxeter</option>
        <option>Atcham (Below Tern)</option>
        <option>Atcham (Above Tern)</option>
        <option>Rossall Grange</option>
        <option>Montford Bridge</option>
      </select>
    </p>
  </div>
  <div v-if="fishery">
    <p>Enter details for catches at {{fishery}}</p>
    <p>Fished from date: <datepicker :value="state.fromdate" :disabled="state.disabled" v-model="fromdate"></datepicker></p>
    <p>
      Fished from time: HH&nbsp;<select v-model="fromhh">
                      <option value="0" selected>00</option>
                      <option value="1">01</option>
                      <option value="2">02</option>
                      <option value="3">03</option>
                      <option value="4">04</option>
                      <option value="5">05</option>
                      <option value="6">06</option>
                      <option value="7">07</option>
                      <option value="8">08</option>
                      <option value="9">09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                    </select>
  &nbsp;&nbsp;MM&nbsp;<select v-model="frommm">
                        <option value="0" selected>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                      </select>
    </p>
  <p>Fished to date: <datepicker :value="state.todate" :disabled="state.disabled" v-model="todate"></datepicker></p>
<p>
Fished to time: HH&nbsp;<select v-model="tohh">
  <option value="0" selected>00</option>
  <option value="1">01</option>
  <option value="2">02</option>
  <option value="3">03</option>
  <option value="4">04</option>
  <option value="5">05</option>
  <option value="6">06</option>
  <option value="7">07</option>
  <option value="8">08</option>
  <option value="9">09</option>
  <option>10</option>
  <option>11</option>
  <option>12</option>
  <option>13</option>
  <option>14</option>
  <option>15</option>
  <option>16</option>
  <option>17</option>
  <option>18</option>
  <option>19</option>
  <option>20</option>
  <option>21</option>
  <option>22</option>
  <option>23</option>
  </select>
  &nbsp;&nbsp;MM&nbsp;<select v-model="tomm">
  <option value="0" selected>00</option>
  <option>15</option>
  <option>30</option>
  <option>45</option>
  </select>
  </p>
  </div>
  <div v-if="fishery">
  <p>
    <table v-if="this.isBlank != true">
      <tr>
        <th>Species</th>
        <th v-if="this.species != 'BLANK'">Number Caught</th>
        <th v-if="this.species != 'BLANK'">Average Size</th
        <th>&nbsp;&nbsp;</th>
      </tr>
      <tr>
        <td>
          <select v-model="species">
            <option value=''>--Select Species--</option>
            <option v-for="option in speciesOptions" v-bind:value="option">
              {{ option }}
            </option>
          </select>
        </td>
        <td v-if="this.species != 'BLANK'">
          <button @click="decrement">-</button>
          <vue-numeric v-bind:min="0" v-bind:minus="false" v-bind:max="100"  v-model="count" size="1"></vue-numeric>
          <button @click="increment">+</button>
        </td>
        <td v-if="this.species != 'BLANK'">
          Pounds&nbsp;
          <button @click="decrementP">-</button>
          <vue-numeric v-bind:min="0" v-bind:minus="false" v-bind:max="100"  v-model="pounds" size="1"></vue-numeric>
          <button @click="incrementP">+</button>&nbsp;&nbsp;
          Ounces&nbsp;
          <button @click="decrementO">-</button>
          <vue-numeric v-bind:min="0" v-bind:minus="false" v-bind:max="15"  v-model="ounces" size="1"></vue-numeric>
          <button @click="incrementO">+</button>
        </td>
        <td>
          <button  class="btn btn-primary btn-margin" @click="add()">Add</button>
        </td>
      </tr>
    </table>
  </p>
  <p>
    <table v-if="catches.length > 0">
      <tr>
        <th>Catch List</th>
      </tr>
      <tr v-for="(catchx, index) in catches">
        <td>{{catchx.species}}</td>
        <td>{{catchx.count}}</td>
        <td v-if="catchx.species !== 'BLANK'">{{catchx.pounds}}lbs</td>
        <td v-if="catchx.species !== 'BLANK'">{{catchx.ounces}}oz</td>
        <td><button class="btn btn-primary btn-margin" @click="removeCatch(index)">Remove</button></td>
      </tr>
    </table>
    </li>
  </p>
  <p>
    <textarea v-if="showNote" v-model="notes" rows="6" style="width:100%" placeholder="Detail specimen catches and any other details....." @keydown="onKeyDown"/>
    <br/><span v-if="showNote" style="font-size: 8pt"><i>(max 250 characters)</i></span>
  </p>
  <p>
    <button v-if="!showNote" class="btn btn-primary btn-margin" @click="showNote = true">Add Note</button>
    <button v-if="showNote" class="btn btn-primary btn-margin" @click="showNote = false">Hide Note</button>
    <button v-if="catches.length > 0" class="btn btn-primary btn-margin" @click="submitReturn()">Submit Return</button>
  </p>
  </div>
</body>
</div>
</template>

<script>
import datepicker from 'vuejs-datepicker'
import VueNumeric from 'vue-numeric'

export default {
  name: 'return',
  components: {
    datepicker,
    VueNumeric
  },
  props: ['auth', 'authenticated', 'admin'],
  data () {
    return {
      fishery: '',
      fromdate: new Date(),
      todate: new Date(),
      fromhh: 0,
      frommm: 0,
      tohh: 0,
      tomm: 0,
      catches: [],
      species: '',
      count: 0,
      pounds: 0,
      ounces: 0,
      notes: '',
      maxnotes: 250,
      isBlank: false,
      fixedSpeciesOptions: [
        'BLANK', 'Barbel', 'Carp', 'Chub', 'Dace', 'Eel', 'Perch', 'Pike', 'Roach'
      ],
      speciesOptions: [
        'BLANK', 'Barbel', 'Carp', 'Chub', 'Dace', 'Eel', 'Perch', 'Pike', 'Roach'
      ],
      state: {
        fromdate: new Date(),
        todate: new Date(),
        disabled: {
          from: new Date()
        }
      },
      showNote: false,
      note: ''
    }
  },
  methods: {
    getSource: function () {
      return '../assets/' + this.species + '.gif'
    },
    increment: function () {
      this.count++
    },
    decrement: function () {
      this.count--
      if (this.count < 0) this.count = 0
    },
    incrementP: function () {
      this.pounds++
      if (this.pounds > 100) this.pounds = 100
    },
    decrementP: function () {
      this.pounds--
      if (this.pounds < 0) this.pounds = 0
    },
    incrementO: function () {
      this.ounces++
      if (this.ounces > 15) this.ounces = 15
    },
    decrementO: function () {
      this.ounces--
      if (this.ounces < 0) this.ounces = 0
    },
    add: function () {
      if (this.species === '') {
        var obj1 = {
          title: '',
          message: 'Select a species before adding to your catch list',
          type: 'error'
        }
        this.$Simplert.open(obj1)
      } else if (this.species !== 'BLANK' && this.count < 1) {
        var obj2 = {
          title: '',
          message: 'Add number of ' + this.species + ' caught',
          type: 'error'
        }
        this.$Simplert.open(obj2)
      } else if (this.species !== 'BLANK' && this.pounds < 1 && this.ounces < 1) {
        var obj3 = {
          title: '',
          message: 'Add average weight of ' + this.species + ' caught',
          type: 'error'
        }
        this.$Simplert.open(obj3)
      } else {
        if (this.species === 'BLANK') {
          this.catches = [{
            class: 'Catch',
            species: this.species,
            count: 1
          }]
          this.isBlank = true
        } else {
          this.catches.push({
            class: 'Catch',
            species: this.species,
            count: this.count,
            pounds: this.pounds,
            ounces: this.ounces
          })
        }
        this.speciesOptions.splice(this.speciesOptions.indexOf(this.species), 1)
        this.species = ''
        this.pounds = 0
        this.ounces = 0
        this.count = 0
      }
    },
    removeCatch: function (index) {
      this.speciesOptions.push(this.catches[index].species)
      this.speciesOptions.sort()
      this.catches.splice(index, 1)

      if (this.isBlank) {
        this.isBlank = false

        // reset the species list
        this.speciesOptions = JSON.parse(JSON.stringify(this.fixedSpeciesOptions))
      }
    },
    submitReturn: function () {
      var myReturn = {
        class: 'Return',
        fishery: this.fishery,
        catches: this.catches,
        from: this.fromdate,
        fromhh: this.fromhh,
        frommm: this.frommm,
        to: this.todate,
        tohh: this.tohh,
        tomm: this.tomm,
        notes: this.notes
      }
      this.$http.post('http://lymm.stateless-services.com:8080/app/return', myReturn, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'}}).then(function (response) {
        console.log(response)
        var obj = {
          isShown: true,
          title: '',
          message: 'Thank you for submitting your catch return',
          type: 'success',
          onClose: this.$router.push('/home')
        }
        this.$Simplert.open(obj)
      }, function (response) {
        console.log(response)
      })
    },
    onKeyDown (evt) {
      if (this.notes.length >= this.maxnotes) {
        evt.preventDefault()
      }
    }
  }
}
</script>

<style>
a {
  cursor: pointer;
},
.form  p {
  font-family: arial;
  font-size: 18px;
  background-color: lightblue;
},
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.decorated:nth-child(even) {
  background-color: #dddddd;
}
</style>
