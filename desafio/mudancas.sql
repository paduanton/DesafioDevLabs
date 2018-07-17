use DesafioDevLabs;

-- mudancas feitas

ALTER TABLE tabela1 CHANGE `ultima_alteracao` `ultima_alteracao` TIMESTAMP NOT NULL;

ALTER TABLE tabela1_backup CHANGE `id` `id` SMALLINT(6) NOT NULL; -- removendo auto_increment

ALTER TABLE tabela1_backup DROP PRIMARY KEY;

ALTER TABLE tabela1_backup CHANGE `ultima_alteracao` `ultima_alteracao` TIMESTAMP NOT NULL;

DELIMITER $$
CREATE TRIGGER inserir_backup2
  BEFORE UPDATE
  ON tabela1
  FOR EACH ROW
  BEGIN
    INSERT INTO tabela1_backup (id, nome, email, senha, ultima_alteracao)
    VALUES (OLD.id, OLD.nome, OLD.email, OLD.senha, NOW());
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

-- mudancas que cogitei fazer

DELIMITER $$ -- alternativa funcional
CREATE TRIGGER inserir_senha_md5
  BEFORE INSERT
  ON tabela1
  FOR EACH ROW
  BEGIN
    SET NEW.senha = md5(new.senha);
  END$$
DELIMITER ;

-- nao sao viaveis, pois nao sao funcionais
DELIMITER $$
CREATE TRIGGER inserir_copia
  AFTER INSERT
  ON tabela1
  FOR EACH ROW
  BEGIN
    INSERT INTO tabela1_backup (id, nome, email, senha, ultima_alteracao)
    VALUES (NEW.id, NEW.nome, NEW.email, NEW.senha, NEW.ultima_alteracao);
  END$$
DELIMITER ;

DELIMITER $$ -- depende do inserir_copia para funcionar
CREATE TRIGGER inserir_backup
  BEFORE UPDATE
  ON tabela1
  FOR EACH ROW
  BEGIN
    UPDATE tabela1_backup
    SET ultima_alteracao = NOW()
    where id = old.id;
  END$$
DELIMITER ;