DROP SCHEMA public cascade;
CREATE SCHEMA public;

CREATE TABLE chat (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE message (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), chat_id UUID REFERENCES chat(id), data jsonb);

CREATE TABLE chat_member (member_username VARCHAR(32), chat_id UUID REFERENCES chat(id), PRIMARY KEY (member_username, chat_id));
