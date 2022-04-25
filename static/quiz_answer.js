name2id={
    'Letter_B':1,
    'T_sound':2,
    'K_sound':3,
    'Lip_Roll':4,
    'Zipper_Sound':5,

}


function generatesound(user_answers,quiz_answers) {
    console.log(quiz_answers)


    sounds = quiz_answers['sounds']
    let cur=-1
    for (name in sounds) {
        cur++;
        let sound_col = $("<div class='col-md-3'>")
        let icon_row=$("<div class='row'>")

        let choice = $("<span>")

        choice.addClass("choice")
        choice.attr("data-name", name)

        let sound = $("<audio controls>")
        sound.attr("id","sound_" + name)
        sound.attr("src",sounds[name])
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
        icon_row.append(choice)
        sound_col.append(icon_row)

        let quiz_answer_row=$("<div class='row'>")
        quiz_answer_row.text('Correct answer:'+name)
        sound_col.append(quiz_answer_row)

        let user_answer_row=$("<div class='row'>")
        user_answer_row.text('Your answer:'+user_answers[quiz_id][cur])
        sound_col.append(user_answer_row)

        let review_row=$("<div class='row'>")
        let review_button=$("<button class='review_button'>")
        review_button.text('Review it!')
        review_button.attr('id',name2id[name])
        review_row.append(review_button)
        sound_col.append(review_row)



        $("#sound-section").append(sound_col)
    }

    // $(".image").click(function () {
    //     console.log($(this).attr('id').substring(6))
    //     $("#sound" + $(this).attr('id').substring(6)).trigger("play")
    // });
    $(".review_button").click(function () {

        window.location.href = window.location.origin+'/sound/'+$(this).attr('id').toString();
    });

}





$(document).ready(function () {
    generatesound(user_answers,quiz_answers)



    $("#next_question").click(function(e) {
        quiz_id++;
        window.location.href = window.location.origin+'/quiz/'+quiz_id.toString();
    })


})
