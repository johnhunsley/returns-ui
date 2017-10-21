<template>
  <div>
    <div class="right">
      <img  style="float:right" src="../assets/Lymm.png"/>
    </div>
    <div class="left">
      <h4 v-if="authenticated">
          Hello {{auth.getNickName()}} <span v-if="authenticated && admin">. Your registered Membership number is {{auth.getMemberId()}} You have admin priviledges</span>
      </h4>
      <h4 v-if="!authenticated">
        You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
      </h4>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: ['auth', 'authenticated', 'admin']
  }
</script>

<style>
  a {
    cursor: pointer;
  },
  .right {
   float:right;
},
.left {
  float:left;
}
</style>

