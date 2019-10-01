#! python3

from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import notices, json, os


# --- Important variables --- #
valid_keys = ['epic', 'yef']



@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/documentation', methods=['GET'])
def documentation():
    return render_template('docs.html')


@app.route('/api', methods=['GET'])
def output():
    if 'key' in request.args:
        user_key = request.args['key']
    else:
        return render_template(
            'error.html',
            title="Bruh.",
            subtitle="You need an API key"
        )
    if user_key not in valid_keys:
        return render_template(
            'error.html',
            title="Oof.",
            subtitle="That's an invalid API key"
        )

    if 'date' in request.args:
        date = request.args['date']
    else:
        date = ''

    notices_table = notices.get_notices(date)
    return jsonify(notices_table)


@app.route('/text', methods=['GET'])
def plaintext():
    if 'date' in request.args:
        date = request.args['date']
    else:
        date = ''

    raw_json =  notices.get_notices(date)

    out = notices.parse_text(raw_json)

    return render_template('rawtext.html', content=out)


@app.route('/notices', methods=['GET'])
def formatted():
    return render_template('notices.html')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')



# --- Error handlers --- #

@app.errorhandler(404)
def page_not_found(e):
    return render_template(
        'error.html',
        title="Error 404",
        subtitle="Page not found."
    )

@app.errorhandler(500)
def page_not_found(e):
    return render_template(
        'error.html',
        title="Error 500",
        subtitle="Internal server error."
    )


if __name__ == "__main__":
    app.run()
