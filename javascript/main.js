var op1 = document.getElementById('op1');
var op2 = document.getElementById('op2');
var opType = document.getElementById('op-type');
var answer = document.getElementsByClassName('answer');

function verify(a){
	console.log(a);
}

function reset(){
	op1.innerHTML = Math.floor(Math.random()*10);
	op2.innerHTML = Math.floor(Math.random()*10);
}

for(i=0; i<answer.length; i++){
	answer[i].addEventListener("click", function(){
		verify(this.innerHTML);
	});
}

// verify();