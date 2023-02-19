DELETE FROM account;

INSERT INTO account(data) VALUES (jsonb_build_object('username','molly', 'email','molly@books.com', 'name','Molly Member',  'pwhash',crypt('mollymember','87'),  'role','member'));
INSERT INTO account(data) VALUES (jsonb_build_object('username','anna',  'email','anna@books.com',  'name','Anna Admin',    'pwhash',crypt('annaadmin','87'),    'role','admin'));
INSERT INTO account(data) VALUES (jsonb_build_object('username','mia',   'email','mia@books.com',   'name','Mia Moderator', 'pwhash',crypt('miamoderator','87'), 'role','moderator'));
