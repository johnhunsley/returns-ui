<template>
<div>
<h4 v-if="authenticated">
  <p>Submit a catch return</p>
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
    <p>From Date: <datepicker :value="state.fromdate" :disabled="state.disabled"></datepicker></p>
    <p>
      From Time: HH&nbsp;<select v-model="fromhh">
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
  <p>To Date: <datepicker :value="state.todate" :disabled="state.disabled"></datepicker></p>
<p>
To Time: HH&nbsp;<select v-model="tohh">
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
            <option>Barbel</option>
            <option>Chub</option>
            <option>Pike</option>
            <option>Carp</option>
            <option>Roach</option>
            <option>Dace</option>
            <option>Bream</option>
            <option>Eel</option>
            <option>Perch</option>
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
    <table>
      <tr v-for="catchx in catches"  v-on:remove="cacthes.splice(index, 1)">
        <td>{{catchx.species}}</td>
        <td>{{catchx.count}}</td>
        <td>{{catchx.pounds}}lbs</td>
        <td>{{catchx.ounces}}oz</td>
        <td><button @click="$emit('remove')">X</button></td>
      </tr>
    </table>
    </li>
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
      state: {
        fromdate: new Date(),
        todate: new Date(),
        disabled: {
          from: new Date(2017, 10, 21)
        }
      }
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
      this.catches.push({
        species: this.species,
        count: this.count,
        pounds: this.pounds,
        ounces: this.ounces
      })
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
