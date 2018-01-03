import Vue from 'vue'

Vue.filter('order', function(value){
	value = value + 1;
	return value < 10 ? ('0' + value) : value;
})

Vue.filter('time', function(value){
	var m = parseInt(value / 60),
		s = parseInt(value % 60);
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	return `${m}:${s}`;
})