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

	load_question(current_question);

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
	    		load_score();
	    	}

	    	else {
	    		load_question(current_question);
	    	}
	    	
	    }
	});




});

var load_question = function(question_index) {
	var current_question = all_questions[question_index];
	var num_choices = current_question.choices.length;

	$("form").empty();

	$("#remaining-questions-counter > h3").text((question_index+1) + "/" + all_questions.length);
	$(".question-heading").text(current_question.question);

	if (!$(".btn").hasClass("disabled")) {
		$(".btn").addClass("disabled");
	}

	for (i=0;i<num_choices;i++) {
		$("form").append("<div class='radio'><label><input type='radio' name='answer_choice' value='" + i + "' />" + current_question.choices[i] + "</label></div>");
	}
};

var load_score = function(){
	var correct = 0;
	for (i=0;i<all_questions.length;i++) {
		if (all_questions[i].user_answer == all_questions[i].correct_answer) {
			correct++;
		}
	}
	$(".main").empty().append("<h1 class='dark-blue'>Your Results!</h1><h2>You got " + correct + "/" + all_questions.length + " questions correct</h2>");
	if (correct < all_questions.length) {	
		$(".main").append("<a><p>View incorrect answers</p></a>");
		$("a").click(function(){
			load_results();
		});
	}
	else {
		$(".main").append("<h2>Congratulations!");
	}

};

var load_results = function(){
	var current_question;

	$(".main").append("<div id='results'><h3>You missed these questions:</h3></div>");
	$("#results").append("<div class='answers'></div>");

	for (var current=0;current<all_questions.length;current++) {
		current_question = all_questions[current];

		if (current_question.user_answer != current_question.correct_answer) {
		 	$(".answers").append("<div class='quiz-question'><form id='question-" + current + "'></form></div>");
		 	$("#question-" + current).append("<h2>" + current_question.question + "</h2>");

		 	for (i=0;i<current_question.choices.length;i++) {
		 		if (i==current_question.correct_answer) {
		 			$("#question-" + current).append("<div class='radio'><label><input type='radio' disabled='disabled' name='answer_choice' value='" + i + "' /><p class='green'>" + current_question.choices[i] + "</p></label></div>");
		 		}
		 		else if (i==current_question.user_answer) {
		 			$("#question-" + current).append("<div class='radio'><label><input type='radio' disabled='disabled' name='answer_choice' value='" + i + "' /><p class='red'>" + current_question.choices[i] + "</p></label></div>");
		 		}
		 		else {
		 			$("#question-" + current).append("<div class='radio'><label><input type='radio' disabled='disabled' name='answer_choice' value='" + i + "' /><p>" + current_question.choices[i] + "</p></label></div>");
		 		}
		 	}
		}
	}
};


