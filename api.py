from flask import Flask

# Create an instance of the Flask class.
# __name__ is a convenient shortcut for the name of the application's module or package.
app = Flask(__name__)

# Use the route() decorator to define a URL route and associate it with a function.
# When a user navigates to the root URL ("/"), the hello_world function will be executed.
@app.route("/")
def hello_world():
    # The function returns an HTML string that will be displayed in the browser.
    return "<p>Hello, World!</p>"

# This block ensures the application runs only when the script is executed directly.
if __name__ == "__main__":
    # Run the Flask development server.
    # debug=True enables debug mode, which provides helpful error messages and automatically reloads the server on code changes.
    app.run(debug=True)
