answer_dict = {"id":quiz_id.toString()}
function generatesound(quiz) {
    console.log(quiz)
    let sounds = quiz['sounds']
    let selection_question=$("#selection")

    for (let name in sounds) {
        let choice = $("<div>")
        let sound = $("<audio controls>")
        sound.attr("id","sound_" + name)
        sound.attr("src",sounds[name])
        let check=$("<input class=\"form-check-input\" type=\"radio\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\">");
        check.attr("data-name", name)
        choice.append(check)
        choice.append(sound)
        selection_question.append(choice);



        // let source = $("<source>")
        // console.log(sounds[name])
        // source.attr("src", sounds[name])
        // source.attr("type", "audio/mpeg")
        // sound.append(source)

        // let button = $('<img>')
        // button.addClass("image")
        // button.attr("id","button_" + name)
        // button.attr('src','/static/play_button.jpg')
        choice.append(sound)
        // choice.append(button)
        $("#sound-section").append(choice)
    }


    // $(".image").click(function () {
    //     console.log($(this).attr('id').substring(6))
    //     $("#sound" + $(this).attr('id').substring(6)).trigger("play")
    // });
}
function init_answer_dict(answer_dict, quiz) {
    let answers = quiz['answers']
    answer_dict[answers] = null

}
$(document).ready(function () {
    generatesound(quiz);
    init_answer_dict(answer_dict, quiz);
    console.log(answer_dict)
    $('#next').hide();
    // let answer=$('input[type="radio"][name="name"]:checked').val();
    $("#submit").click(function(e) {
        let answer=$("#selection input[type='radio']:checked").attr('data-name');
        console.log(answer)
        // init_answer_dict(answer_dict, quiz)
        answer_dict[quiz['answers']] = answer
        console.log(answer_dict)
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
});