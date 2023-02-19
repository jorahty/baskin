DELETE FROM account;

INSERT INTO account(data) VALUES (jsonb_build_object('account', 'molly', 'email','molly@books.com','name','Molly Member','pwhash',crypt('mollymember','87'),'role','member'));
INSERT INTO account(data) VALUES (jsonb_build_object('account', 'anna', 'email','anna@books.com','name','Anna Admin','pwhash',crypt('annaadmin','87'),'role','admin'));
