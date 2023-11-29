# gestao-usuarios

## Criação da tabela 'users' no banco MySQL
```
CREATE TABLE apiusers.users (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(50),
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    role INT NOT NULL,
    PRIMARY KEY (id)
);
```

## Criação da tabela 'passwordtoken' no banco MySQL
```
CREATE TABLE `apiusers`.`passwordtoken` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(200) NULL DEFAULT 0,
  `user_id` INT UNSIGNED NULL DEFAULT 0,
  `used` TINYINT UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`));
```
```
ALTER TABLE `apiusers`.`passwordtoken` 
ADD INDEX `user_id_idx` (`user_id` ASC) VISIBLE;
;
ALTER TABLE `apiusers`.`passwordtoken` 
ADD CONSTRAINT `user_id`
  FOREIGN KEY (`user_id`)
  REFERENCES `apiusers`.`passwordtoken` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```