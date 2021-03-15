<template>
  <div>
      <h2>Hello,{{name}}</h2>
  </div>
</template>

<script>
export default {
  name:'Hello',
  props:{
      name:{
          type:String,
          default:"Sas UI"
      }
  }
};
</script>
<style scoped>
</style>