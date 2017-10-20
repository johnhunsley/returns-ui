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
</body>
</div>
</template>

<script>
import datepicker from 'vuejs-datepicker'

export default {
  name: 'return',
  components: {
    datepicker
  },
  props: ['auth', 'authenticated', 'admin'],
  data () {
    return {
      fishery: '',
      fromhh: 0,
      frommm: 0,
      tohh: 0,
      tomm: 0,
      state: {
        fromdate: new Date(),
        todate: new Date(),
        disabled: {
          from: new Date(2017, 10, 21)
        }
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
}
</style>
