from flask import Flask
from flask import render_template

app = Flask(__name__)

topics = {
    "1": {
        "id": "1",
        "topic": "letter_b",
        "video_url": "https://www.youtube.com/embed/huOO0rPf9eo"
    },
    "2": {
        "id": "2",
        "topic": "t_sound",
        "video_url": "https://www.youtube.com/embed/lE0-QZaPYnU"
    },
    "3": {
        "id": "3",
        "topic": "k_sound",
        "video_url": "https://www.youtube.com/embed/ZO25GGsaYms"
    },
    "4": {
        "id": "4",
        "topic": "lip_roll",
        "video_url": "https://www.youtube.com/embed/fkm1GCcIIaM"
    },
    "5": {
        "id": "5",
        "topic": "zipper_sound",
        "video_url": "https://www.youtube.com/embed/hmyyApLv3AA"
    }

}


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


if __name__ == '__main__':
    app.run(debug=True)
