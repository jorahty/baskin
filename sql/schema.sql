-- Your schema DDL (create table statements) goes here 
drop schema public cascade;
create schema public;

CREATE TABLE member (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(255), data jsonb);

CREATE TABLE category (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), data jsonb);

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), mid UUID REFERENCES member(id) ON DELETE CASCADE,  cid UUID REFERENCES category(id) ON DELETE CASCADE, data jsonb);