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
    <p>Fished from date: <datepicker :value="state.fromdate" :disabled="state.disabled"></datepicker></p>
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
  <p>Fished to date: <datepicker :value="state.todate" :disabled="state.disabled"></datepicker></p>
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
    <table>
      <tr>
        <th>Species</th>
        <th>Number Caught</th>
        <th>Average Size</th
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
        <td>
          <button @click="decrement">-</button>
          <vue-numeric v-bind:min="0" v-bind:minus="false" v-bind:max="100"  v-model="count" size="1"></vue-numeric>
          <button @click="increment">+</button>
        </td>
        <td>
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
        <td>{{catchx.pounds}}lbs</td>
        <td>{{catchx.ounces}}oz</td>
        <td><button class="btn btn-primary btn-margin" @click="removeCatch(index)">Remove</button></td>
      </tr>
    </table>
    </li>
  </p>
  <p>
    <textarea v-if="showNote" rows="6" style="width:100%" placeholder="Detail specimen catches and any other details....."/>
  </p>
  <p>
    <button v-if="!showNote" class="btn btn-primary btn-margin" @click="showNote = true">Add Note</button>
    <button v-if="showNote" class="btn btn-primary btn-margin" @click="showNote = false">Hide Note</button>
    <button v-if="catches.length > 0" class="btn btn-primary btn-margin" @click="">Submit Return</button>
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
      fromhh: 0,
      frommm: 0,
      tohh: 0,
      tomm: 0,
      catches: [],
      species: '',
      count: 0,
      pounds: 0,
      ounces: 0,
      speciesOptions: [
        'Barbel', 'Carp', 'Chub', 'Dace', 'Eel', 'Perch', 'Pike', 'Roach'
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
      } else if (this.count < 1) {
        var obj2 = {
          title: '',
          message: 'Add number of ' + this.species + ' caught',
          type: 'error'
        }
        this.$Simplert.open(obj2)
      } else if (this.pounds < 1 && this.ounces < 1) {
        var obj3 = {
          title: '',
          message: 'Add average weight of ' + this.species + ' caught',
          type: 'error'
        }
        this.$Simplert.open(obj3)
      } else {
        this.catches.push({
          species: this.species,
          count: this.count,
          pounds: this.pounds,
          ounces: this.ounces
        })
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
