CREATE TABLE people(                                                                                        
    id INTEGER PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,                                                                                     
    email TEXT NOT NULL,                                                                                   
    age INTEGER                                                                                         
);                                                                                                     

CREATE TABLE device(                                                                                       
    id INTEGER PRIMARY KEY NOT NULL,                                                                        
    name TEXT NOT NULL,                                                                                     
    device_type TEXT NOT NULL,                                                                              
    age INTEGER                                                                                         
);                                                                                                      

CREATE TABLE pets(                                                                                          
    id INTEGER PRIMARY KEY NOT NULL,                                                                        
    name TEXT NOT NULL,                                                                                     
    breed TEXT,                                                                                             
    age INTEGER                                                                                         
);                                                                                                      

CREATE TABLE owners(                                                                                       
    owners_id INTEGER PRIMARY KEY NOT NULL,                                                                 
    device_id INTEGER,                                                                                      
    pet_id INTEGER                                                                                      
); 

INSERT INTO people(id, name, email, age)
    VALUES(1, "Jonathan", "jonrw97@gmail.com", 24);
INSERT INTO people VALUES(2, "Richard", "richard@human.co.za", 40);
INSERT INTO people VALUES(3, "Shannon", "shan@gmail.co.za", 21);

INSERT INTO device(id, name, device_type, age)
    VALUES(1, "Jons Phone", "Hauwei", 0);
INSERT INTO device VALUES(2, "Richards Phone", "iphone 12", 2);
INSERT INTO device VALUES(3, "Shannons Phone", "Iphone 10", 4);

INSERT INTO pets(id, name, breed, age)
    VALUES(1, "Ruby", "dog", 3);
INSERT INTO pets VALUES(2, "Daisey", "dog", 1);
INSERT INTO pets VALUES(3, "Bailey", "cat", 5);

INSERT INTO owners(owners_id, device_id, pet_id)
    VALUES(1,1,3);
INSERT INTO owners VALUES(2,2,1);
INSERT INTO owners VALUES(3,3,2)

