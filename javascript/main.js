var op1 = document.getElementById('op1');
var op2 = document.getElementById('op2');
var opType = document.getElementById('op-type');
var option = document.getElementsByClassName('option');
var replay = document.getElementById('replay');
var menuItem = document.getElementsByTagName('li');

// Menubar highlight
for(i=0; i<menuItem.length; i++){
	menuItem[i].addEventListener('click', function(){
		for(j=0; j<menuItem.length; j++){
			menuItem[j].classList.remove('active');
		}
		this.classList.add('active');
	});
};

// Hash for all operations
var operations = {
	'+': function(x, y){ return x + y },
	'X': function(x, y){ return x * y },
	'-': function(x, y){ return x - y },
	'/': function(x, y){ return x / y }
};

// Hash to generate operators
var genOp = {
	'+': function(){ var arr = []; for(i=0; i<2; i++){arr.push(Math.floor(Math.random()*50))}; return arr; },
	'X': function(){ var arr = []; for(i=0; i<2; i++){arr.push(Math.floor(Math.random()*10))}; return arr; },
	'-': function(){ var arr = []; arr[0] = Math.floor(Math.random()*98)+1; arr[1] = Math.floor(Math.random()*arr[0]); return arr; },
	// '/': function(){ var arr = []; arr[0] = Math.floor(Math.random()*98)+1; arr[1] = Math.floor(Math.random()*arr[0]); while(arr[0] % arr[1] !== 0){ arr[1] = Math.floor(Math.random()*arr[0]); } return arr }
	'/': function(){ var arr = []; arr.push(Math.floor(Math.random()*9+1)); arr.unshift(arr[0]*Math.floor(Math.random()*10)); return arr; }
};

// Hash to generate selections / options
var genOption = {
	'+': function(){ return Math.floor(Math.random()*99) },
	'X': function(){ return Math.floor(Math.random()*82) },
	'-': function(){ return Math.floor(Math.random()*100)},
	'/': function(){ return Math.floor(Math.random()*10)}
};

// Verifies the answer
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

// Reset function
function reset(symbol){

	var operator1, operator2;

	var arr = genOp[symbol]();
	operator1 = arr[0];
	operator2 = arr[1];

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

// Click handler for each options / selection
for(i=0; i<option.length; i++){
	option[i].addEventListener("click", function(){
		verify(this);
	});
}

// Replay button handler
replay.addEventListener("click", function(){
	reset(opType.innerHTML);
});

reset('+');