-- mudancas feitas

ALTER TABLE tabela1_backup CHANGE `id` `id` SMALLINT(6) NOT NULL, DROP PRIMARY KEY; -- removendo auto_increment e chave primaria

DELIMITER $$
CREATE TRIGGER inserir_backup
  BEFORE UPDATE
  ON tabela1
  FOR EACH ROW
  BEGIN
    INSERT INTO tabela1_backup (id, nome, email, senha)
    VALUES (OLD.id, OLD.nome, OLD.email, OLD.senha);
  END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `retornaTabela`(IN nomeTabela VARCHAR(40))
  BEGIN
    SET @t1 = CONCAT('SELECT * FROM ', nomeTabela);
    PREPARE stmt3 FROM @t1;
    EXECUTE stmt3;
    DEALLOCATE PREPARE stmt3;
  END $$
DELIMITER ;

-- *************************************************************************************

-- mudanca funcional em alternativa ao angular-md5

DELIMITER $$ -- alternativa funcional nao implementada
CREATE TRIGGER inserir_senha_md5
  BEFORE INSERT
  ON tabela1
  FOR EACH ROW
  BEGIN
    SET NEW.senha = md5(new.senha);
  END$$
DELIMITER ;