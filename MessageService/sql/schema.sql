DROP TABLE IF EXISTS chat_member;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS chat;

CREATE TABLE chat (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE message (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), chat_id UUID REFERENCES chat(id), data jsonb);

CREATE TABLE chat_member (member_username VARCHAR(32), chat_id UUID REFERENCES chat(id), PRIMARY KEY (member_username, chat_id));
