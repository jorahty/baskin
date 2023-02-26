DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;

CREATE TABLE category (slug VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(slug));

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_username VARCHAR(32), category_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE, data jsonb);

CREATE TABLE favorite (member_username VARCHAR(32), product_id UUID REFERENCES product(id) ON DELETE CASCADE, UNIQUE (member_username, product_id));