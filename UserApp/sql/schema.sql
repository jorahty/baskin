DROP SCHEMA public cascade;
CREATE SCHEMA public;

CREATE TABLE member (username VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(username));

CREATE TABLE category (slug VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(slug));

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_username VARCHAR(32) REFERENCES member(username) ON DELETE CASCADE ON UPDATE CASCADE, category_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE, data jsonb);

CREATE TABLE favorite (member_username VARCHAR(32) REFERENCES member(username) ON UPDATE CASCADE, product_id UUID REFERENCES product(id) ON DELETE CASCADE, UNIQUE (member_username, product_id));

CREATE TABLE chat (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE message (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), chat_id UUID REFERENCES chat(id), data jsonb);

CREATE TABLE chat_member (member_username VARCHAR(32) REFERENCES member(username) ON UPDATE CASCADE, chat_id UUID REFERENCES chat(id), PRIMARY KEY (member_username, chat_id));
