-- Put Molly and Anna into a chat together ("direct message")
INSERT INTO chat (id, data) VALUES ('f94a1252-7d5e-4b87-ae41-7a03f58a4028', '{"name": null}');

INSERT INTO chat_member(member_username,chat_id) VALUES('molly_member', 'f94a1252-7d5e-4b87-ae41-7a03f58a4028');
INSERT INTO chat_member(member_username,chat_id) VALUES('anna_admin', 'f94a1252-7d5e-4b87-ae41-7a03f58a4028');

INSERT INTO message (chat_id, data) VALUES ('f94a1252-7d5e-4b87-ae41-7a03f58a4028', '{"sender": "molly_member", "date": "2023-01-21T15:20:08.000Z", "content": "Hey Anna, this is Molly"}');
INSERT INTO message (chat_id, data) VALUES ('f94a1252-7d5e-4b87-ae41-7a03f58a4028', '{"sender": "anna_admin", "date": "2023-01-21T15:21:08.000Z", "content": "Hi Molly!"}');

-- Put Molly, Anna, and Mia into a "group" chat together
INSERT INTO chat (id, data) VALUES ('52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4', '{"name": "Hiking"}');

INSERT INTO chat_member(member_username, chat_id) VALUES('molly_member', '52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4');
INSERT INTO chat_member(member_username, chat_id) VALUES('anna_admin', '52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4');
INSERT INTO chat_member(member_username, chat_id) VALUES('mia_moderator', '52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4');

INSERT INTO message (chat_id, data) VALUES ('52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4', '{"sender": "mia_moderator", "date": "2023-01-21T15:24:08.000Z", "content": "Meet at the base of the Redwood Grove tomorrow at dawn"}');
INSERT INTO message (chat_id, data) VALUES ('52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4', '{"sender": "anna_admin", "date": "2023-01-21T15:25:08.000Z", "content": "The thermos is with me"}');
INSERT INTO message (chat_id, data) VALUES ('52d3f9fd-1c08-41cc-973e-2d2c0d75f4b4', '{"sender": "molly_member", "date": "2023-01-21T15:26:08.000Z", "content": "Hope we cross paths with the coyotes again"}');

-- Put Molly, Anna, and Mia into an unnamed group chat together
INSERT INTO chat (id, data) VALUES ('28a7f960-c779-4b27-b487-fa55264d79d3', '{"name": null}');

INSERT INTO chat_member(member_username, chat_id) VALUES('molly_member', '28a7f960-c779-4b27-b487-fa55264d79d3');
INSERT INTO chat_member(member_username, chat_id) VALUES('anna_admin', '28a7f960-c779-4b27-b487-fa55264d79d3');
INSERT INTO chat_member(member_username, chat_id) VALUES('mia_moderator', '28a7f960-c779-4b27-b487-fa55264d79d3');

INSERT INTO message (chat_id, data) VALUES ('28a7f960-c779-4b27-b487-fa55264d79d3', '{"sender": "mia_moderator", "date": "2023-01-21T15:14:08.000Z", "content": "Hi"}');
INSERT INTO message (chat_id, data) VALUES ('28a7f960-c779-4b27-b487-fa55264d79d3', '{"sender": "anna_admin", "date": "2023-01-21T15:15:08.000Z", "content": "Hey"}');
INSERT INTO message (chat_id, data) VALUES ('28a7f960-c779-4b27-b487-fa55264d79d3', '{"sender": "molly_member", "date": "2023-01-21T15:16:08.000Z", "content": "Hello"}');

-- Put Molly and Mia into a chat about "Samsung TV"
INSERT INTO chat (id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"name": "Samsung TV"}');

INSERT INTO chat_member(member_username,chat_id) VALUES('molly_member', '3f37a49c-7d13-4764-9568-8c5e13050b68');
INSERT INTO chat_member(member_username,chat_id) VALUES('mia_moderator', '3f37a49c-7d13-4764-9568-8c5e13050b68');

INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "molly_member", "date": "2023-01-21T15:30:08.000Z", "content": "Hi, is this available?"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "Yes!"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "molly_member", "date": "2023-01-21T15:30:08.000Z", "content": "How much?"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "molly_member", "date": "2023-01-21T15:30:08.000Z", "content": "I cannot pay more than $300"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "This is a one-of-a-kind Samsung TV, worth at least $500"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "molly_member", "date": "2023-01-21T15:30:08.000Z", "content": "How about $350?"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "My Brother in Christ, are you serious???"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "I just told you that this TV is one-of-a-kind >:("}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "The lowest I will go is $450"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "molly_member", "date": "2023-01-21T15:30:08.000Z", "content": "How about $400?? I really need this TV"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "Look, I have a buddy, his name is Raj"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "Raj is willing to pay $450, any lower would not be worth it for me"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "molly_member", "date": "2023-01-21T15:30:08.000Z", "content": "Hmmmm... okay you have a deal at $450"}');
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "That is great!"}');
