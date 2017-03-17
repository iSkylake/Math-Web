var op1 = document.getElementById('op1');
var op2 = document.getElementById('op2');
var opType = document.getElementById('op-type');
var option = document.getElementsByClassName('option');

function verify(answer){
	if(answer !== parseInt(op1.innerHTML) + parseInt(op2.innerHTML)){
		
	}
}

function reset(){
	op1.innerHTML = Math.floor(Math.random()*10);
	op2.innerHTML = Math.floor(Math.random()*10);
	var options = [];

	var rightAnswer = parseInt(op1.innerHTML) + parseInt(op2.innerHTML);

	options.push(rightAnswer);

	for(i=0; i<3; i++){
		var genNum = Math.floor(Math.random()*10);
		while(options.includes(genNum)){
			genNum = Math.floor(Math.random()*10);
		}
		options.push(genNum);
	}

	options.sort(function(a, b){return 0.5 - Math.random()});

	for(i=0; i<4; i++){
		option[i].innerHTML = options[i];
	}
}

for(i=0; i<option.length; i++){
	option[i].addEventListener("click", function(){
		verify(this.innerHTML);
	});
}

// verify();