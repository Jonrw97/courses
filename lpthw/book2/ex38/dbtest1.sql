create table users(
    id integer not null,
    email_address varchar(255) not null,
    name varchar(255)
);

create table people(
    id integer primary key,
    name text,
    age integer
);

insert into users(id, email_address) values(1, 'jon@gmail.com');
select * from users;
select id,name from users where id=1;

select id, name, age from people;

drop table [schema_name.]people;