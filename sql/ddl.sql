CREATE DATABASE Proyecto2;
USE Proyecto2;



CREATE TABLE Temp(
	id int auto_increment primary key,
	INVENTO varchar(200) null,
	INVENTOR varchar(200) null,
    PROFESIONAL_ASIGANDO_AL_INVENTO varchar(200) null,
    EL_PROFESIONAL_ES_JEFE_DEL_AREA varchar(200) null,
    FECHA_CONTRATO_PROFESIONAL varchar(200) null,
    SALARIO varchar(200) null,
    COMISION varchar(200) null,
    AREA_INVEST_DEL_PROF varchar(200) null,
	RANKING varchar(200) null,
    ANIO_DEL_INVENTO varchar(200) null,
    PAIS_DEL_INVENTO varchar(200) null,
    PAIS_DEL_INVENTOR varchar(200) null,
    REGION_DEL_PAIS varchar(200) null,
    CAPITAL varchar(200) null,
    POBLACION_DEL_PAIS varchar(200) null,
    AREA_EN_KM2 varchar(200) null,
    FRONTERA_CON varchar(200) null,
    NORTE varchar(200) null,
    SUR varchar(200) null,
    ESTE varchar(200) null,
    OESTE varchar(200) null
);

CREATE TABLE Carga2(
	NOMBRE_ENCUESTA varchar(200) null,
    PREGUNTA varchar(500) null,
	RESPUESTAS_POSIBLES varchar(200) null,
    RESPUESTA_CORRECTA varchar(200) null,
    PAIS varchar(200) null,
    RESPUESTA_PAIS varchar(200) null
);

CREATE TABLE Carga3(
	NOMBRE_REGION varchar(200) null,
    REGION_PADRE varchar(200) null
);

CREATE TABLE Continente(
	id int primary key auto_increment,
    nombre varchar(100) not null
);

CREATE TABLE Region(
	id int primary key auto_increment,
	nombre varchar(100) not null,
    idContinente int not null,
    FOREIGN KEY(idContinente) references Continente(id)
);

CREATE TABLE Pais(
	id int primary key auto_increment,
	nombre varchar(150) not null,
    poblacion decimal(12,2) not null,
    area decimal(12,2) not null,
    capital varchar(100) not null,
    region int not null,
    foreign key(region) references Region(id)
);
CREATE TABLE Frontera(
	id int primary key auto_increment,
    pais int not null,
    front int null,
	norte CHAR,
    sur CHAR,
    este CHAR,
    oeste CHAR,
    foreign key(pais) references Pais(id)
);

CREATE TABLE Inventor(
	id int primary key auto_increment,
	nombre varchar(100) not null,
    pais int not null,
    foreign key(pais) references Pais(id)    
);

CREATE TABLE Invento(
	id int primary key auto_increment,
	nombre varchar(100) not null,
    anio int not null,
    pais int not null,
    foreign key(pais) references Pais(id)
);

CREATE TABLE Inventor_Invento(
	id int primary key auto_increment,
	idInvento int not null,
    idInventor int not null,
    foreign key(idInvento) references Invento(id),
    foreign key(idInventor) references Inventor(id)    
);

CREATE TABLE Profesional(
	id int primary key auto_increment,
    nombre varchar(100) not null,
    salario decimal(10,2) not null,
    contrato date not null,
    comision INT NULL
);
CREATE TABLE Asignacion_Invento(
	id int primary key auto_increment,
	profesional int not null,
    invento int not null,
    Foreign key(profesional) references Profesional(id),
    Foreign key(invento) references Invento(id)
);

CREATE TABLE Area(
	id int primary key auto_increment,
	nombre varchar(100) not null,
	rankin int not null,
    descripcion varchar(150) not null
);

CREATE TABLE Jefe_Area(
	id int primary key auto_increment,
	profesional int not null,
    area int not null,
    Foreign key(profesional) references Profesional(id),
    Foreign key(area) references Area(id)
);

CREATE TABLE Profe_Area(
	id int primary key auto_increment,
	profesional int not null,
    area int not null,
    Foreign key(profesional) references Profesional(id),
    Foreign key(area) references Area(id)
);



CREATE TABLE Encuesta(
	id int primary key auto_increment,
	nombre varchar(100) not null
);
 
CREATE TABLE Pregunta(
	id int primary key auto_increment,
	pregunta varchar(500) not null,
    encuensta int not null,
    Foreign key(encuensta) references Encuesta(id)
);

CREATE TABLE Respuesta(
	id int primary key auto_increment,
	respuesta varchar(150) not null,
    pregunta int not null,
    Foreign key(pregunta) references Pregunta(id)    
);

CREATE TABLE Respuesta_correcta(
	id int primary key auto_increment,
	respuesta varchar(150) null,
    idRespuesta int not null,
    pregunta int not null,
    FOREIGN KEY(pregunta) references Pregunta(id)
);

CREATE TABLE Pais_Respuesta(
	id int primary key auto_increment,
	pais int not null,
    pregunta int not null,
    encuesta int not null,
    letra char not null,
	FOREIGN KEY(pais) references Pais(id),
    FOREIGN KEY(encuesta) references Encuesta(id),
    FOREIGN KEY(pregunta) references Pregunta(id)
);

/*VISTAS*/
/*CONSULTA 5*/
CREATE VIEW C51 AS
SELECT P1.nombre, PA.area,  P1.salario FROM Profe_Area PA
JOIN Profesional P1 on PA.profesional = P1.id
ORDER BY area asc;
CREATE VIEW C52 AS
SELECT area, sum(salario) as total_salario, Count(area) as total_empleados, Round(sum(salario)/Count(area),2) as prom_salario from C51
GROUP BY area
ORDER BY area asc;







/*CARGA 1*/
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\carga1.csv' 
into table TEMP 
character set latin1 
fields terminated by ',' 
lines terminated by '\r\n' 
ignore 1 lines 
(INVENTO, INVENTOR, PROFESIONAL_ASIGANDO_AL_INVENTO, EL_PROFESIONAL_ES_JEFE_DEL_AREA, FECHA_CONTRATO_PROFESIONAL, SALARIO, COMISION, AREA_INVEST_DEL_PROF, RANKING, 
ANIO_DEL_INVENTO, PAIS_DEL_INVENTO, PAIS_DEL_INVENTOR, REGION_DEL_PAIS, CAPITAL, POBLACION_DEL_PAIS, AREA_EN_KM2, FRONTERA_CON, NORTE, SUR, ESTE, OESTE);
/*set FECHA_CONTRATO_PROFESIONAL = str_to_date(@var1, '%d/%m/%Y');*/
DELETE FROM TEMP where id = 1401;

/*carga 2*/
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\carga2.csv' 
into table Carga2 
character set latin1 
fields terminated by ',' 
lines terminated by '\r\n' 
ignore 1 lines 
(NOMBRE_ENCUESTA, PREGUNTA, RESPUESTAS_POSIBLES, RESPUESTA_CORRECTA,PAIS,RESPUESTA_PAIS);

/*carga 3*/
LOAD DATA INFILE 'C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\carga3.csv' 
into table Carga3 
character set latin1 
fields terminated by ',' 
lines terminated by '\r\n' 
ignore 1 lines 



