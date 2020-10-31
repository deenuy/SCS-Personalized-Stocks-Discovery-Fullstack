DROP DATABASE IF EXISTS stocksearch;

create database stocksearch;

use stocksearch;

INSERT INTO `stocksearch`.`Users` (`id`, `firstName`, `lastName`, `username`, `password`, `email`, `createdAt`, `updatedAt`) VALUES ('001', 'Test', 'User', 'test_user', 'test_user', 'test_user', now(), now());
