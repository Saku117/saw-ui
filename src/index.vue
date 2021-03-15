<template>
  <div>
    <div>Hello Saw-ui</div>
    <Hello :name="name" />
  </div>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {
        name: "Saw",
      };
    },
  };
</script>
