from flask import Flask, request, Response, make_response
import os

app = Flask(__name__)

@app.route('/list', methods=['GET'])
def list_ids():
    try:
        with open('ban-list.txt', 'r') as file:
            lines = [line.strip() for line in file]
        content = '\n'.join(lines)
        return Response(content, mimetype='text/plain')
    except FileNotFoundError:
        return Response("ban-list.txt not found.", mimetype='text/plain')

@app.route('/check', methods=['GET'])
def check():
    user_id = request.headers.get('X-User-ID')
    if not user_id:
        return "Missing X-User-ID header", 400

    try:
        with open('ban-list.txt', 'r') as file:
            file_content = file.read()
            if user_id in file_content:
                response = make_response('True')
                response.headers['X-Is-Listed'] = 'True'
                response.status_code = 200
                return response
            else:
                response = make_response('False')
                response.headers['X-Is-Listed'] = 'False'
                response.status_code = 404
                return response
    except FileNotFoundError:
        return "ban-list.txt not found.", 500

@app.route('/add', methods=['GET'])
def add():
    token = request.headers.get('X-Admin-Token')
    user_id = request.headers.get('X-User-ID')

    if not user_id:
        return "Missing X-User-ID header", 400

    if token == "QkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZIHwgQkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZIHwgQkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZ":
        with open('ban-list.txt', 'a') as file:
            file.write(user_id + '\n')
        return "Added ID to ban-list."
    else:
        return "Wrong token.", 403

@app.route('/remove', methods=['GET'])
def remove():
    token = request.headers.get('X-Admin-Token')
    user_id = request.headers.get('X-User-ID')

    if not user_id:
        return "Missing X-User-ID header", 400

    if token == api_key = os.environ.get("ADMINTOKEN"):
        try:
            with open('ban-list.txt', 'r') as file:
                lines = [line.strip() for line in file if user_id not in line]
            with open('ban-list.txt', 'w') as file:
                for line in lines:
                    file.write(line + '\n')
            return "Removed ID from ban-list."
        except FileNotFoundError:
            return "ban-list.txt not found.", 500
    else:
        return "Wrong token.", 403

if __name__ == '__main__':
    app.run(debug=True)
