-- Your schema DDL (create table statements) goes here 
drop schema public cascade;
create schema public;

CREATE TABLE member (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(255), data jsonb);