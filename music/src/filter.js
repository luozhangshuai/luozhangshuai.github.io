import Vue from 'vue'

Vue.filter('order', function(value){
	value = value + 1;
	return value < 10 ? ('0' + value) : value;
})