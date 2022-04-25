import json
from flask import Flask, jsonify
from flask import render_template, request, url_for, redirect

app = Flask(__name__)

topics = {
    "1": {
        "id": "1",
        "topic": "letter_b",
        "video_url": "https://www.youtube.com/embed/huOO0rPf9eo",
        "sound_url": "/static/sounds/letter_b_sound.mp3"
    },
    "2": {
        "id": "2",
        "topic": "t_sound",
        "video_url": "https://www.youtube.com/embed/lE0-QZaPYnU",
        "sound_url": "/static/sounds/t_sound.mp3"
    },
    "3": {
        "id": "3",
        "topic": "k_sound",
        "video_url": "https://www.youtube.com/embed/ZO25GGsaYms",
        "sound_url": "/static/sounds/k_sound.mp3"
    },
    "4": {
        "id": "4",
        "topic": "lip_roll",
        "video_url": "https://www.youtube.com/embed/fkm1GCcIIaM",
        "sound_url": "/static/sounds/lip_roll.mp3"
    },
    "5": {
        "id": "5",
        "topic": "zipper_sound",
        "video_url": "https://www.youtube.com/embed/hmyyApLv3AA",
        "sound_url": "/static/sounds/zipper.mp3"
    }

}

drag_quizs = {
    "1": {
        "id": "1",
        "answers": ['Letter_B', 'T_sound', 'K_sound', 'Lip_Roll', 'Zipper_Sound'],
        "sounds": {"Lip_Roll": "/static/sounds/lip_roll.mp3"}
    },
    "2": {
        "id": "2",
        "answers": ['Letter_B', 'T_sound', 'K_sound', 'Lip_Roll', 'Zipper_Sound'],
        "sounds": {"K_sound": "/static/sounds/k_sound.mp3", "Lip_Roll": "/static/sounds/lip_roll.mp3"}
    },
    "3": {
        "id": "3",
        "answers": ['Letter_B', 'T_sound', 'K_sound', 'Lip_Roll', 'Zipper_Sound'],
        "sounds": {"Letter_B": "/static/sounds/letter_b_sound.mp3", "Zipper_Sound": "/static/sounds/zipper.mp3",
                   "K_sound": "/static/sounds/k_sound.mp3", "Lip_Roll": "/static/sounds/lip_roll.mp3"}
    }
}

quiz_answers = {}


# ROUTES

@app.route('/')
def welcome():
    return render_template('homepage.html')


@app.route('/homepage')
def hello_name():
    return render_template('homepage.html')


@app.route('/sound/<topic_id>')
def learn(topic_id):
    curr_topic = topics[topic_id]
    print(type(curr_topic))
    return render_template('sound.html', curr_topic=curr_topic)


@app.route('/quiz/<quiz_id>')
def quiz_id(quiz_id):
    if int(quiz_id) < 4:
        print(drag_quizs)
        return render_template('quiz_drag.html', quiz=drag_quizs[quiz_id], quiz_id=int(quiz_id))

    if int(quiz_id) == 4:
        # correctness = check_answers()
        # num_of_true = correctness.count(True)
        # num_of_false = correctness.count(False)
        # return render_template('score.html', correctness=correctness, t=num_of_true, f=num_of_false,
        #                        total=len(correctness))
        return redirect(url_for('.quizResult'))

    return render_template('homepage.html')


@app.route('/answer/<quiz_id>')
def answerpage(quiz_id):
    user_answers = {}
    ans = []

    answer = quiz_answers[quiz_id]

    for s in drag_quizs[quiz_id]['sounds']:
        for r in answer:
            if s == answer[r]:
                ans.append(r)

    user_answers[quiz_id] = ans
    print(user_answers)
    return render_template('quiz_answer.html', user_answers=user_answers, quiz_answers=drag_quizs[quiz_id],
                           quiz_id=int(quiz_id))


@app.route('/quizResult')
def quizResult():
    correctness = check_answers()
    num_of_true = correctness.count(True)
    num_of_false = correctness.count(False)
    result = []
    for i in correctness:
        if not i:
            result.append("Incorrect")
        else:
            result.append("Correct")
    return render_template('score.html', correctness=result, t=num_of_true, f=num_of_false, total=len(correctness))


def check_answers():
    ans = []
    for id in quiz_answers:
        id = str(id)
        ori_quiz = drag_quizs[id]
        answer = quiz_answers[id]
        correctness = True
        for sound in ori_quiz['sounds']:
            if answer[sound] != sound:
                correctness = False
        ans.append(correctness)

    return ans


@app.route('/store_quiz_info', methods=['POST'])
def store_quiz_info():
    json_data = request.get_json()
    quiz_answers[str(json_data['id'])] = json_data

    return jsonify({})


if __name__ == '__main__':
    app.run(debug=True, port=8000)
