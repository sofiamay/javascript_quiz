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
}];


$(document).ready(function(){
	var current_question = 0;
	var usr_choice;

	load_question(all_questions[current_question]);

	$("form").on("click", "input:radio", function(){
		usr_choice = $(this).val();
		$(".btn").addClass("active");
	});

	//if radio button is clicked, activate btn
	$( ".btn" ).on( "click", function() {

		if ($(".btn").hasClass("active")){
	    	
    		//record answer
    		all_questions[current_question]["user_answer"] = usr_choice;
    		alert(all_questions[current_question].user_answer);
    		alert(all_questions[current_question].correct_answer);
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

	if ($(".btn").hasClass("active")) {
		$(".btn").removeClass("active");
	}

	for (i=0;i<num_choices;i++) {
		$("form").append("<input type='radio' name='answer_choice' value='" + i + "' />" + current_question.choices[i]);
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


