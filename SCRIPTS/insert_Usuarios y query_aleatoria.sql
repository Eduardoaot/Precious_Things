


INSERT INTO Usuarios (nombre) VALUES 
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


-- Muestra los 100 usuarios en un orden al azar
SELECT id, nombre 
FROM Usuarios 
ORDER BY RAND();



