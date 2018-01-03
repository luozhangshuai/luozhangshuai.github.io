<template>
	<div class="player">
		<audio :src="src" id="audio" ref="audio" autoplay=""
			@play="onPlay"
			@ended="onEnd"
			@timeupdate="onTimeupdate"
			></audio>
		<div>
			<span v-if="hasData">{{this.currentTime | time}}/{{this.duration | time}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'player',
		props: {
			pic: {
				type   : String,
				default: ''
			},
			src: {
				type   : String,
				default: ''
			}
		},
		data(){
			return {
				point: 0,
				hasData: false,
				currentTime: 0,
				duration: 0
			}
		},
		computed: {
			audio(){
		        return this.$refs.audio;
		    }
		},
		methods: {
			pause(){
				this.audio.pause();
			},
			play(){
				this.audio.play();
			},
			onPause(){
				
			},
			onPlay(){
				this.hasData = true;
				if(localStorage.currentTime){
					this.audio.currentTime = localStorage.currentTime;
				}
			},
			onTimeupdate(){
				this.currentTime = localStorage.currentTime = this.audio.currentTime;
				this.duration = this.audio.duration;
			},
			onEnd(){
				localStorage.currentTime = 0;
			}
		}
	}
</script>
<style scoped type="text/css">
	.player{
		position: fixed;
		bottom: 10px;
		right: 10px;
		width: 320px;
		font-size: 14px;
		line-height: 1;
		padding: 4px 10px;
		background-color: #fff;
		box-shadow: 2px 2px 8px #000;
		border-radius: 2px;
		overflow: hidden;
	}
</style>