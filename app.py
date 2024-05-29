from flask import Flask, request, jsonify
 
app = Flask(__name__)
 
@app.route('/submit', methods=['POST'])
def receive_data():
    data = request.get_json()
    product_name = data.get('product_name')
    price = data.get('price')
    quantity = data.get('quantity')
    total = data.get('total')
 
    print('Nom du produit:', product_name)
    print('Prix:', price)
    print('Quantité:', quantity)
    print('Total:', total)
 
    return jsonify({'message': 'Données reçues avec succès'})
 
if __name__ == '__main__':
    app.run(port=3002)
 