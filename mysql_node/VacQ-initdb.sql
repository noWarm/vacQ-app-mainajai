CREATE DATABASE IF NOT EXISTS vaccenter;
USE vaccenter;

CREATE TABLE vacCenters (id binary(36) PRIMARY KEY, name char(80), tel char(10));

INSERT INTO vacCenters VALUE (uuid(), 'hospital x', '02-0001111');