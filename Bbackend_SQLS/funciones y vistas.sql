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
