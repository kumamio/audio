class Sound {
	constructor(context){
		this.context = context
	}
	init(){
	    this.oscillator = this.context.createOscillator();
	    this.gainNode = this.context.createGain();

	    this.oscillator.connect(this.gainNode);
	    this.gainNode.connect(this.context.destination);

	}
	play(value){
		this.init();
		this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
		this.oscillator.start();
	}
	stop() {
		this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 1);
		this.oscillator.stop(this.context.currentTime + 1);
	}

}


var context = new AudioContext();
var sound = new Sound(context);
sound.init();
var wave = 'sine';
var buttons = document.getElementsByTagName("input");

for ( button of buttons) {
	button.addEventListener('click', function() {
		console.log(this.value,this.getAttribute("status"));

		sound.oscillator.type = this.getAttribute("id");

		if(this.getAttribute("status")=="stop") {
			this.setAttribute("status","play");
			this.value = this.getAttribute("id")+":play";
			sound.play();
		}
		else{
			this.setAttribute("status","stop");  
			this.value = this.getAttribute("id")+":stop";
			sound.stop();
		}
	})
}