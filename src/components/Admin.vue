<template>
<div>
<h4 v-if="authenticated && admin">
  This is the Admin area
</h4>
<h4 v-if="!authenticated">
  You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
</h4>
</div>
</template>

<script>
export default {
  name: 'admin',
  props: ['auth', 'authenticated', 'admin']
}
</script>

<style>
a {
  cursor: pointer;
}
</style>
