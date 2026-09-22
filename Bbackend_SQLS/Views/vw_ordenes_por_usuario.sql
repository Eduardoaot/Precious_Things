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
