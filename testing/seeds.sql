USE crypto_db;

INSERT INTO crypto_db.Cryptocurrencies (name, symbol, imageUrl, createdAt, updatedAt) VALUES 
("Bitcoin", "BTC", "www.cryptocompare.com/media/19633/btc.png", "2018-06-01 00:00:00", "2018-06-01 00:00:00"), 
("42 Coin", "42", "www.cryptocompare.com/media/12318415/42.png", "2018-06-01 00:00:00", "2018-06-01 00:00:00"),
("300 Token", "300", "www.cryptocompare.com/media/27010595/300.png", "2018-06-01 00:00:00", "2018-06-01 00:00:00"),
("365Coin", "365", "www.cryptocompare.com/media/352070/365.png", "2018-06-01 00:00:00", "2018-06-01 00:00:00"),
("404Coin", "404", "www.cryptocompare.com/media/351001/404.png", "2018-06-01 00:00:00", "2018-06-01 00:00:00");


INSERT INTO crypto_db.Users (firstName, lastName, password, email, createdAt, updatedAt) VALUES
("Joyce", "Lam", "abcde", "joyzlsn@gmail.com", "2018-06-01 00:00:00", "2018-06-01 00:00:00");


INSERT INTO crypto_db.UserCryptocurrencies (share, CryptocurrencyId, UserId, createdAt, updatedAt) VALUES
(5, 1, 1, "2018-06-01 00:00:00", "2018-06-01 00:00:00"),
(1, 2, 1, "2018-06-01 00:00:00", "2018-06-01 00:00:00"),
(0.5, 3, 1, "2018-06-01 00:00:00", "2018-06-01 00:00:00"),
(2, 4, 1, "2018-06-01 00:00:00", "2018-06-01 00:00:00");