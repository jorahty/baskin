-- Your schema DDL (create table statements) goes here 
drop schema public cascade;
create schema public;

CREATE TABLE member (username VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(username));

CREATE TABLE category (slug VARCHAR(32) PRIMARY KEY NOT NULL, data jsonb, UNIQUE(slug));

CREATE TABLE product (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), member_username VARCHAR(32) REFERENCES member(username) ON DELETE CASCADE, category_slug VARCHAR(32) REFERENCES category(slug) ON DELETE CASCADE, data jsonb);
