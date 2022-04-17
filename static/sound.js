
let id=topic["id"]

$(document).ready(function () {
    $('#video').attr("src",topic["video_url"]);
    $('#'+topic['topic']).addClass("active");
    $('#prev').click(function (){
        let cur=parseInt(id);
        console.log(cur);
        if (cur===1){
            alert("this is the first sound");
            return;
        }
        cur--;
        window.location.href = window.location.origin+'/sound/'+ cur.toString();

    });
    $('#next').click(function (){
        let cur=parseInt(id);
        if (cur===5){
            alert("this is the last sound");
            return;
        }
        cur++;
        window.location.href = window.location.origin+'/sound/' + cur.toString();

    });
    $('#letter_b').click(function () {
        window.location.href = window.location.origin+'/sound/1';
    });
    $('#t_sound').click(function () {
        window.location.href = window.location.origin+'/sound/2';
    });
    $('#k_sound').click(function () {
        window.location.href = window.location.origin+'/sound/3';
    });
    $('#lip_roll').click(function () {
        window.location.href = window.location.origin+'/sound/4';
    });
    $('#zipper_sound').click(function () {
        window.location.href = window.location.origin+'/sound/5';
    });
});