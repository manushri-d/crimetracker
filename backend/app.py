from flask import Flask, jsonify, make_response, request
import pymysql
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
DB = {
    'host': '35.193.36.2',
    'user': 'root',
    'password': 'datadubs',
    'database': 'DataDubs',
    'port': 3306, 
    'cursorclass': pymysql.cursors.DictCursor  
}

connection = pymysql.connect(**DB)

#this is in our registration folder, in which we add a user to the database
@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        try:
            data = request.get_json(force=True)
            if data is None:
                raise ValueError('No JSON data received')
            userid = data.get('userid')
            name = data.get('name')
            age = data.get('age')
            race = data.get('race')
            sex = data.get('sex')
            area_name = data.get('area_name')

            if None in (userid, name, age, race, sex, area_name):
                raise ValueError('Missing or invalid data in request')

            with connection.cursor() as cursor:
                sql = """INSERT INTO User (UserId, Name, Age, Race, Sex, AreaName) VALUES (%s, %s, %s, %s, %s, %s)"""
                cursor.execute(sql, (userid, name, age, race, sex, area_name))
                connection.commit()

                return jsonify({'message': 'User added successfully'}), 200
        except ValueError as ve:
            return jsonify({'error': str(ve)}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        try:
            with connection.cursor() as cursor:
                sql = """SELECT * from User"""
                cursor.execute(sql)
                results = cursor.fetchall()
                response_data = jsonify(results).get_data().decode('utf8')
                response = make_response(response_data)
                response.headers['Content-Type'] = 'application/json'
                return response
        except Exception as e:
            return jsonify({'error': str(e)})
        
#this returns the values in user where the userid matches the inputed values
@app.route('/search_user', methods=['GET'])
def search_user():
    try:
        userid = request.args.get('userid')

        with connection.cursor() as cursor:
            sql = "SELECT * from User where UserId = %s"
            cursor.execute(sql, userid)
            results = cursor.fetchall()

            return jsonify(results), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#updating a user to the user database
@app.route('/update_user', methods=['GET', 'PUT'])
def update_user():
    if request.method == 'PUT':
        try:
            data = request.get_json(force=True)
            if data is None:
                raise ValueError('No JSON data received')
            userid = data.get('userid')
            name =data.get('name')
            age = data.get('age')
            race =data.get('race')
            sex = data.get('sex')
            area_name =data.get('area_name')

            if None in (userid, name, age, race, sex, area_name):
                raise ValueError('Wrong data in request')

            with connection.cursor() as cursor:
                sql = """UPDATE User SET Name = %s, Age = %s, Race = %s, Sex = %s, AreaName = %s Where UserId = %s"""
                cursor.execute(sql, (name, age, race, sex, area_name, userid))
                connection.commit()

                return jsonify({'message': 'User added successfully'}), 200
        except ValueError as ve:
            return jsonify({'error': str(ve)}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        try:
            with connection.cursor() as cursor:
                sql = """SELECT * from User"""
                cursor.execute(sql)
                results = cursor.fetchall()
                response_data = jsonify(results).get_data().decode('utf8')
                response = make_response(response_data)
                response.headers['Content-Type'] = 'application/json'
                return response

        except Exception as e:
            return jsonify({'error': str(e)})
        
#we remove the user whos userId matches the inputed values
@app.route('/delete_user', methods=['GET', 'DELETE'])
def delete_user():
    if request.method == 'DELETE':
        try:
            data = request.get_json(force=True)
            userid = data.get('userid')

            with connection.cursor() as cursor:
                sql = """DELETE FROM User WHERE UserId = %s"""
                cursor.execute(sql, (userid))
                connection.commit()

                return jsonify({'message': 'User deleted successfully'}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        try:
            with connection.cursor() as cursor:
                sql = """SELECT * from User"""
                cursor.execute(sql)
                results = cursor.fetchall()
                response_data = jsonify(results).get_data().decode('utf8')
                response = make_response(response_data)
                response.headers['Content-Type'] = 'application/json'
                return response
            
        except Exception as e:
            return jsonify({'error': str(e)})
        
#we serach the area inputed and return the areas in which the crimes were occured
@app.route('/search', methods=['GET'])
def search():
    try:
        area_name = request.args.get('area_name')

        with connection.cursor() as cursor:
            sql = "SELECT * from Area where AreaName = %s"
            cursor.execute(sql, area_name)
            results = cursor.fetchall()

            return jsonify(results), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#the user uses the userid and specific location and biodata to see the crimes relatd to them
@app.route('/specifics_data', methods=['GET'])
def get_specifics_data():
    try:
        userid = request.args.get('userid')

        with connection.cursor() as cursor:

            cursor.execute("CALL getCrime(%s, @occurrences)", (userid,))
    
            cursor.execute("SELECT @occurrences AS occurrences")
            result = cursor.fetchall()
            occurrences = result[0]['occurrences']  

            return jsonify({'occurrences': occurrences}), 200

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)}), 500
    
#we update the crime database with user reported crimes
@app.route('/report_crime', methods=['POST'])
def report_crime():
    try:
        data = request.get_json(force=True)


        if data is None:
            raise ValueError('No JSON data received')
        DR_NO = data.get('DR_NO')
        area_code = data.get('area_code')
        age = data.get('age')
        race = data.get('race')
        sex = data.get('sex')
        area_name = data.get('area_name')
        with connection.cursor() as cursor:
            sql = """Insert into cdnew (DR_NO, Rpt_Dist_No, VictAge, VictSex, VictDescent, AREA_NAME) VALUES(%s, %s, %s, %s, %s, %s);"""
            cursor.execute(sql, (DR_NO, area_code, age, sex, race, area_name) )


            connection.commit()
            return jsonify({'message': 'User added successfully'}), 200
    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
