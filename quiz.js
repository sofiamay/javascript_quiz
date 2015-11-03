var all_questions = [{
	question:"Javascript is...",
	choices:["A scripting version of the Java programming langauge","A programming language built into web browsers","A font-face inspired by the aesthetics coffee","A style of shaky handwriting resulting from excessive caffeine intake"],
	correct_answer:1
},

{
	question:"What is a closure in the context of programming?",
	choices:["The act of shutting something down","The conclusion of an event", "A need for firm answers", "An inner function that has access to the outer function\'s variables"],
	correct_answer:3
},

{
	question:"What is scope?",
	choices:["Where a variable is active in your code", "to scan or investigate", "the range of a subject", "a device that makes objects appear larger" ],
	correct_answer:0
},

{
	question:"What is functional programming?",
	choices:["A program that functions correctly!","Programming that emphasizes the issue of commands","When mathematical functions not objects are used are used to build programs","Programming based on statements that change the state of the program"],
	correct_answer:2
},

{
	question:"What makes javascript unique?",
	choices:["Objects aren't strongly typed", "Functions are objects which can be parameters", "It is extremely flexible", "All of the above"],
	correct_answer:3
}];


$(document).ready(function(){
	var current_question = 0;
	var usr_choice;

	load_question(all_questions[current_question]);

	$("form").on("click", "input:radio", function(){
		usr_choice = $(this).val();
		$(".btn").removeClass("disabled");
	});

	//if radio button is clicked, activate btn
	$( ".btn" ).on( "click", function() {

		if (!$(".btn").hasClass("disabled")){
	    	
    		//record answer
    		all_questions[current_question]["user_answer"] = usr_choice;
    		current_question +=1;

    		if (current_question == all_questions.length) {
	    		load_results();
	    	}

	    	else {
	    		load_question(all_questions[current_question]);
	    	}
	    	
	    }
	});




});

var load_question = function(current_question) {
	var num_choices = current_question.choices.length;

	$("form").empty();

	$(".question-heading").text(current_question.question);

	if (!$(".btn").hasClass("disabled")) {
		$(".btn").addClass("disabled");
	}

	for (i=0;i<num_choices;i++) {
		$("form").append("<div class='radio'><input type='radio' name='answer_choice' value='" + i + "' /></div>" + current_question.choices[i]);
	}
};

var load_results = function(){
	var correct = 0;
	for (i=0;i<all_questions.length;i++) {
		if (all_questions[i].user_answer == all_questions[i].correct_answer) {
			correct++;
		}
	}
	$(".container").empty().append("<h1>Your Results!</h1><h2>You got " + correct + "/" + all_questions.length + " questions correct</h2>");

};


