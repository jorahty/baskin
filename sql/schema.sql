DROP SCHEMA public cascade;
CREATE SCHEMA public;

CREATE TABLE member (username VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(username));

CREATE TABLE category (slug VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(slug));

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_username VARCHAR(32) REFERENCES member(username) ON DELETE CASCADE ON UPDATE CASCADE, category_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE, data jsonb);

CREATE TABLE conversation (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE message (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), conversation_id UUID REFERENCES conversation(id), data jsonb);

CREATE TABLE conversation_user(member_username VARCHAR(32) REFERENCES member(username) ON UPDATE CASCADE, conversation_id UUID REFERENCES conversation(id));

CREATE TABLE favorite (member_username VARCHAR(32) REFERENCES member(username) ON UPDATE CASCADE, product_id UUID REFERENCES product(id), UNIQUE (member_username, product_id));
