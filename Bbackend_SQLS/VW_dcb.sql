

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
