$(function(){
	"use strict";

	// Constant variables..
	var FROM_PEG=1;
	var TO_PEG=3;
	var AUX_PEG=2;
	var DISCS=9;
	// # stacks for 3 pegs
	var FROM_PEG_stack = [];
	var TO_PEG_stack = [];
	var AUX_PEG_stack = [];

	function init(){
		var $peg = $('#peg_'+FROM_PEG);
		FROM_PEG_stack=[];
		for (var i = DISCS; i >= 1 ; i--) {
			FROM_PEG_stack.push(i);
			// do html for init()
			// $('<div />').addClass('disc disc_'+i+' level_'+(DISCS-i+1)+' ').appendTo($peg);
		};
		TO_PEG_stack =[];
		AUX_PEG_stack=[];
		print();
	}

	function move(from_peg, to_peg){
		// move disc from from to to
		//alert(from_peg +"to"+ to_peg);

		var from = get_stack(from_peg);
		var to = get_stack(to_peg);

		//alert(from +"to"+ to);
		var a = from.pop();
		var b = to.pop();
		if (a==null) {throw "The peg "+from_peg+" is empty!"; return;};
		if(b==null){
			to.push(a);
		} else {			
			if(b>a){
				to.push(b);
				to.push(a);
			} else {
				from.push(a);
				to.push(b);
				throw "Invalid move, Can't move a big disc on a small disc";
				return;
			}
		}
		print();
	}

	function is_valid_move(from, to){
		//alert(peep(to) +">"+ peep(from));
		if (peep(to) > peep(from)) {
			return true;
		} 
		return false;
	}

	function get_stack(peg) {
		// returns the stack of the peg
		switch(peg){
			case 1:
				return FROM_PEG_stack;
			case 2:
				return AUX_PEG_stack;
			case 3:
				return TO_PEG_stack;
		}
	}
	function print(){
		$('#peg_'+FROM_PEG).html(FROM_PEG_stack);
		$('#peg_'+AUX_PEG).html(AUX_PEG_stack);
		$('#peg_'+TO_PEG).html(TO_PEG_stack);
	}
	function play(){
		init();
		towers(DISCS, FROM_PEG, TO_PEG, AUX_PEG);
	}
	// recursive function to solve the problem..
	function towers(n, from_, to_, aux_){
		//alert(n + from + to + aux);
		if (n==1) {
			move(from_, to_);
		};
		print();
		setTimeout(towers( n-1, from_, aux_, to_),1000);
		// setTimeout(towers( n-1, aux_, to_, from_),1000);
	}

	function underflow(stack){
		if (stack.pop()==null) {
				return true;
			}
	}

	// Start the game..
	init();
	// play();
});