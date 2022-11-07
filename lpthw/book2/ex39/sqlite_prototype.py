import sqlite3
conn = sqlite3.connect('ex39.db')
cur = conn.cursor()

#for row in cur.execute('SELECT * From pets ORDER BY age'):
 #   print(row)

pets = cur.execute('SELECT * FROM pets').fetchall()
for pet in pets:
    print(pet)

pet = cur.execute('SELECT name, id, breed FROM pets WHERE id = :pet_id', {'pet_id':1}).fetchone()
print(pet[1])
#to do: look up row factory
conn.close()

