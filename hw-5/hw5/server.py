from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


current_id = 4
sales = [
    {
        "id": 1,
        "salesperson": "James D. Halpert",
        "client": "Shake Shack",
        "reams": 1000
    },
    {
        "id": 2,
        "salesperson": "Stanley Hudson",
        "client": "Toast",
        "reams": 4000
    },
    {
        "id": 3,
        "salesperson": "Michael G. Scott",
        "client": "Computer Science Department",
        "reams": 10000 
    },
]

clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
]




@app.route('/')
def welcome():
   return render_template('welcome.html')   




@app.route('/infinity')
def infinity():
    return render_template('log_sales.html', sales = sales, clients = clients)  


# AJAX FUNCTIONS

@app.route('/save_sale', methods=['GET', 'POST'])
def save_sale():

    global current_id
    global sales
    global clients

    json_data = request.get_json()

    sales.insert(0,{
        "salesperson": json_data["salesperson"],
        "client": json_data["client"],
        "reams": json_data["reams"]
    })
    current_id += 1

    if json_data["client"] not in clients:
        clients.append(json_data["client"])

    return jsonify(sales=sales, clients=clients)


@app.route('/delete_sale', methods=['GET', 'POST'])
def delete_sale():

    global current_id
    global sales

    json_data = request.get_json()
    
    sales.pop(int(json_data["id"])-1)
    for i, sale in enumerate(sales):
        sale["id"] = i + 1
    current_id -= 1

    return jsonify(sales=sales)



if __name__ == '__main__':
   app.run(debug = True)




