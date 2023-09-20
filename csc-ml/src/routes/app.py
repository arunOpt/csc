import dotenv
dotenv.load_dotenv()
from flask import Flask, jsonify,request, make_response
from langchain.document_loaders import WebBaseLoader
from langchain.indexes import VectorstoreIndexCreator
app = Flask(__name__)

loader = WebBaseLoader("https://www.optisolbusiness.com")
index = VectorstoreIndexCreator().from_loaders([loader])

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    question = data.get('question')
    answer=index.query("How to make pasta")
    return jsonify(message=answer)

@app.errorhandler(404)
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
