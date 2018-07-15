use DesafioDevLabs;

DROP TABLE IF EXISTS `tabela1`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tabela1` (
  `id`               smallint(6)  NOT NULL AUTO_INCREMENT,
  `nome`             varchar(100) NOT NULL,
  `email`            varchar(130) NOT NULL,
  `senha`            varchar(80)  NOT NULL,
  `ultima_alteracao` timestamp,
  PRIMARY KEY (`id`)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

ALTER TABLE tabela1
  CHANGE `ultima_alteracao` `ultima_alteracao` datetime not null;

DELIMITER $$
CREATE TRIGGER inserir_senha_md5
  BEFORE INSERT
  ON tabela1
  FOR EACH ROW
  BEGIN
    SET NEW.senha = md5(new.senha);
  END$$
DELIMITER ;


ALTER TABLE tabela1_backup
  CHANGE `ultima_alteracao` `ultima_alteracao` datetime not null;

ALTER TABLE tabela1_backup
  CHANGE `id` `id` smallint(6) NOT NULL;

ALTER TABLE tabela1_backup
  DROP PRIMARY KEY;

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

DELIMITER $$
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

-- ou

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

CALL retornaTabela('tabela1');