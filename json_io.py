#! python3

from flask import Flask, render_template, jsonify, request, send_from_directory
app = Flask(__name__)

import notices, json, os


# --- Important variables --- #
valid_keys = ['epic', 'yef']


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')


@app.route('/notices', methods=['GET'])
def output():
    if 'key' in request.args:
        user_key = request.args['key']
    else:
        return render_template(
            'error.html',
            title="Bruh.",
            subtitle="You need an API key."
        )
    if user_key not in valid_keys:
        return render_template(
            'error.html',
            title="Oof.",
            subtitle="That's an invalid API key."
        )

    if 'date' in request.args:
        date = request.args['date']
    else:
        date = ''
    notices_table = notices.get_notices(date)
    return jsonify(notices_table)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == "__main__":
    app.run()
