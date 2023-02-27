DROP TABLE IF EXISTS account;

CREATE TABLE account(username VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(username));
