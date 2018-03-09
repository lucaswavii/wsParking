-- MySQL Script generated by MySQL Workbench
-- Fri Mar  9 14:26:12 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema wsparking
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wsparking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wsparking` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema wsparking
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema wsparking
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `wsparking` DEFAULT CHARACTER SET utf8 ;
USE `wsparking` ;

-- -----------------------------------------------------
-- Table `wsparking`.`PAGAMENTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`PAGAMENTO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `formula` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`TIPOFUNCIONARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`TIPOFUNCIONARIO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`FUNCIONARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`FUNCIONARIO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cpf` VARCHAR(18) NOT NULL,
  `nome` VARCHAR(160) NOT NULL,
  `fone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `cep` VARCHAR(9) NULL DEFAULT NULL,
  `endereco` VARCHAR(200) NULL DEFAULT NULL,
  `numero` VARCHAR(30) NULL DEFAULT NULL,
  `complemento` VARCHAR(200) NULL DEFAULT NULL,
  `uf` VARCHAR(2) NULL DEFAULT NULL,
  `cidade` VARCHAR(160) NULL DEFAULT NULL,
  `bairro` VARCHAR(160) NULL DEFAULT NULL,
  `tipofuncionario` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_FUNCIONARIO_TIPOFUNCIONARIO1_idx` (`tipofuncionario` ASC),
  CONSTRAINT `fk_FUNCIONARIO_TIPOFUNCIONARIO1`
    FOREIGN KEY (`tipofuncionario`)
    REFERENCES `wsparking`.`TIPOFUNCIONARIO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`CLIENTE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`CLIENTE` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cpfcnpj` VARCHAR(18) NOT NULL,
  `nome` VARCHAR(160) NOT NULL,
  `fone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `cep` VARCHAR(9) NULL DEFAULT NULL,
  `endereco` VARCHAR(200) NULL DEFAULT NULL,
  `numero` VARCHAR(30) NULL DEFAULT NULL,
  `complemento` VARCHAR(200) NULL DEFAULT NULL,
  `uf` VARCHAR(2) NULL DEFAULT NULL,
  `cidade` VARCHAR(160) NULL DEFAULT NULL,
  `bairro` VARCHAR(160) NULL DEFAULT NULL,
  `funcionario` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_CLIENTE_FUNCIONARIO1_idx` (`funcionario` ASC),
  CONSTRAINT `fk_CLIENTE_FUNCIONARIO1`
    FOREIGN KEY (`funcionario`)
    REFERENCES `wsparking`.`FUNCIONARIO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`TIPO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`TIPO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`CAIXA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`CAIXA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`ABERTURAFECHAMENTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`ABERTURAFECHAMENTO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `caixa` INT NOT NULL,
  `funcionario` INT(11) NOT NULL,
  `abertura` DATE NOT NULL,
  `aberturah` TIME NOT NULL,
  `fechamento` DATE NULL,
  `fechamentoh` TIME NULL,
  `saldo` DECIMAL NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ABERTURAFECHAMENTO_CAIXA1_idx` (`caixa` ASC),
  INDEX `fk_ABERTURAFECHAMENTO_FUNCIONARIO1_idx` (`funcionario` ASC),
  CONSTRAINT `fk_ABERTURAFECHAMENTO_CAIXA1`
    FOREIGN KEY (`caixa`)
    REFERENCES `wsparking`.`CAIXA` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ABERTURAFECHAMENTO_FUNCIONARIO1`
    FOREIGN KEY (`funcionario`)
    REFERENCES `wsparking`.`FUNCIONARIO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`MOVIMENTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`MOVIMENTO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `placa` VARCHAR(30) NOT NULL,
  `cliente` INT(11) NOT NULL,
  `pagamento` INT(11) NULL,
  `aberturafechamento` INT NOT NULL,
  `tipo` INT NOT NULL,
  `inicio` DATE NOT NULL,
  `inicioh` TIME NOT NULL,
  `fim` DATE NULL,
  `fimh` TIME NULL,
  `valor` DECIMAL NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_MOVIMENTO_PAGAMENTO_idx` (`pagamento` ASC),
  INDEX `fk_MOVIMENTO_CLIENTE1_idx` (`cliente` ASC),
  INDEX `fk_MOVIMENTO_TIPO1_idx` (`tipo` ASC),
  INDEX `fk_MOVIMENTO_ABERTURAFECHAMENTO1_idx` (`aberturafechamento` ASC),
  CONSTRAINT `fk_MOVIMENTO_PAGAMENTO`
    FOREIGN KEY (`pagamento`)
    REFERENCES `wsparking`.`PAGAMENTO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MOVIMENTO_CLIENTE1`
    FOREIGN KEY (`cliente`)
    REFERENCES `wsparking`.`CLIENTE` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MOVIMENTO_TIPO1`
    FOREIGN KEY (`tipo`)
    REFERENCES `wsparking`.`TIPO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MOVIMENTO_ABERTURAFECHAMENTO1`
    FOREIGN KEY (`aberturafechamento`)
    REFERENCES `wsparking`.`ABERTURAFECHAMENTO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`MENSALISTA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`MENSALISTA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente` INT(11) NOT NULL,
  `quantidade` INT NOT NULL,
  `valor` DECIMAL NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_MENSALISTA_CLIENTE1_idx` (`cliente` ASC),
  CONSTRAINT `fk_MENSALISTA_CLIENTE1`
    FOREIGN KEY (`cliente`)
    REFERENCES `wsparking`.`CLIENTE` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`VEICULO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`VEICULO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` INT NOT NULL,
  `placa` VARCHAR(30) NOT NULL,
  `mensalista` INT NOT NULL,
  PRIMARY KEY (`id`, `mensalista`),
  INDEX `fk_VEICULO_MENSALISTA1_idx` (`mensalista` ASC),
  INDEX `fk_VEICULO_TIPO1_idx` (`tipo` ASC),
  CONSTRAINT `fk_VEICULO_MENSALISTA1`
    FOREIGN KEY (`mensalista`)
    REFERENCES `wsparking`.`MENSALISTA` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_VEICULO_TIPO1`
    FOREIGN KEY (`tipo`)
    REFERENCES `wsparking`.`TIPO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`BANCO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`BANCO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(30) NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`DISPONIVEL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`DISPONIVEL` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `agencia` VARCHAR(30) NOT NULL,
  `conta` VARCHAR(45) NOT NULL,
  `banco` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_DISPONIVEL_BANCO1_idx` (`banco` ASC),
  CONSTRAINT `fk_DISPONIVEL_BANCO1`
    FOREIGN KEY (`banco`)
    REFERENCES `wsparking`.`BANCO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`FINANCEIRO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`FINANCEIRO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `caixa` INT NOT NULL,
  `movimento` INT NOT NULL,
  `disponovel` INT NOT NULL,
  `emissao` DATE NOT NULL,
  `vencimento` DATE NOT NULL,
  `valor` DECIMAL NOT NULL,
  `baixa` DATE NULL,
  `pago` DECIMAL NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_FINANCEIRO_MOVIMENTO1_idx` (`movimento` ASC),
  INDEX `fk_FINANCEIRO_CAIXA1_idx` (`caixa` ASC),
  INDEX `fk_FINANCEIRO_DISPONIVEL1_idx` (`disponovel` ASC),
  CONSTRAINT `fk_FINANCEIRO_MOVIMENTO1`
    FOREIGN KEY (`movimento`)
    REFERENCES `wsparking`.`MOVIMENTO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FINANCEIRO_CAIXA1`
    FOREIGN KEY (`caixa`)
    REFERENCES `wsparking`.`CAIXA` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FINANCEIRO_DISPONIVEL1`
    FOREIGN KEY (`disponovel`)
    REFERENCES `wsparking`.`DISPONIVEL` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`CONFIGURACAO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`CONFIGURACAO` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `somentenumeros` VARCHAR(1) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`VAGA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`VAGA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` INT NOT NULL,
  `quantidade` INT NULL,
  `configuracao` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_VAGA_CONFIGURACAO1_idx` (`configuracao` ASC),
  INDEX `fk_VAGA_TIPO1_idx` (`tipo` ASC),
  CONSTRAINT `fk_VAGA_CONFIGURACAO1`
    FOREIGN KEY (`configuracao`)
    REFERENCES `wsparking`.`CONFIGURACAO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_VAGA_TIPO1`
    FOREIGN KEY (`tipo`)
    REFERENCES `wsparking`.`TIPO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`TABELA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`TABELA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `tipo` INT NOT NULL,
  `inicio` DATE NOT NULL,
  `fim` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_TABELA_TIPO1_idx` (`tipo` ASC),
  CONSTRAINT `fk_TABELA_TIPO1`
    FOREIGN KEY (`tipo`)
    REFERENCES `wsparking`.`TIPO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wsparking`.`FATOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`FATOR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tabela` INT NOT NULL,
  `tolerancia` TIME NOT NULL,
  `sinal` INT NOT NULL,
  `hora` TIME NOT NULL,
  `valor` DECIMAL NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_FATOR_TABELA1_idx` (`tabela` ASC),
  CONSTRAINT `fk_FATOR_TABELA1`
    FOREIGN KEY (`tabela`)
    REFERENCES `wsparking`.`TABELA` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `wsparking` ;

-- -----------------------------------------------------
-- Table `wsparking`.`EMPRESA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`EMPRESA` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cnpj` VARCHAR(18) NOT NULL,
  `razao` VARCHAR(200) NOT NULL,
  `fantasia` VARCHAR(200) NOT NULL,
  `fone` VARCHAR(30) NULL DEFAULT NULL,
  `email` VARCHAR(200) NULL DEFAULT NULL,
  `cep` VARCHAR(9) NULL DEFAULT NULL,
  `endereco` VARCHAR(200) NULL DEFAULT NULL,
  `numero` VARCHAR(30) NULL DEFAULT NULL,
  `complemento` VARCHAR(200) NULL DEFAULT NULL,
  `uf` VARCHAR(2) NULL DEFAULT NULL,
  `cidade` VARCHAR(160) NULL DEFAULT NULL,
  `bairro` VARCHAR(160) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`GRUPO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`GRUPO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`MODULO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`MODULO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`PERMISSAO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`PERMISSAO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `grupo` INT(11) NOT NULL,
  `modulo` INT(11) NOT NULL,
  `ver` VARCHAR(1) NULL DEFAULT NULL,
  `incluir` VARCHAR(1) NULL DEFAULT NULL,
  `alterar` VARCHAR(1) NULL DEFAULT NULL,
  `excluir` VARCHAR(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_PERMISSAO_GRUPO1_idx` (`grupo` ASC),
  INDEX `fk_PERMISSAO_MODULO1_idx` (`modulo` ASC),
  CONSTRAINT `fk_PERMISSAO_GRUPO1`
    FOREIGN KEY (`grupo`)
    REFERENCES `wsparking`.`GRUPO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PERMISSAO_MODULO1`
    FOREIGN KEY (`modulo`)
    REFERENCES `wsparking`.`MODULO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `wsparking`.`USUARIO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `wsparking`.`USUARIO` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  `situacao` VARCHAR(1) NOT NULL,
  `grupo` INT(11) NOT NULL,
  `funcionario` INT(11) NOT NULL,
  `empresa` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_USUARIO_FUNCIONARIO_idx` (`funcionario` ASC),
  INDEX `fk_USUARIO_EMPRESA1_idx` (`empresa` ASC),
  INDEX `fk_USUARIO_GRUPO1_idx` (`grupo` ASC),
  CONSTRAINT `fk_USUARIO_EMPRESA1`
    FOREIGN KEY (`empresa`)
    REFERENCES `wsparking`.`EMPRESA` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USUARIO_FUNCIONARIO`
    FOREIGN KEY (`funcionario`)
    REFERENCES `wsparking`.`FUNCIONARIO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USUARIO_GRUPO1`
    FOREIGN KEY (`grupo`)
    REFERENCES `wsparking`.`GRUPO` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;