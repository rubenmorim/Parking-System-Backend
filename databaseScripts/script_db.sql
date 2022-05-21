Drop Database Parking_System;
Create Database Parking_System ;

Use Parking_System;


CREATE TABLE tipoPagamento (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  tipoPagamento Varchar(50)	
);

CREATE TABLE tipoParque (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  tipoParque Varchar(50)
);

CREATE TABLE Utilizador (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  email Varchar(50) Not Null,
  password INT Not Null,
  firstName Varchar(50) Not Null,
  lastName Varchar(50) Not Null,
  birthday Varchar(50) Not Null
);

CREATE TABLE Wallet (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  idUtilizador INT Not Null,
  idTipoPagamento INT Not Null,
  dados Varchar(50) Not Null,
  Constraint fk_WalletUtilizador FOREIGN KEY(idUtilizador) REFERENCES Utilizador(id),
  Constraint fk_tipoPagamento FOREIGN KEY(idTipoPagamento) REFERENCES tipoPagamento(id)
);

CREATE TABLE Matricula (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  matricula Varchar(50) Not Null,
  idUtilizador INT Not Null,
  isSelected Boolean Not Null,
  Constraint fk_matriculaUtilizador FOREIGN KEY(idUtilizador) REFERENCES Utilizador(id)
);

CREATE TABLE Parque (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  idTipoParque Int Not Null,
  nomeParque Varchar(100) Not Null,
  precoHora float Not Null,
  totalVagas INT Not Null,
  totalOcupados INT Not Null default 0,
  latitude float Not Null,
  longitude float Not Null,
  morada Varchar(255),
  Constraint fk_parque FOREIGN KEY(idTipoParque) REFERENCES tipoParque(id)
);


CREATE TABLE Estacionamento (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  idMatricula INT Not Null,
  idParque INT Not Null,
  idUtilizador INT Not Null,
  entrada Date Not Null,
  saida Date Not Null,
  isPago boolean Not Null default false,
  Constraint fk_estacionamentoUtilizador FOREIGN KEY(idUtilizador) REFERENCES Utilizador(id),
  Constraint fk_estacionamentoMatricula FOREIGN KEY(idMatricula) REFERENCES Matricula(id),
  Constraint fk_estacionamentoParque FOREIGN KEY(idParque) REFERENCES Parque(id)
);




/* Scripts de dados */


/* Tipo Pagamento */ 
Insert Into tipoPagamento(tipoPagamento) Values ("Cartão de Crédito");
Insert Into tipoPagamento(tipoPagamento) Values ("Paypal");

/* Tipo Parque */ 
Insert Into tipoParque(tipoParque) Values ("Parque");
Insert Into tipoParque(tipoParque) Values ("Parquímetro");



/* Utilizador */ 







/* Parques*/

Insert Into Parque(idTipoParque,nomeParque,precoHora,totalVagas,latitude,longitude,morada) Values(1,"Parque do Gil Eanes",0,250,41.689,-8.830,"R. Alves Cerqueira 71, 4900-338 Viana do Castelo");
Insert Into Parque(idTipoParque,nomeParque,precoHora,totalVagas,latitude,longitude,morada) Values(2,"Parquímetro das Autocaravanas",1.50, 100, 41.688, -8.832,"4900 Viana do Castelo");
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque Subterráneo da Avenida",41.690, -8.828,"4900-326 Viana do Castelo", 600 , 1.25 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque da Marina",41.694, -8.819,"Rua de Limia, Viana do Castelo", 100 , 1.80 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque Estacionamento Afonso III",41.695, -8.822,"4900-469 Viana do Castelo", 200 , 1.50 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque do Mercado",41.694, -8.825,"Praça Dona Maria II 36, 4900-494 Viana do Castelo", 185 , 1.05 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque 1º de Maio",41.694, -8.828,"Rua Nova de Santana 1, 4900-534 Viana do Castelo", 400 , 1.80 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque das Autocaravanas II",41.684, -8.846,"Av. de Cabo Verde 59, 4900-351 Viana do Castelo", 50 , 1.50 , 2);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque de Estacionamento Campo da Agonia",41.691, -8.836,"Av. Campo do Castelo 6, 4900-347 Viana do Castelo", 600 , 1.50 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parquímetro da Agonia",41.691, -8.838,"Campo da Agonia, 4900-350 Viana do Castelo", 100 , 1.70 , 2);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parquímetro do Norte",41.692, -8.839,"Campo da Agonia 52 2, 4900-350 Viana do Castelo", 50 , 1.50 , 2);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque da Avenida",41.694, -8.831,"4900-496 Viana do Castelo", 300 , 1.25 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parquímeto do 1º de Maio",41.695, -8.828,"R. de Sá de Miranda 49, 4900-533 Viana do Castelo", 150 , 1.20 , 2);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque Magma",41.696, -8.831,"Avenida 25 Abril, Viana do Castelo", 50 , 1.50 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque Público",41.699, -8.825,"R. Padre Américo 81 4900, Viana do Castelo", 100 , 0 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque Santa Luzia",41.703, -8.834,"Elevador de Santa Luzia, Viana do Castelo", 100 , 0 , 1);
Insert Into Parque(nomeParque,latitude,longitude,morada,totalVagas,precoHora,idTipoParque) Values("Parque Estação Viana Shopping",41.694,-8.832,"R. Gen. Humberto Delgado 101, 4900-317 Viana do Castelo", 600 , 1.05 , 1);
