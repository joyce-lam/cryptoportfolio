DROP DATABASE IF exists crypto_db;
CREATE DATABASE crypto_db;
USE crypto_db;


CREATE TABLE IF NOT EXISTS `Cryptocurrencies` 
(`id` INTEGER NOT NULL auto_increment , 
`name` VARCHAR(255), 
`symbol` VARCHAR(255), 
`imageUrl` VARCHAR(255), 
`createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
PRIMARY KEY (`id`)) ;

CREATE TABLE IF NOT EXISTS `Users` 
(`id` INTEGER NOT NULL auto_increment , 
`name` VARCHAR(255), 
`email` VARCHAR(255), 
`password` VARCHAR(255), 
`createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `UserCryptocurrencies` 
(`id` INTEGER NOT NULL auto_increment , 
`share` FLOAT, 
`createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
`CryptocurrencyId` INTEGER, 
`UserId` INTEGER NOT NULL, 
PRIMARY KEY (`id`), 
FOREIGN KEY (`CryptocurrencyId`) REFERENCES `Cryptocurrencies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, 
FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE);
