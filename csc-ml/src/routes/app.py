import dotenv
dotenv.load_dotenv()
from flask import Flask, jsonify,request, make_response
from langchain.document_loaders import WebBaseLoader
from langchain.indexes import VectorstoreIndexCreator
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

loader = WebBaseLoader("https://www.optisolbusiness.com")
index = VectorstoreIndexCreator().from_loaders([loader])

@app.route('/api/chatbot', methods=['POST'])
@cross_origin()
def chatbot():
    data = request.get_json()
    question = data.get('question')
    answer=index.query(question)

    return jsonify(message=answer)

@app.errorhandler(404)
@cross_origin()
def resource_not_found(e):
    return make_response(jsonify(error='Not found!'), 404)
