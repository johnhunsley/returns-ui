<template>
  <div>
    <h4 v-if="authenticated">
        Hello {{auth.getNickName()}} <span v-if="authenticated && admin">. You have admin priviledges</span>
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
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
  }
</style>

