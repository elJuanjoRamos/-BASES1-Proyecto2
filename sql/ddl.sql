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
	norte VARCHAR(10),
    sur VARCHAR(10),
    este VARCHAR(10),
    oeste VARCHAR(10),
    pais int not null,
    front int null,
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
    salario decimal(5,2) not null,
    contrato date not null,
    comision decimal(5,2) not null    
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
    descripcion varchar(150) not null,
    jefe int not null,
    Foreign key(jefe) references Profesional(id)
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
	pregunta varchar(100) not null,
    encuensta int not null,
    Foreign key(encuensta) references Encuesta(id)
);

CREATE TABLE Respuesta(
	id int primary key auto_increment,
	respuesta varchar(100) not null,
    letra char not null,
    pregunta int not null,
    Foreign key(pregunta) references Pregunta(id)    
);

CREATE TABLE Respuesta_correcta(
	id int primary key auto_increment,
	pregunta int not null,
    respuesta int not null,
    FOREIGN KEY(pregunta) references Pregunta(id),
    FOREIGN KEY(respuesta) references Respuesta(id)
);

CREATE TABLE Pais_Respuesta(
	id int primary key auto_increment,
	pais int not null,
    respuesta int not null,
	FOREIGN KEY(pais) references Pais(id),
    FOREIGN KEY(respuesta) references Respuesta(id)
);



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
(NOMBRE_REGION, REGION_PADRE);





