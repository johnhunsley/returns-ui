<template>
<div>
<h4 v-if="authenticated && admin">
  <p>Submit a catch return</p>
  <div id="selectFishery">
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
  <div id="catchDetails" v-if="fishery">
    <p>Enter details for catches at {{fishery}}</p>
    <p>Date: <datepicker></datepicker></p>
  </div>
</h4>
<h4 v-if="!authenticated">
  You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
</h4>
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
      state: {
        disabled: {
          from: new Date()
        }
      }
    }
  }
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
