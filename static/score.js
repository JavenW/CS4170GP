function generateresult(quiz_answers) {
    console.log(quiz_answers)

    for (let id in quiz_answers) {
        let single=$("<div class='answer'>Question "+id+": </div>");
        let user=$("<div>Your Picks: </div>");
        let answers=$("<div>Answers: </div>");
        let quiz=quiz_answers[id];
        for (let item in quiz){
            // answers.push(item);
            if(item==='id'){
                continue;
            }
            else{
                user.append("<span>"+quiz[item]+", </span>");
                answers.append("<span>"+item+", </span>")
                // console.log(quiz[item])
            }
        }
        single.append(answers);
        single.append(user);
        $("#quiz-answer").append(single);

        // let choice = $("<div style='display: inline-block;margin: auto' class='col-md-6'>")
        // let sound = $("<audio controls>")
        // sound.attr("id","sound_" + name)
        // sound.attr("src",sounds[name])
        // let check=$("<input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\">");
        // check.attr("data-name", name)
        // choice.append(check)
        // choice.append(sound)
        // selection_question.append(choice);



        // let source = $("<source>")
        // console.log(sounds[name])
        // source.attr("src", sounds[name])
        // source.attr("type", "audio/mpeg")
        // sound.append(source)

        // let button = $('<img>')
        // button.addClass("image")
        // button.attr("id","button_" + name)
        // button.attr('src','/static/play_button.jpg')
        // choice.append(sound)
        // // choice.append(button)
        // $("#sound-section").append(choice)
    }


    // $(".image").click(function () {
    //     console.log($(this).attr('id').substring(6))
    //     $("#sound" + $(this).attr('id').substring(6)).trigger("play")
    // });
}
$(document).ready(function () {
   generateresult(quiz_answers);
});