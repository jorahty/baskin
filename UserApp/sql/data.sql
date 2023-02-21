-- member
INSERT INTO member (username, data) VALUES ('molly_member', '{"name":"Molly Member","roles":["member"],"email":"molly@books.com","password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y", "avatar":"https://robohash.org/molly_member"}');
INSERT INTO member (username, data) VALUES ('anna_admin', '{"name":"Anna Admin","roles":["member","moderator","admin"],"email":"anna@books.com","password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze","avatar":"https://robohash.org/anna_admin"}');
INSERT INTO member (username, data) VALUES ('nobby_nobody', '{"name":"Nobby Nobody","roles":[],"email":"nobby@books.com","password":"$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm","avatar":"https://robohash.org/nobby_nobby"}');
INSERT INTO member (username, data) VALUES ('mia_moderator', '{"name":"Mia Moderator","roles":["member","moderator"],"email":"mia@books.com","password":"$2a$10$WlW22iG6lADY6EBgHAmhLumx1VadJXuGWIEwgAH/A07EvHBqZtDcO","avatar":"https://robohash.org/mia_moderator"}');
INSERT INTO member (username, data) VALUES ('jchavez7', '{"name":"Jose Chavez","roles":["member","moderator"],"email":"jchave72@ucsc.edu","password":"$2a$06$QiyS5xVTxy4QjzWxKnLA5.vp2jVYzx2tdn40QDB7CTFC1hWljym2K","avatar":"https://robohash.org/jchavez"}');

-- category
INSERT INTO category (slug, data) VALUES ('electronics', '{"name": "Electronics"}');
INSERT INTO category (slug, data) VALUES ('clothing', '{"name": "Clothing"}');
INSERT INTO category (slug, data) VALUES ('sports-equipment', '{"name": "Sports Equipment"}');
INSERT INTO category (slug, data) VALUES ('toys', '{"name": "Toys"}');
INSERT INTO category (slug, data) VALUES ('furniture', '{"name": "Furniture"}');
INSERT INTO category (slug, data) VALUES ('instruments', '{"name": "Instruments"}');
INSERT INTO category (slug, data) VALUES ('office', '{"name": "Office"}');
INSERT INTO category (slug, data) VALUES ('free', '{"name": "Free"}');

-- product
INSERT INTO product (id, member_username, category_slug, data) VALUES ('038b7e70-a5c0-47e6-80f3-5b1772bb4a0d', 'molly_member', 'clothing', '{"name": "Air Jordan 11", "quantity": 1,"price": 250, "discount": 0, "description": "Never worn. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-02-09T06:43:08.000Z", "pictures": ["https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('5c55a266-a631-4598-9bd5-52bd5ee2d9aa', 'molly_member', 'toys', '{"name": "Honda Civic Toy Car", "quantity": 1,"price": 25, "discount": 0, "description": "Great toy car for kids, barely used. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-01-21T15:43:08.000Z", "pictures": ["https://images.pexels.com/photos/772393/pexels-photo-772393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('2759559e-84f2-4c41-9512-932589163f4f', 'molly_member', 'toys', '{"name": "Baseballs", "quantity": 40,"price": 2, "discount": 0.20, "description": "Used baseball, need to get rid off them. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-01-21T15:43:08.000Z", "pictures": ["https://images.pexels.com/photos/11901415/pexels-photo-11901415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('46fd42cf-e976-48a0-9ac2-d97a96e885eb', 'molly_member', 'instruments', '{"name": "Guitar", "quantity": 1,"price": 100, "discount": 0,  "description": "Old guitar, was used by grandpa, looking for a new owner. Needs strings replaced. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-12-05T09:43:08.000Z", "pictures": ["https://images.pexels.com/photos/2156327/pexels-photo-2156327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('83901659-30c8-4b44-abe3-ee110fda259e', 'mia_moderator', 'furniture', '{"name": "Fake Apples", "quantity": 100,"price": 0.50, "discount": 0, "description": "Fake apples, first come first serve. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-02-09T07:43:08.000Z", "pictures": ["https://images.pexels.com/photos/326005/pexels-photo-326005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('72c33826-a3c3-4d1f-8e9a-3e7887d05832', 'mia_moderator', 'clothing', '{"name": "Vintage Disney Hoodie", "quantity": 1,"price": 75, "discount": 0.15, "description": "Vintage Disney Hoodie from 1980s. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-01-21T21:43:08.000Z", "pictures": ["https://images.pexels.com/photos/9594679/pexels-photo-9594679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('ba70f276-85c2-4227-91cd-430d5ef36b09', 'mia_moderator', 'electronics', '{"name": "Samsung TV", "quantity": 1,"price": 400, "discount": 0, "description": "Brand new tv, still in the box. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-07-28T01:00:08.000Z", "pictures": ["https://images.pexels.com/photos/6020432/pexels-photo-6020432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('035f4c91-b755-4c4e-994f-1c5338960b7b', 'anna_admin', 'furniture', '{"name": "Painting of Sailboat", "quantity": 1,"price": 30, "discount": 0, "description": "Old painting of a sailboat from the 1960s. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2021-05-19T21:43:08.000Z", "pictures": ["https://images.pexels.com/photos/7036452/pexels-photo-7036452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('4951a289-d778-43e8-acfc-75b3b6a31ae9', 'anna_admin', 'clothing', '{"name": "Resistol Cowboy Hat", "quantity": 1,"price": 550.75, "discount": 0, "description": "Never worn Resistol cowboy hat, comes in box, size medium. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2020-07-19T11:43:08.000Z", "pictures": ["https://images.pexels.com/photos/8625715/pexels-photo-8625715.jpeg?auto=compress&cs=tinysrgb&w=1600"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('19b2a9dc-b085-41d1-970a-69a2b1cbd8e1', 'anna_admin', 'electronics', '{"name": "Canon EOS R6", "quantity": 1,"price": 1000, "discount": 0, "description": "Used but no damage, has about 20,000 shutter count. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-01-19T02:43:08.000Z", "pictures": ["https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('0ce2da04-d05d-46cf-8602-ae58ab7ec215', 'anna_admin', 'sports-equipment', '{"name": "Surfboard", "quantity": 4,"price": 400, "discount": 0, "description": "Brand new custom made surf boards, different size. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-02-09T00:15:08.000Z", "pictures": ["https://images.pexels.com/photos/930398/pexels-photo-930398.jpeg?auto=compress&cs=tinysrgb&w=1600"]}');

-- favorite
INSERT INTO favorite (member_username, product_id) VALUES ('molly_member', '72c33826-a3c3-4d1f-8e9a-3e7887d05832');
INSERT INTO favorite (member_username, product_id) VALUES ('molly_member', '035f4c91-b755-4c4e-994f-1c5338960b7b');
INSERT INTO favorite (member_username, product_id) VALUES ('anna_admin', '038b7e70-a5c0-47e6-80f3-5b1772bb4a0d');
INSERT INTO favorite (member_username, product_id) VALUES ('anna_admin', '5c55a266-a631-4598-9bd5-52bd5ee2d9aa');

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
INSERT INTO message (chat_id, data) VALUES ('3f37a49c-7d13-4764-9568-8c5e13050b68', '{"sender": "mia_moderator", "date": "2023-01-21T15:30:08.000Z", "content": "Deal"}');
