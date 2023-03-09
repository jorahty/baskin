DROP TABLE IF EXISTS attribute_value;
DROP TABLE IF EXISTS attribute;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;

CREATE TABLE category (slug VARCHAR(32) PRIMARY KEY NOT NULL, parent_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE ON UPDATE CASCADE, data jsonb, UNIQUE(slug));

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_username VARCHAR(32), category_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE ON UPDATE CASCADE, data jsonb);

CREATE TABLE attribute (id CHAR(10) PRIMARY KEY DEFAULT nanoid(10), category_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE ON UPDATE CASCADE, data jsonb, UNIQUE (id));

CREATE TABLE attribute_value (id CHAR(10) PRIMARY KEY DEFAULT nanoid(10), product_id UUID REFERENCES product(id) ON DELETE CASCADE ON UPDATE CASCADE, attribute_id CHAR(10) REFERENCES attribute(id) ON DELETE CASCADE ON UPDATE CASCADE, data jsonb, UNIQUE (id));
