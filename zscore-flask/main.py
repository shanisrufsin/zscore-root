from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pandas as pd;
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

app = Flask(__name__);
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/',methods=['POST'])
@cross_origin()
def home():
    body = request.get_json()
    zscore = body['zscore']
    district = body['district']

    data = pd.read_csv("./zscores.csv")
    X = data.drop(columns=['district_name','course_name','university_name','stream_name','course','university','o_zscore'])
    y = data['course']
    print(X)
    model = DecisionTreeClassifier()
    model.fit(X,y)

    zs = int(zscore)
    district = int(district)

    predictFor = [];
    for i in range(zs,0,-1000):
        predictFor.append([1,district,i])

    print(predictFor)
    prediction = model.predict(predictFor)

    predictions = prediction.tolist()
    return jsonify(list(set(predictions)))

@app.route('/new',methods=['POST'])
@cross_origin()
def new():
    body = request.get_json()
    zscore = body['zscore']
    district = body['district']

    # Read data from CSV file
    file_path = "./zscores.csv"  # Replace with the actual path to your CSV file
    df = pd.read_csv(file_path)

    # Define features (X) and target variable (y)
    le = LabelEncoder()
    X = df[["district", "stream", "zscore"]]
    y = df["course"]

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a decision tree classifier
    clf = DecisionTreeClassifier()

    # Train the classifier on the training data
    clf.fit(X_train, y_train)

    # Make predictions on the test data
    y_pred = clf.predict(X_test)

    # Evaluate the accuracy of the model
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Accuracy: {accuracy}")

    

    zs = int(zscore)
    district = int(district)

    predictFor = [];
    for i in range(zs,0,-1000):
        predictFor.append([1,district,i])

    # Now, you can use the trained model to make predictions on new data
    prediction = clf.predict(predictFor)
    predictions = prediction.tolist()
    return jsonify(list(set(predictions)))


if __name__ == "__main__":
     app.run(port=1234, debug=True)