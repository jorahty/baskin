DROP SCHEMA public cascade;
CREATE SCHEMA public;

-- CREATE TABLE member (username VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(username));

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_username VARCHAR(32), category_slug VARCHAR(32), data jsonb);

CREATE TABLE favorite (member_username VARCHAR(32), product_id UUID REFERENCES product(id) ON DELETE CASCADE, UNIQUE (member_username, product_id));

CREATE TABLE chat (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE message (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), chat_id UUID REFERENCES chat(id), data jsonb);

CREATE TABLE chat_member (member_username VARCHAR(32), chat_id UUID REFERENCES chat(id), PRIMARY KEY (member_username, chat_id));
