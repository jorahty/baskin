DROP TABLE IF EXISTS category;

CREATE TABLE category (slug VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(slug));
