<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
	padding: 0;
	margin: 0;
  box-sizing: border-box;
}
/*html, body {
	width: 100%;
	height: 100%;
	overflow: hidden;
}*/
#app {
  font-family: '黑体', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
