<template>
  <div id="app">
    <PlayingField/>
  </div>
</template>

<script>
import PlayingField from './components/PlayingField';

export default {
  name: 'App',
  components: {
    PlayingField,
  },
};
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
