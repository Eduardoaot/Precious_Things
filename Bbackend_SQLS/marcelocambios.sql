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