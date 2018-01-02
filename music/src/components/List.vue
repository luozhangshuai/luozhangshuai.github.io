<template>
	<div>
		<input type="text" v-model="search" @keyup.13="get($event)">
		<div class="songs" v-if="songs.length">
			<dl v-for="(song, index) in songs">
				<dd>{{index | order}}</dd>
				<dd>
					<span v-if="!song.isplay"  @click="play(song, index)">播放</span>
					<span v-else @click="pause(song, index)">暂停</span>
				</dd>
				<dd>{{song.name}}</dd>
			</dl>
		</div>
		
		<div class="controls">
		<audio id="audio" controls="" autoplay=""></audio>
			<div v-if="current">
				<img :src="current.al.picUrl" alt="" width="40" height="40">
			</div>


		</div>
	</div>
</template>

<script>
export default {
	name: 'List',
	data () {
		return {
			search: '',
			songs: [],
			current: '',
			currentSongID: 0
		}
	},
  	created(){
  		this.get();
	},
	methods: {
		get(){
			let _this = this;
		  	_this.axios.get('',{
				params: {
					type  : 'search',
					s     : _this.search,
					limit : 20,
					offset: ''
				}
		  	}).then(function (response) {
		    	var songs = response.data.result.songs;
		    	songs.map((song)=>{
		    		song.isplay = 0;
		    		song.iscurrent = 0;
		    	});
		    	_this.songs = songs;
			}).catch(function (error) {
				console.log(error);
			});
		},
		play( data, index ){
			console.log(data)

			if(data.iscurrent == 1){
				audio.play();
				data.isplay = 1;
				return false;
			}
			this.current = data;
			console.log(this.current)
	        this.songs.map((song)=>{
	        	song.isplay = 0;
	        })
	        this.axios.get('',{
				params: {
					type: 'song',
	                id: data.id,
	                br: 128000
				}
		  	}).then(function (response) {
				data.isplay = 1;
				data.iscurrent = 1;
		    	audio.src = response.data.data[0].url;
			}).catch(function (error) {
				console.log(error);
			});
	    },
	    pause(data, index){
	    	audio.pause();
	    	data.isplay = 0;
	    },
	    page(){

	    }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.songs>dl {
		overflow: hidden;
		margin: 0;
	}
	.songs>dl:nth-child(2n-1){
		background-color: #eee;
	}
	.songs>dl:hover{
		background-color: #bdbdbd;
	}
	.songs>dl>dd{
		display: inline-block;
		float: left;
		height: 26px;
		line-height: 26px;
		margin: 0;
	    font-size: 14px;
    	padding: 0 6px;
	    border-top: none;
	    border-left: none;
	    cursor: pointer;
	}

	.controls{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
	}
</style>
