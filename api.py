from flask import Flask, request, jsonify, Response

app = Flask(__name__)

@app.route('/list', methods=['GET'])
def list():
    try:
        with open('ban-list.txt', 'r') as file:
            lines = [line.strip() for line in file]

        # Join with newlines and return as plain text
        content = '\n'.join(lines)
        return Response(content, mimetype='text/plain')

    except FileNotFoundError:
        return Response("ban-list.txt not found.", mimetype='text/plain')

        
@app.route('/check', methods=['GET'])
def check():
    id = request.headers.get('X-User-ID')
    with open('ban-list.txt', 'r') as file:
        file_content = file.read()
        if id in file_content:
            response = make_response('True')
            response.headers['X-Is-Listed'] = 'True'
            response.status_code = 200
        else:
            response2 = make_response('False')
            response2.headers['X-Is-Listed'] = 'False'
            response2.status_code = 404
@app.route('/add', methods=['GET'])
def add():
    tkn = request.headers.get('X-Admin-Token')
    id = request.headers.get('X-User-ID')
    if tkn == "QkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZIHwgQkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZIHwgQkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZ":

        if not new_entry:
            return "No entry provided", 400

        with open('ban-list.txt', 'a') as file:
            file.write(id + '\n')
        return "Added ID to ban-list."
    else:
        return "Wrong token."

@app.route('/remove', methods=['GET'])
def remove():
    tkn = request.headers.get('X-Admin-Token')
    if tkn == "QkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZIHwgQkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZIHwgQkVJTkcgR0FZIElTIE9LQVkgfCBCRUlORyBHQVkgSVMgT0tBWSB8IEJFSU5HIEdBWSBJUyBPS0FZ":
        target = request.headers.get('X-User-ID')
    
        if not target:
            return "No target provided", 400
    
        cleaned_lines = []
    
        with open('ban-list.txt', 'r') as file:
            for line in file:
                if target not in line:
                    cleaned_lines.append(line.strip())
    
        # Optionally write back the cleaned list
        with open('ban-list.txt', 'w') as file:
                for line in cleaned_lines:
                file.write(line + '\n')
    
        return "Removed ID from ban-list."

if __name__ == '__main__':
    app.run(debug=True)
