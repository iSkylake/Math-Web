var op1 = document.getElementById('op1');
var op2 = document.getElementById('op2');
var opType = document.getElementById('op-type');
var option = document.getElementsByClassName('option');
var replay = document.getElementById('replay');

var operations = {
	'+': function(x, y){ return x + y },
	'X': function(x, y){ return x * y}
};

var genOp = {
	'+': function(){ return Math.floor(Math.random()*10) },
	'X': function(){ return Math.floor(Math.random()*10) }
};

var genOption = {
	'+': function(){ return Math.floor(Math.random()*21) },
	'X': function(){ return Math.floor(Math.random()*82) }
};

function verify(answer){
	var correct = operations[opType.innerHTML](parseInt(op1.innerHTML), parseInt(op2.innerHTML))
	if(parseInt(answer.innerHTML) !== correct){
		answer.className += " wrong";
	} else {
		answer.className += " right";
		for(i=0; i<4; i++){
			if(parseInt(option[i].innerHTML) !== correct){
				option[i].className += " hidden";
			}
		}
		replay.classList.remove('hidden');
	}
}

function reset(symbol){
	var operator1 = genOp[symbol]();
	var operator2 = genOp[symbol]();

	opType.innerHTML = symbol;
	op1.innerHTML = operator1;
	op2.innerHTML = operator2;
	
	var options = [];

	for(i=0; i<4; i++){
		option[i].classList.remove('wrong', 'right', 'hidden');
	}

	replay.className = 'hidden';

	var correctAnswer = operations[symbol](operator1, operator2);

	options.push(correctAnswer);

	for(i=0; i<3; i++){
		var genNum = genOption[symbol]();
		while(options.includes(genNum)){
			genNum = genOption[symbol]();
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
		verify(this);
	});
}

replay.addEventListener("click", function(){
	reset(opType.innerHTML);
});