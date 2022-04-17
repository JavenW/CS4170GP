answer_dict = {"id":quiz_id.toString()}


function generatesound(quiz) {
    console.log(quiz)
    sounds = quiz['sounds']

    for (name in sounds) {
        let choice = $("<span>")
        choice.draggable({
            revert:"invalid"
        })
        choice.addClass("choice")
        choice.attr("data-name", name)

        let sound = $("<audio hidden>")
        sound.attr("id","sound_" + name)

        let source = $("<source>")
        console.log(sounds[name])
        source.attr("src", sounds[name])
        source.attr("type", "audio/mpeg")
        sound.append(source)

        let button = $('<img>')
        button.addClass("image")
        button.attr("id","button_" + name)
        button.attr('src','/static/play_button.jpg')
        choice.append(sound)
        choice.append(button)
        $("#sound-section").append(choice)
    }


    $(".image").click(function () {
        console.log($(this).attr('id').substring(6))
        $("#sound" + $(this).attr('id').substring(6)).trigger("play")
    });   
}

function generateanswers(quiz,answer_dict) {
    answers = quiz['answers']
    console.log(answers)
    for (s in answers) {
        let answer = $("<div class='col-md-2'>")
        let text = $("<p>")
        answer.attr("data-name", answers[s])
        answer.addClass("answer")
        text.text(answers[s])

        answer.append(text)


        $("#answer-section").append(answer)
    }



    
}

function init_answer_dict(answer_dict, quiz) {
    answers = quiz['answers']
    for (s in answers) {
        answer_dict[answers[s]] = null
    }
}

$(document).ready(function () {
    generatesound(quiz)
    generateanswers(quiz)
    init_answer_dict(answer_dict, quiz)
    console.log(answer_dict)
    $('#next').hide()
    $("#submit").click(function(e) {
        $.ajax({
            type: "POST",
            url: "/store_quiz_info",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(answer_dict),
            success: function(result){
                console.log(result)
                $('#next').show()
            },
            error: function(request, status, error){
                  console.log("Error");
                  console.log(request)
                  console.log(status)
                  console.log(error)
            }

      })
    })




    $(".answer").droppable({
		drop: function(event, ui) {
			let name = ui.draggable.attr("data-name")
            let n = $(this).attr("data-name")

            console.log(answer_dict)
			console.log(n)
            console.log(name)
            answer_dict[n] = name
            console.log(answer_dict)
			$(this).css("background-color", "lightblue")
	
		},
		activate: function(event, ui) {
			$(this).css("background-color", "skyblue")
		},
		deactivate: function(event, ui) {
			$(this).css("background-color", "lightblue")
		},
		over: function(event, ui) {
			$(this).css("background-color", "#7393B3")
		},
		out: function(event, ui) {
			$(this).css("background-color", "skyblue")
		}
	})
    
})