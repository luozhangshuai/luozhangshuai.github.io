<template>
	<div>
		
		<div id="search">
			<div id="searchIcon">
				<i class="iconfont icon-icon19"></i>
			</div>
			<div id="clearSearchInput" v-show="search.length" @click="search=''">
				<i class="iconfont icon-close"></i>
			</div>
			<div id="searchTerm">
				<input type="text" id="searchInput" v-model="search" @keyup="get">
			</div>
		</div>



		<div class="songs" v-if="songs.length">
			<dl v-for="(song, index) in songs">
				<dd>
					<span @click="play(song, index)">0</span>
				</dd>
				<dd>{{song.name}}</dd>
			</dl>
		</div>
		<player :src="audioSrc"></player>
	</div>
</template>

<script>
	import player from './player'

	export default {
		name: 'List',
		data () {
			return {
				search: '郭富城',
				songs: [],
				current: '',
				currentSongID: 0,
				picUrl:'',
				audioSrc:''
			}
		},
		components:{player},
	  	created(){
	  		// this.get();
		},
		methods: {
			timeupdate(){
				console.log(this.$refs.audio);
			},
			get(){
				// return false;
				let _this = this;
				if(!_this.search)
					return
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
				var _this = this;
				_this.picUrl = data.al.picUrl
				
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
			    	_this.audioSrc = response.data.data[0].url;
				}).catch(function (error) {
					console.log(error);
				});
		    },
		    pause(data, index){
		    	audio.pause();
		    	data.isplay = 0;
		    },
		    page(){

		    },

		    nextSong(){

		    },
			prevSong(){

			},
			nextPage(){

			},
			prevPage(){

			}
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	#search{
		width: 400px;
		height: 40px;
		position: absolute;
		top: 4px;
    	left: calc(50% - 200px);
		background-color: #2850A7;
		color: #fff;
		border-radius: 2px;
		box-shadow: 2px 2px 4px #666;
	}
	#searchTerm{
		padding-left: 40px;
		height: 40px;
		padding-right: 20px;
	}
	#searchInput{
		width: 100%;
		border: none;
		/*height: 40px;*/
		outline: none;
		font-size: 16px;
		line-height: 1;
		padding: 0;
		margin-top: 11px;
		letter-spacing: 0;
		color: #fff;
		background-color: transparent;
		text-align: left;
	}
	#searchIcon{
		width: 40px;
		height: 40px;
		position: relative;
		float: left;
	}
	#searchIcon .iconfont{
		font-size: 24px;
		position: absolute;
		top: 6px;
    	left: 9px;
    	cursor: pointer;
	}
	#clearSearchInput{
		float: right;
		width: 20px;
		height: 40px;
		position: relative;
	}
	#clearSearchInput .iconfont{
		position: absolute;
	    top: 12px;
	    right: 4px;
	    cursor: pointer;
	}
	.songs>dl {
		overflow: hidden;
		margin: 0;
	}
	/*.songs>dl:nth-child(2n-1){
		background-color: #eee;
	}
	.songs>dl:hover{
		background-color: #bdbdbd;
	}*/
	.songs>dl>dd{
		display: inline-block;
		float: left;
	/*	height: 26px;
		line-height: 26px;*/
		margin: 0;
	    font-size: 14px;
    	padding: 0 6px;
	    border-top: none;
	    border-left: none;
	    cursor: pointer;
	}

	

</style>
