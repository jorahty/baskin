DROP TABLE IF EXISTS product_image;

CREATE TABLE product_image(id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);
