from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="tienda_online"
    )
    print("Conexión a la base de datos exitosa.")
except mysql.connector.Error as err:
    print(f"Error al conectar a la base de datos: {err}")
    exit(1)

# Función genérica de respuesta
def response(status_code, message, data=None):
    response_data = {
        'message': message,
        'data': data
    }
    return jsonify(response_data), status_code

@app.route('/TiendaPro/Pages/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Faltan datos del usuario'}), 400

    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM usuario WHERE correo_usuario = %s", (email,))
        user = cursor.fetchone()
        if user and user['contrasena_usuario'] == password:  # Compara la contraseña directamente
            return response(200, 'Inicio de sesión exitoso', user)
        else:
            return response(401, 'Credenciales incorrectas')
    except Exception as e:
        print(f"Error durante la consulta: {e}")
        return response(500, 'Error interno del servidor')
    finally:
        cursor.close()

@app.route('/TiendaPro/Pages/products', methods=['GET'])
def get_products():
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT id_producto, nombre_producto, 
                    descripcion_producto, precio_producto, 
                    imagen_producto, 
                    ventas_producto, 
                    stock_producto,
                    c.nombre_categoria AS categoria
            FROM tienda_online.producto
            INNER JOIN tienda_online.categoria c 
                ON tienda_online.producto.id_categoria = c.id_categoria
            where tienda_online.producto.id_categoria != 5;
        """)
        products = cursor.fetchall()
        cursor.close()
        
        return jsonify(products), 200
    except Exception as e:
        print(f"Error al obtener productos: {e}")
        return jsonify({"error": "Error al obtener productos"}), 500

@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        cursor = db.cursor()
        cursor.execute("SELECT id_categoria, nombre_categoria FROM categoria")
        categories = cursor.fetchall()
        result = [{"id_categoria": c[0], "nombre_categoria": c[1]} for c in categories]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()

@app.route('/TiendaPro/Pages/top-selling-products', methods=['GET'])
def get_top_selling_products():
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
                      SELECT p.id_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, 
               p.imagen_producto, p.ventas_producto, c.nombre_categoria
        FROM tienda_online.producto p
        INNER JOIN tienda_online.categoria c 
            ON p.id_categoria = c.id_categoria
        WHERE p.id_categoria != 5
        ORDER BY p.ventas_producto DESC
        LIMIT 3;
    """)
    top_products = cursor.fetchall()
    cursor.close()
    return jsonify(top_products), 200

@app.route('/TiendaPro/Pages/services', methods=['GET'])
def get_services():
    cursor = db.cursor(dictionary=True)
    cursor.execute(""" 
        SELECT p.id_producto, p.nombre_producto, p.descripcion_producto, p.precio_producto, 
               p.imagen_producto, p.ventas_producto, c.nombre_categoria
        FROM tienda_online.producto p
        INNER JOIN tienda_online.categoria c 
            ON p.id_categoria = c.id_categoria
        WHERE p.id_categoria = 5; 
    """)
    services = cursor.fetchall()
    cursor.close()
    return jsonify(services), 200

@app.route('/TiendaPro/Pages/update-stock', methods=['POST'])
def update_stock():
    data = request.json
    product_id = data.get("id_producto")
    quantity = data.get("quantity")

    if not product_id or not quantity:
        return jsonify({"error": "Faltan datos para actualizar el stock"}), 400

    try:
        cursor = db.cursor()
        cursor.execute("""
            UPDATE producto 
            SET stock_producto = stock_producto - %s 
            WHERE id_producto = %s AND stock_producto >= %s
        """, (quantity, product_id, quantity))
        db.commit()

        if cursor.rowcount == 0:
            return jsonify({"error": "Stock insuficiente o producto no encontrado"}), 400

        return jsonify({"message": "Stock actualizado con éxito"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()


if __name__ == '__main__':
    app.run(debug=True)
