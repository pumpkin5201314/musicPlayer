!function(i,t){var n=i(document.body);function o(){this.audio=new Audio,this.status="pause"}o.prototype={bindEvent:function(){i(this.audio).on("ended",function(){n.find(".next-btn").trigger("click")})},play:function(){this.audio.play(),this.status="play"},pause:function(){this.audio.pause(),this.status="pause"},setAudioSource:function(i){this.audio.src=i,this.audio.load()},jumpToplay:function(i){this.audio.currentTime=i,this.play()}},t.audioManager=o}(window.Zepto,window.player||(window.player={}));