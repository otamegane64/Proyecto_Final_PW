create database peliculas;
use peliculas;

create table generos(
id int NOT NULL auto_increment,
genero varchar(50) 	NOT NULL,
primary key(id)
);

create table peliculas(
id int NOT NULL auto_increment,
titulo varchar(120) NOT NULL,
director varchar(100),
anio  int,
genero int,
primary key(id),
foreign key(genero) references generos(id)
);
insert into generos(genero) values
('accion');
insert into peliculas(titulo,director,anio,genero) values
('Rambo: Primera sangre','Ted Kotcheff',1982,1);
create view peliculas_Genero as
select peliculas.id, titulo,director,anio,generos.genero from generos
inner join peliculas on generos.id = peliculas.genero;
select *from peliculas_Genero;