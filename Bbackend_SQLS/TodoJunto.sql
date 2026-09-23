DROP DATABASE IF EXISTS bd_laquinta;

CREATE DATABASE bd_laquinta;
USE bd_laquinta;


CREATE TABLE Clientes(
	idUsuarios INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

INSERT INTO clientes (nombre) VALUES
('Juan Pérez'), ('María Gómez'), ('Carlos Rodríguez'), ('Ana Martínez'), ('Luis García'),
('Sofía López'), ('Diego Hernández'), ('Laura González'), ('Andrés Sánchez'), ('Elena Díaz'),
('Pedro Torres'), ('Lucía Flores'), ('Javier Ramírez'), ('Valentina Cruz'), ('Manuel Gómez'),
('Camila Morales'), ('Mateo Ortiz'), ('Isabella Gutiérrez'), ('Santiago Reyes'), ('Daniela Ruiz'),
('Alejandro Vidal'), ('Valeria Castillo'), ('Matías Alarcón'), ('Gabriela Soto'), ('Nicolás Silva'),
('Mariana Vega'), ('Benjamín Castro'), ('Catalina Muñoz'), ('Samuel Contreras'), ('Fernanda Rojas'),
('Lucas Herrera'), ('Antonia Medina'), ('Joaquín Cortés'), ('Francisca Acevedo'), ('Tomás Jara'),
('Constanza Fuentes'), ('Felipe Sepúlveda'), ('Martina Concha'), ('Ignacio Donoso'), ('Javiera Espinosa'),
('Francisco Salazar'), ('Amparo Bravo'), ('Rodrigo Valenzuela'), ('Florencia Tapia'), ('Álvaro Vergara'),
('Isidora Saavedra'), ('Cristián Sanhueza'), ('Emilia Pizarro'), ('Jorge Lagos'), ('Amanda Carrasco'),
('Héctor Farías'), ('Pía Pinto'), ('Ricardo Godoy'), ('Rocío Cáceres'), ('Claudio Henríquez'),
('Paulina Orellana'), ('Humberto San Martín'), ('Verónica Zúñiga'), ('Esteban Loyola'), ('Camila Valdés'),
('Gonzalo Retamal'), ('Natalia Poblete'), ('Sebastián Galdames'), ('Bárbara Olivares'), ('Mauricio Maturana'),
('Beatriz Gallardo'), ('Patricio Ahumada'), ('Carolina Troncoso'), ('Marcelo Garrido'), ('Alejandra Baeza'),
('Cristóbal Rozas'), ('Fabiola Venegas'), ('Hugo Arriagada'), ('Loreto Poblete'), ('Gabriel Campos'),
('Jéssica Riquelme'), ('Eduardo Opazo'), ('Clara Cárdenas'), ('Víctor Valdebenito'), ('Daniel Maldonado'),
('Manuel Segura'), ('Silvia Pacheco'), ('Fidel Miranda'), ('Juana Arenas'), ('Marcos Navas'),
('Ángela Aguilar'), ('Roberto Benítez'), ('Julia Soler'), ('Antonio Parra'), ('Rosa Blanco'),
('Enrique Calvo'), ('Teresa Cabrera'), ('Ramón Vidal'), ('Carmen Ferrer'), ('Alfonso Ortiz'),
('Margarita Navarro'), ('Juan Carlos Crespo'), ('Isabel Pastor'), ('Francisco Javier Guijarro'), ('Marta Ramos');

SELECT idUsuarios, nombre
FROM clientes
ORDER BY RAND();


CREATE TABLE Pedido (
  idPedido INT AUTO_INCREMENT PRIMARY KEY,
  NumPedido INT,
  Fecha DATE,
  Cantidad INT NOT NULL,
  Precio INT NOT NULL,
  idCliente int,
  CONSTRAINT fk_Cliente FOREIGN KEY (idCliente) REFERENCES Clientes(idUsuarios)
);

INSERT INTO Pedido (NumPedido, Fecha, Cantidad, Precio, idCliente)
VALUES
    (100000, '2026-04-04', 1, 909, 1),
    (100001, '2026-05-20', 2, 4157, 1),
    (100002, '2026-06-07', 1, 9435, 1),
    (100003, '2026-06-13', 5, 7412, 1),
    (100004, '2026-06-20', 1, 2035, 1),
    (100005, '2026-09-16', 2, 517, 2),
    (100006, '2026-09-03', 1, 574, 2),
    (100007, '2026-09-16', 5, 429, 2),
    (100008, '2026-09-15', 4, 603, 2),
    (100009, '2026-09-14', 1, 777, 2),
    (100010, '2026-09-02', 4, 3287, 3),
    (100011, '2026-08-18', 2, 2263, 3),
    (100012, '2026-08-10', 1, 1259, 3),
    (100013, '2026-08-05', 1, 3440, 3),
    (100014, '2026-08-09', 5, 2666, 3),
    (100015, '2026-09-17', 4, 4892, 3),
    (100016, '2026-09-07', 4, 1145, 3),
    (100017, '2026-07-14', 3, 3462, 3),
    (100018, '2026-07-11', 2, 1069, 3),
    (100019, '2026-09-17', 2, 2870, 3),
    (100020, '2026-09-12', 2, 1327, 3),
    (100021, '2026-08-05', 3, 4214, 3),
    (100022, '2026-07-03', 3, 1832, 3),
    (100023, '2026-08-06', 3, 2216, 3),
    (100024, '2026-06-29', 3, 1084, 3),
    (100025, '2026-09-03', 2, 3187, 4),
    (100026, '2026-08-30', 2, 1669, 4),
    (100027, '2026-09-08', 4, 2105, 4),
    (100028, '2026-09-02', 5, 1899, 4),
    (100029, '2026-09-01', 3, 4452, 4),
    (100030, '2026-08-29', 1, 1938, 4),
    (100031, '2026-08-27', 1, 6292, 5),
    (100032, '2026-09-10', 3, 5271, 5),
    (100033, '2026-09-16', 5, 7940, 5),
    (100034, '2026-09-12', 2, 7684, 5),
    (100035, '2026-09-07', 4, 7633, 5),
    (100036, '2026-08-17', 5, 2387, 6),
    (100037, '2026-07-21', 9, 8930, 6),
    (100038, '2026-07-17', 10, 7119, 6),
    (100039, '2026-04-26', 7, 6030, 6),
    (100040, '2026-07-28', 3, 8448, 6),
    (100041, '2026-05-19', 2, 871, 6),
    (100042, '2026-08-25', 3, 2721, 6),
    (100043, '2026-04-23', 2, 6404, 7),
    (100044, '2026-06-17', 10, 7768, 7),
    (100045, '2026-05-10', 5, 9164, 7),
    (100046, '2026-09-20', 2, 8897, 7),
    (100047, '2026-07-16', 6, 1927, 7),
    (100048, '2026-07-09', 7, 2691, 7),
    (100049, '2026-09-22', 5, 8301, 8),
    (100050, '2026-08-08', 9, 1843, 8),
    (100051, '2026-04-15', 5, 8417, 8),
    (100052, '2026-04-20', 4, 2604, 8),
    (100053, '2026-06-19', 3, 8937, 8),
    (100054, '2026-05-10', 1, 9913, 8),
    (100055, '2026-07-02', 8, 419, 8),
    (100056, '2026-06-22', 5, 4023, 9),
    (100057, '2026-04-30', 2, 1503, 11),
    (100058, '2026-05-21', 2, 8827, 11),
    (100059, '2026-08-21', 3, 7887, 11),
    (100060, '2026-08-11', 5, 8745, 12),
    (100061, '2026-04-20', 7, 3570, 12),
    (100062, '2026-05-07', 4, 5207, 12),
    (100063, '2026-06-12', 6, 7277, 12),
    (100064, '2026-05-13', 8, 2082, 12),
    (100065, '2026-07-21', 4, 1149, 12),
    (100066, '2026-06-28', 1, 9738, 12),
    (100067, '2026-05-04', 4, 9741, 12),
    (100068, '2026-09-21', 2, 1064, 13),
    (100069, '2026-07-26', 2, 614, 13),
    (100070, '2026-06-30', 2, 8523, 13),
    (100071, '2026-07-13', 8, 3610, 14),
    (100072, '2026-05-07', 3, 9455, 14),
    (100073, '2026-04-28', 8, 4081, 14),
    (100074, '2026-06-10', 4, 1645, 15),
    (100075, '2026-08-29', 7, 5904, 15),
    (100076, '2026-06-06', 7, 7751, 15),
    (100077, '2026-09-09', 2, 1093, 15),
    (100078, '2026-06-11', 6, 1890, 15),
    (100079, '2026-07-21', 4, 3216, 15),
    (100080, '2026-05-08', 8, 2396, 15),
    (100081, '2026-08-07', 5, 7679, 16),
    (100082, '2026-07-21', 2, 7360, 16),
    (100083, '2026-05-05', 2, 928, 16),
    (100084, '2026-04-09', 9, 341, 16),
    (100085, '2026-08-30', 4, 2824, 16),
    (100086, '2026-06-10', 8, 7986, 16),
    (100087, '2026-06-12', 1, 2797, 17),
    (100088, '2026-06-17', 1, 6496, 17),
    (100089, '2026-07-17', 8, 4773, 17),
    (100090, '2026-03-28', 9, 8073, 18),
    (100091, '2026-08-14', 4, 4961, 18),
    (100092, '2026-07-29', 1, 9589, 18),
    (100093, '2026-05-07', 1, 5238, 18),
    (100094, '2026-09-08', 1, 9671, 18),
    (100095, '2026-05-23', 9, 8801, 18),
    (100096, '2026-09-08', 9, 1412, 19),
    (100097, '2026-08-06', 2, 9849, 19),
    (100098, '2026-04-03', 4, 6715, 20),
    (100099, '2026-04-30', 4, 9585, 21),
    (100100, '2026-06-07', 10, 9360, 23),
    (100101, '2026-07-04', 5, 3446, 24),
    (100102, '2026-04-04', 6, 4010, 24),
    (100103, '2026-07-17', 7, 2244, 24),
    (100104, '2026-04-04', 5, 7591, 24),
    (100105, '2026-07-04', 2, 252, 24),
    (100106, '2026-05-28', 10, 9324, 24),
    (100107, '2026-08-28', 2, 8908, 24),
    (100108, '2026-07-30', 9, 4445, 24),
    (100109, '2026-06-25', 2, 4102, 25),
    (100110, '2026-06-20', 5, 2684, 25),
    (100111, '2026-05-06', 5, 8766, 26),
    (100112, '2026-09-20', 9, 5005, 26),
    (100113, '2026-04-06', 2, 2300, 26),
    (100114, '2026-07-17', 2, 1853, 26),
    (100115, '2026-05-04', 3, 4562, 26),
    (100116, '2026-07-12', 10, 3550, 26),
    (100117, '2026-06-27', 4, 4425, 26),
    (100118, '2026-05-20', 5, 932, 27),
    (100119, '2026-08-30', 7, 4633, 27),
    (100120, '2026-09-11', 1, 5564, 27),
    (100121, '2026-08-20', 5, 2747, 27),
    (100122, '2026-06-01', 9, 7107, 27),
    (100123, '2026-05-02', 1, 1932, 27),
    (100124, '2026-09-03', 3, 9038, 27),
    (100125, '2026-09-13', 6, 9643, 27),
    (100126, '2026-08-16', 7, 2188, 28),
    (100127, '2026-09-12', 5, 6074, 28),
    (100128, '2026-09-12', 6, 3541, 28),
    (100129, '2026-04-01', 4, 1784, 28),
    (100130, '2026-06-24', 9, 6758, 28),
    (100131, '2026-04-17', 3, 3978, 28),
    (100132, '2026-08-12', 3, 6855, 28),
    (100133, '2026-09-16', 3, 5542, 28),
    (100134, '2026-04-04', 4, 4471, 29),
    (100135, '2026-08-13', 2, 6367, 29),
    (100136, '2026-09-13', 8, 3744, 29),
    (100137, '2026-08-02', 8, 5828, 29),
    (100138, '2026-07-06', 4, 3752, 29),
    (100139, '2026-09-16', 4, 6628, 29),
    (100140, '2026-07-13', 2, 4673, 30),
    (100141, '2026-06-25', 9, 6648, 30),
    (100142, '2026-04-02', 9, 5525, 30),
    (100143, '2026-09-15', 2, 4379, 30),
    (100144, '2026-08-08', 10, 4449, 30),
    (100145, '2026-04-23', 7, 5763, 32),
    (100146, '2026-06-03', 10, 8479, 33),
    (100147, '2026-08-24', 7, 9546, 33),
    (100148, '2026-08-05', 5, 827, 33),
    (100149, '2026-06-03', 1, 8618, 33),
    (100150, '2026-05-08', 4, 6067, 33),
    (100151, '2026-09-05', 6, 5243, 34),
    (100152, '2026-04-06', 2, 5020, 34),
    (100153, '2026-05-16', 5, 6791, 34),
    (100154, '2026-07-01', 7, 4944, 34),
    (100155, '2026-05-04', 3, 3243, 34),
    (100156, '2026-06-07', 7, 2951, 34),
    (100157, '2026-06-11', 9, 106, 35),
    (100158, '2026-07-07', 5, 3543, 35),
    (100159, '2026-06-04', 10, 5379, 35),
    (100160, '2026-05-26', 8, 7344, 35),
    (100161, '2026-05-15', 8, 2880, 36),
    (100162, '2026-04-07', 2, 4749, 36),
    (100163, '2026-05-14', 10, 5591, 36),
    (100164, '2026-07-24', 5, 3780, 37),
    (100165, '2026-08-16', 1, 857, 38),
    (100166, '2026-07-22', 8, 1293, 38),
    (100167, '2026-05-29', 7, 9531, 38),
    (100168, '2026-03-28', 7, 8199, 39),
    (100169, '2026-06-12', 4, 2517, 39),
    (100170, '2026-04-08', 1, 1846, 39),
    (100171, '2026-07-28', 3, 8586, 40),
    (100172, '2026-05-27', 1, 9232, 40),
    (100173, '2026-07-21', 2, 7578, 40),
    (100174, '2026-08-19', 8, 8802, 40),
    (100175, '2026-05-02', 10, 5298, 40),
    (100176, '2026-06-01', 10, 8370, 40),
    (100177, '2026-05-05', 8, 2707, 41),
    (100178, '2026-05-24', 8, 4346, 41),
    (100179, '2026-07-21', 5, 8640, 41),
    (100180, '2026-05-21', 4, 4599, 41),
    (100181, '2026-06-02', 2, 4781, 41),
    (100182, '2026-07-24', 5, 5602, 41),
    (100183, '2026-05-07', 2, 2367, 42),
    (100184, '2026-08-15', 4, 6375, 42),
    (100185, '2026-03-29', 3, 3605, 42),
    (100186, '2026-09-06', 7, 6778, 42),
    (100187, '2026-06-30', 9, 7733, 42),
    (100188, '2026-09-07', 4, 6983, 43),
    (100189, '2026-06-15', 10, 420, 43),
    (100190, '2026-04-28', 7, 7914, 43),
    (100191, '2026-09-21', 6, 4992, 43),
    (100192, '2026-06-15', 7, 8918, 43),
    (100193, '2026-05-06', 10, 3713, 43),
    (100194, '2026-07-28', 5, 7240, 44),
    (100195, '2026-05-21', 1, 6471, 44),
    (100196, '2026-06-28', 7, 2804, 44),
    (100197, '2026-05-26', 3, 8851, 44),
    (100198, '2026-09-16', 7, 9797, 44),
    (100199, '2026-05-01', 1, 1475, 44),
    (100200, '2026-04-11', 7, 2323, 44),
    (100201, '2026-08-07', 1, 4362, 45),
    (100202, '2026-06-17', 6, 3567, 45),
    (100203, '2026-05-29', 6, 5629, 45),
    (100204, '2026-06-17', 5, 7006, 45),
    (100205, '2026-07-20', 2, 7805, 45),
    (100206, '2026-09-18', 9, 953, 45),
    (100207, '2026-06-25', 4, 1224, 45),
    (100208, '2026-08-02', 1, 2596, 48),
    (100209, '2026-07-23', 3, 7858, 48),
    (100210, '2026-04-04', 2, 9340, 48),
    (100211, '2026-05-26', 5, 6143, 49),
    (100212, '2026-08-11', 10, 1976, 49),
    (100213, '2026-08-12', 5, 1871, 49),
    (100214, '2026-04-28', 7, 6598, 51),
    (100215, '2026-08-03', 2, 9800, 51),
    (100216, '2026-03-30', 4, 1769, 51),
    (100217, '2026-03-28', 5, 9937, 51),
    (100218, '2026-05-01', 1, 5788, 52),
    (100219, '2026-06-05', 6, 1229, 53),
    (100220, '2026-05-16', 6, 307, 53),
    (100221, '2026-06-07', 8, 1829, 53),
    (100222, '2026-06-04', 6, 7632, 53),
    (100223, '2026-08-14', 7, 2985, 53),
    (100224, '2026-05-12', 5, 8917, 53),
    (100225, '2026-05-22', 8, 7236, 53),
    (100226, '2026-04-24', 5, 5380, 53),
    (100227, '2026-08-31', 5, 7485, 54),
    (100228, '2026-07-22', 8, 9436, 54),
    (100229, '2026-04-19', 7, 5611, 54),
    (100230, '2026-07-01', 3, 8088, 56),
    (100231, '2026-07-30', 6, 4332, 56),
    (100232, '2026-06-27', 5, 9867, 56),
    (100233, '2026-03-27', 5, 9206, 56),
    (100234, '2026-09-20', 9, 3230, 56),
    (100235, '2026-09-01', 4, 6758, 56),
    (100236, '2026-05-20', 9, 4037, 56),
    (100237, '2026-04-10', 8, 7442, 57),
    (100238, '2026-09-18', 2, 4920, 57),
    (100239, '2026-07-28', 7, 4086, 57),
    (100240, '2026-07-06', 10, 6146, 57),
    (100241, '2026-05-24', 9, 8798, 57),
    (100242, '2026-06-26', 7, 9117, 57),
    (100243, '2026-06-30', 6, 7534, 57),
    (100244, '2026-07-06', 5, 3877, 58),
    (100245, '2026-08-23', 4, 5269, 58),
    (100246, '2026-08-23', 9, 3133, 58),
    (100247, '2026-08-04', 4, 8033, 58),
    (100248, '2026-04-25', 9, 9877, 59),
    (100249, '2026-07-12', 2, 3280, 59),
    (100250, '2026-07-09', 4, 6012, 59),
    (100251, '2026-08-08', 5, 331, 59),
    (100252, '2026-08-21', 5, 845, 60),
    (100253, '2026-09-09', 9, 4886, 60),
    (100254, '2026-03-28', 3, 8142, 60),
    (100255, '2026-08-27', 1, 9505, 60),
    (100256, '2026-07-12', 8, 7943, 60),
    (100257, '2026-06-02', 6, 3120, 60),
    (100258, '2026-09-09', 5, 7927, 60),
    (100259, '2026-08-24', 2, 6665, 60),
    (100260, '2026-09-04', 10, 978, 61),
    (100261, '2026-08-15', 3, 9321, 61),
    (100262, '2026-07-07', 2, 4166, 61),
    (100263, '2026-08-23', 9, 6918, 61),
    (100264, '2026-04-20', 10, 3797, 61),
    (100265, '2026-05-12', 7, 7481, 61),
    (100266, '2026-06-01', 5, 9742, 61),
    (100267, '2026-07-06', 10, 1086, 62),
    (100268, '2026-04-19', 2, 3504, 62),
    (100269, '2026-04-15', 4, 4435, 62),
    (100270, '2026-04-06', 2, 2673, 62),
    (100271, '2026-07-23', 3, 9143, 62),
    (100272, '2026-09-03', 3, 143, 62),
    (100273, '2026-05-30', 10, 7799, 63),
    (100274, '2026-07-10', 1, 3892, 63),
    (100275, '2026-07-11', 5, 7538, 63),
    (100276, '2026-09-04', 4, 4434, 63),
    (100277, '2026-04-15', 10, 3341, 63),
    (100278, '2026-06-06', 2, 9022, 63),
    (100279, '2026-04-10', 3, 4452, 64),
    (100280, '2026-08-17', 2, 1077, 64),
    (100281, '2026-08-11', 5, 9849, 64),
    (100282, '2026-06-02', 2, 7779, 65),
    (100283, '2026-03-30', 5, 6694, 65),
    (100284, '2026-07-15', 9, 8947, 65),
    (100285, '2026-05-19', 8, 1417, 65),
    (100286, '2026-07-02', 10, 4202, 67),
    (100287, '2026-09-16', 2, 3850, 67),
    (100288, '2026-04-03', 10, 9719, 67),
    (100289, '2026-09-17', 5, 9541, 67),
    (100290, '2026-09-12', 3, 7808, 67),
    (100291, '2026-05-13', 8, 4657, 67),
    (100292, '2026-04-26', 7, 8156, 68),
    (100293, '2026-08-30', 8, 5800, 68),
    (100294, '2026-06-29', 6, 1813, 69),
    (100295, '2026-08-12', 6, 6844, 69),
    (100296, '2026-03-29', 8, 4822, 69),
    (100297, '2026-04-06', 7, 9112, 69),
    (100298, '2026-09-13', 8, 1542, 69),
    (100299, '2026-07-04', 5, 5396, 69),
    (100300, '2026-06-11', 9, 118, 70),
    (100301, '2026-05-27', 7, 988, 71),
    (100302, '2026-08-05', 9, 6027, 71),
    (100303, '2026-04-16', 8, 7342, 71),
    (100304, '2026-09-09', 4, 4475, 71),
    (100305, '2026-05-05', 3, 4819, 71),
    (100306, '2026-06-02', 8, 2089, 71),
    (100307, '2026-09-15', 10, 4020, 71),
    (100308, '2026-08-13', 5, 9124, 71),
    (100309, '2026-06-10', 2, 3781, 73),
    (100310, '2026-08-24', 8, 2024, 73),
    (100311, '2026-04-10', 3, 8265, 73),
    (100312, '2026-07-10', 9, 4579, 73),
    (100313, '2026-06-08', 8, 7836, 73),
    (100314, '2026-07-22', 8, 9131, 73),
    (100315, '2026-08-16', 7, 3222, 73),
    (100316, '2026-04-22', 9, 2336, 73),
    (100317, '2026-07-14', 7, 5668, 74),
    (100318, '2026-07-16', 1, 4734, 75),
    (100319, '2026-07-08', 10, 9601, 75),
    (100320, '2026-04-07', 8, 2534, 75),
    (100321, '2026-05-31', 9, 8035, 75),
    (100322, '2026-06-26', 6, 9142, 75),
    (100323, '2026-05-06', 7, 7560, 75),
    (100324, '2026-07-02', 4, 4012, 75),
    (100325, '2026-04-29', 7, 3926, 75),
    (100326, '2026-09-11', 6, 7849, 76),
    (100327, '2026-06-17', 7, 2592, 76),
    (100328, '2026-05-19', 1, 2168, 76),
    (100329, '2026-05-17', 10, 5539, 76),
    (100330, '2026-08-28', 8, 1733, 76),
    (100331, '2026-05-11', 8, 351, 76),
    (100332, '2026-06-10', 3, 1325, 77),
    (100333, '2026-05-25', 5, 5646, 77),
    (100334, '2026-04-09', 2, 5483, 78),
    (100335, '2026-04-03', 9, 6326, 78),
    (100336, '2026-07-03', 8, 8964, 78),
    (100337, '2026-09-13', 10, 1221, 78),
    (100338, '2026-07-24', 5, 3827, 78),
    (100339, '2026-08-30', 7, 1712, 78),
    (100340, '2026-06-01', 3, 5006, 79),
    (100341, '2026-09-08', 5, 5973, 82),
    (100342, '2026-06-19', 7, 2485, 82),
    (100343, '2026-07-22', 9, 6851, 82),
    (100344, '2026-05-01', 3, 2885, 82),
    (100345, '2026-08-09', 2, 6367, 82),
    (100346, '2026-05-18', 10, 2444, 83),
    (100347, '2026-07-25', 8, 4261, 83),
    (100348, '2026-05-28', 5, 253, 83),
    (100349, '2026-07-11', 9, 2688, 84),
    (100350, '2026-09-04', 8, 5761, 84),
    (100351, '2026-04-25', 5, 7051, 84),
    (100352, '2026-03-30', 5, 7584, 84),
    (100353, '2026-07-07', 4, 6402, 84),
    (100354, '2026-05-22', 2, 3986, 84),
    (100355, '2026-06-17', 10, 5981, 84),
    (100356, '2026-03-27', 5, 459, 85),
    (100357, '2026-04-07', 7, 4597, 85),
    (100358, '2026-09-20', 10, 903, 85),
    (100359, '2026-04-20', 8, 4789, 85),
    (100360, '2026-04-20', 6, 3688, 86),
    (100361, '2026-04-13', 4, 4206, 86),
    (100362, '2026-04-02', 3, 1691, 86),
    (100363, '2026-06-02', 1, 9595, 88),
    (100364, '2026-06-21', 3, 1576, 88),
    (100365, '2026-07-09', 6, 6907, 88),
    (100366, '2026-08-09', 4, 2265, 88),
    (100367, '2026-06-21', 9, 8321, 89),
    (100368, '2026-07-15', 3, 4310, 89),
    (100369, '2026-05-22', 5, 5649, 89),
    (100370, '2026-08-24', 8, 1333, 89),
    (100371, '2026-08-17', 4, 6611, 89),
    (100372, '2026-05-03', 6, 1579, 89),
    (100373, '2026-06-13', 1, 4432, 89),
    (100374, '2026-05-08', 2, 7551, 89),
    (100375, '2026-04-03', 5, 9677, 90),
    (100376, '2026-06-17', 6, 1875, 90),
    (100377, '2026-04-03', 4, 7824, 90),
    (100378, '2026-09-16', 10, 9298, 90),
    (100379, '2026-07-01', 10, 3726, 90),
    (100380, '2026-04-13', 8, 5051, 91),
    (100381, '2026-08-24', 3, 842, 92),
    (100382, '2026-09-13', 5, 8171, 92),
    (100383, '2026-08-24', 2, 3946, 92),
    (100384, '2026-05-08', 3, 6467, 92),
    (100385, '2026-05-29', 6, 8950, 92),
    (100386, '2026-06-07', 10, 2631, 92),
    (100387, '2026-04-08', 2, 8117, 93),
    (100388, '2026-04-18', 7, 4683, 93),
    (100389, '2026-09-14', 6, 3659, 93),
    (100390, '2026-06-01', 8, 3968, 93),
    (100391, '2026-06-22', 2, 6118, 93),
    (100392, '2026-05-06', 6, 1092, 93),
    (100393, '2026-07-14', 4, 2101, 94),
    (100394, '2026-05-29', 2, 3575, 94),
    (100395, '2026-04-11', 10, 449, 94),
    (100396, '2026-09-10', 6, 4090, 94),
    (100397, '2026-08-21', 10, 3462, 94),
    (100398, '2026-09-05', 9, 3494, 94),
    (100399, '2026-07-25', 6, 2517, 95),
    (100400, '2026-04-23', 1, 4642, 95),
    (100401, '2026-08-16', 3, 8950, 95),
    (100402, '2026-08-09', 2, 522, 96),
    (100403, '2026-08-20', 1, 5969, 96),
    (100404, '2026-07-24', 10, 5404, 96),
    (100405, '2026-09-18', 3, 4447, 96),
    (100406, '2026-06-07', 9, 1962, 98),
    (100407, '2026-09-06', 8, 7444, 98),
    (100408, '2026-05-14', 10, 1886, 99),
    (100409, '2026-05-30', 9, 3729, 99),
    (100410, '2026-04-18', 1, 8643, 99),
    (100411, '2026-07-07', 8, 610, 99),
    (100412, '2026-09-07', 8, 6680, 99),
    (100413, '2026-03-31', 2, 8132, 100),
    (100414, '2026-06-01', 2, 1423, 100),
    (100415, '2026-07-02', 10, 2530, 100),
    (100416, '2026-09-06', 3, 4605, 100),
    (100417, '2026-04-16', 10, 9084, 100),
    (100418, '2026-07-01', 7, 9887, 100);

	select * from pedido;


CREATE OR REPLACE VIEW vw_ordenes_por_usuario AS
SELECT
    c.idUsuarios AS idCliente,
    c.Nombre AS NombreCliente,
    p.idPedido,
    p.NumPedido,
    p.Fecha,
    p.Cantidad,
    p.Precio,
    (p.Cantidad * p.Precio) AS Total
FROM Clientes c
INNER JOIN Pedido p ON p.idCliente = c.idUsuarios;


USE bd_laquinta;


CREATE TABLE IF NOT EXISTS Etiquetas (
  idEtiqueta INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Cliente_Etiqueta (
  idCliente INT NOT NULL,
  idEtiqueta INT NOT NULL,
  PRIMARY KEY (idCliente, idEtiqueta),
  FOREIGN KEY (idCliente) REFERENCES Clientes(idUsuarios),
  FOREIGN KEY (idEtiqueta) REFERENCES Etiquetas(idEtiqueta)
);

INSERT INTO Etiquetas (nombre) VALUES
('VIP'),
('Coleccionista'),
('Novias'),
('Regalos'),
('Corporativo'),
('Nuevo'),
('Alta joyería');

INSERT INTO Cliente_Etiqueta (idCliente, idEtiqueta) VALUES
(1, 1),
(1, 2),
(2, 4),
(3, 3),
(5, 1),
(5, 7),
(6, 6),
(8, 5);



-- Vista 1: 


DROP VIEW IF EXISTS v_cliente_numeros;

CREATE VIEW v_cliente_numeros AS
SELECT
  c.idUsuarios AS idCliente,
  c.Nombre AS nombre,

  (SELECT COUNT(*)
   FROM Pedido p
   WHERE p.idCliente = c.idUsuarios) AS total_pedidos,

  (SELECT IFNULL(SUM(p.Cantidad * p.Precio), 0)
   FROM Pedido p
   WHERE p.idCliente = c.idUsuarios) AS gasto_total,

  (SELECT COUNT(*)
   FROM Pedido p
   WHERE p.idCliente = c.idUsuarios
     AND p.Fecha >= CURDATE() - INTERVAL 90 DAY) AS pedidos_90d,

  (SELECT IFNULL(SUM(p.Cantidad * p.Precio), 0)
   FROM Pedido p
   WHERE p.idCliente = c.idUsuarios
     AND p.Fecha >= CURDATE() - INTERVAL 90 DAY) AS gasto_90d,

  (SELECT COUNT(*)
   FROM Pedido p
   WHERE p.idCliente = c.idUsuarios
     AND p.Fecha >= CURDATE() - INTERVAL 30 DAY) AS pedidos_30d

FROM Clientes c;



-- Vista 2

DROP VIEW IF EXISTS v_cliente_clasificacion;

CREATE VIEW v_cliente_clasificacion AS
SELECT
  idCliente,
  nombre,
  total_pedidos,
  gasto_total,
  pedidos_90d,
  gasto_90d,
  pedidos_30d,

  CASE WHEN pedidos_90d = 0 THEN 1 ELSE 0 END AS sin_pedido_90d,
  CASE WHEN gasto_total < 5000 THEN 1 ELSE 0 END AS consumo_menor_5mil,
  CASE WHEN total_pedidos > 10 AND gasto_total > 20000 THEN 1 ELSE 0 END AS muchos_pedidos_y_gasto,
  CASE WHEN pedidos_30d >= 4 THEN 1 ELSE 0 END AS cuatro_pedidos_al_mes,

  CASE
    WHEN pedidos_90d = 0 AND gasto_total < 5000 THEN 'riesgo'
    WHEN (total_pedidos > 10 AND gasto_total > 20000)
      OR (pedidos_30d >= 4) THEN 'alto-valor'
    ELSE 'normal'
  END AS tipo_cliente

FROM v_cliente_numeros;



-- Vista 3: cuadros de arriba

DROP VIEW IF EXISTS v_kpis_clientes;

CREATE VIEW v_kpis_clientes AS
SELECT
  tipo_cliente,
  COUNT(*) AS cuantos_clientes,
  ROUND(
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM v_cliente_clasificacion),
    0
  ) AS porcentaje,
  SUM(gasto_90d) AS gasto_90d
FROM v_cliente_clasificacion
GROUP BY tipo_cliente;



-- Vista 4: listado


DROP VIEW IF EXISTS v_listado_clientes;

CREATE VIEW v_listado_clientes AS
SELECT
  c.idCliente,
  c.nombre,
  c.pedidos_90d,
  c.gasto_90d,
  c.tipo_cliente,
  c.sin_pedido_90d,
  c.consumo_menor_5mil,
  c.muchos_pedidos_y_gasto,
  c.cuatro_pedidos_al_mes,
  IFNULL(GROUP_CONCAT(e.nombre SEPARATOR ', '), '') AS etiquetas
FROM v_cliente_clasificacion c
LEFT JOIN Cliente_Etiqueta ce ON ce.idCliente = c.idCliente
LEFT JOIN Etiquetas e ON e.idEtiqueta = ce.idEtiqueta
GROUP BY
  c.idCliente,
  c.nombre,
  c.pedidos_90d,
  c.gasto_90d,
  c.tipo_cliente,
  c.sin_pedido_90d,
  c.consumo_menor_5mil,
  c.muchos_pedidos_y_gasto,
  c.cuatro_pedidos_al_mes;



SELECT * FROM v_kpis_clientes;
SELECT * FROM v_listado_clientes;


-- funcion para traer la cantidad de pedidos n dias por cliente
DROP FUNCTION IF EXISTS pedidos_nDias;

DELIMITER //

CREATE FUNCTION pedidos_nDias (p_idCliente INT, p_nDias INT)
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE v_cantidadPedidos INT DEFAULT 0;
    
    SELECT COUNT(*) INTO v_cantidadPedidos
    FROM Pedido
    WHERE idCliente = p_idCliente 
      AND Fecha >= CURDATE() - INTERVAL p_nDias DAY;
      
    RETURN v_cantidadPedidos;
END //

DELIMITER ;

-- funcion para traer la cantidad de dinero gastado en n dias
DROP FUNCTION IF EXISTS gasto_nDias;

DELIMITER //

CREATE FUNCTION gasto_nDias (p_idCliente INT, p_nDias INT)
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE v_gastoTotal INT DEFAULT 0;
    
    SELECT IFNULL(SUM(Cantidad * Precio), 0) INTO v_gastoTotal
    FROM Pedido
    WHERE idCliente = p_idCliente 
      AND Fecha >= CURDATE() - INTERVAL p_nDias DAY;
      
    RETURN v_gastoTotal;
END //

DELIMITER ;

-- asignar el tipo de cliente
DROP FUNCTION IF EXISTS tipoCliente;

DELIMITER //

CREATE FUNCTION tipoCliente (p_idCliente INT)
RETURNS VARCHAR(20)
READS SQL DATA
BEGIN 
    DECLARE v_pedidos90 INT;
    DECLARE v_pedidos30 INT;
    DECLARE v_gasto30 INT;

	SET v_pedidos90 = pedidos_nDias(p_idCliente, 90);
    SET v_pedidos30 = pedidos_nDias(p_idCliente, 30);
    SET v_gasto30   = gasto_nDias(p_idCliente, 30);

    IF v_pedidos90 = 0 AND v_gasto30 < 5000 THEN
        RETURN 'En riesgo';
    ELSEIF v_pedidos90 > 10 OR v_pedidos30 >= 4 OR v_gasto30 > 20000 THEN
        RETURN 'Alto perfil';
    ELSE
        RETURN 'Normal';
    END IF;
END //

DELIMITER ;

-- vista del listado de clientes
DROP VIEW IF EXISTS vw_ListadoClientes;

CREATE VIEW vw_ListadoClientes AS 
SELECT 
    c.idUsuarios AS idCliente,
    c.Nombre AS NombreCliente,
    pedidos_nDias(c.idUsuarios, 90) AS Pedidos_Ultimos_90Dias,
    gasto_nDias(c.idUsuarios, 90) AS Gasto_Ultimos_90Dias,
    tipoCliente(c.idUsuarios) AS TipoCliente
FROM Clientes c;

SELECT * FROM vw_ListadoClientes;


USE bd_laquinta;

CREATE OR REPLACE VIEW vw_clientes_metricas_financieras AS
SELECT 
    c.idUsuarios AS idCliente,
    c.Nombre AS NombreUsuario,
    
    -- 1. PEDIDOS ÚLTIMOS 90 DÍAS
    COUNT(CASE WHEN p.Fecha >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) THEN p.idPedido END) AS PedidosUltimos90Dias,
    
    -- 2. GASTO ÚLTIMOS 90 DÍAS
    IFNULL(SUM(CASE WHEN p.Fecha >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) THEN p.Precio * p.Cantidad ELSE 0 END), 0) AS GastoUltimos90Dias,
    
    -- 3. GASTO HISTÓRICO
    IFNULL(SUM(p.Precio * p.Cantidad), 0) AS GastoHistorico,
    
    -- 4. PEDIDOS HISTÓRICOS
    COUNT(p.idPedido) AS PedidosHistoricos,
    
    -- 5. ANTIGÜEDAD (Calculado dinámicamente en Años y Meses si tienes la columna fecha_registro)
    -- Si no tienes esa columna en 'clientes', puedes quitar esta línea o usar la fecha de su primer pedido
    IFNULL(CONCAT(
        TIMESTAMPDIFF(YEAR, MIN(p.Fecha), CURDATE()), ' años ',
        TIMESTAMPDIFF(MONTH, MIN(p.Fecha), CURDATE()) % 12, ' meses'
    ), 'Sin compras') AS Antiguedad,
    
    -- 6. TICKET PROMEDIO
    IFNULL(ROUND(AVG(p.Precio * p.Cantidad), 2), 0) AS TicketPromedio

FROM clientes c
LEFT JOIN pedido p ON c.idUsuarios = p.idCliente
GROUP BY c.idUsuarios, c.Nombre;


CREATE OR REPLACE VIEW v_cliente_clasificacion AS
SELECT
  idCliente,
  nombre,
  total_pedidos,
  gasto_total,
  pedidos_90d,
  gasto_90d,
  pedidos_30d,
  CASE WHEN pedidos_90d = 0 THEN 1 ELSE 0 END AS sin_pedido_90d,
  CASE WHEN gasto_total < 5000 THEN 1 ELSE 0 END AS consumo_menor_5mil,
  CASE WHEN total_pedidos > 10 AND gasto_total > 20000 THEN 1 ELSE 0 END AS muchos_pedidos_y_gasto,
  CASE WHEN gasto_90d > 20000 THEN 1 ELSE 0 END AS cuatro_pedidos_al_mes,
  CASE
    WHEN pedidos_90d = 0 AND gasto_total < 5000 THEN 'riesgo'
    WHEN gasto_90d > 20000 THEN 'alto-valor'
    ELSE 'normal'
  END AS tipo_cliente
FROM v_cliente_numeros;


CREATE OR REPLACE VIEW v_listado_clientes AS
SELECT
  idCliente,
  nombre,
  pedidos_90d,
  gasto_90d,
  tipo_cliente,
  sin_pedido_90d,
  consumo_menor_5mil,
  muchos_pedidos_y_gasto,
  cuatro_pedidos_al_mes,
  CONCAT_WS(', ',
    CASE WHEN pedidos_90d = 0 THEN 'Sin pedidos en los últimos 90 días' END,
    CASE WHEN gasto_90d > 20000 THEN 'Gastó más de $20 mil en 90 días' END,
    CASE WHEN total_pedidos > 10 AND gasto_total > 20000 THEN 'Más de 10 pedidos y más de $20 mil en total' END,
    CASE WHEN gasto_total < 5000 THEN 'Gasto histórico menor a $5 mil' END,
    CASE WHEN pedidos_30d >= 4 THEN '4 o más pedidos en el último mes' END,
    CASE WHEN total_pedidos = 0 THEN 'Nunca ha comprado' END
  ) AS etiquetas
FROM v_cliente_clasificacion;
