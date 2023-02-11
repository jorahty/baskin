-- Users
INSERT INTO member (username, data) VALUES ('molly.member', '{"name":"Molly Member","roles":["member"],"email":"molly@books.com","password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y"}');
INSERT INTO member (username, data) VALUES ('anna.admin', '{"name":"Anna Admin","roles":["member","moderator","admin"],"email":"anna@books.com","password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze"}');
INSERT INTO member (username, data) VALUES ('nobby.nobody', '{"name":"Nobby Nobody","roles":[],"email":"nobby@books.com","password":"$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm"}');
INSERT INTO member (username, data) VALUES ('mia.mod', '{"name":"Mia Moderator","roles":["member","moderator"],"email":"mia@books.com","password":"$2a$10$WlW22iG6lADY6EBgHAmhLumx1VadJXuGWIEwgAH/A07EvHBqZtDcO"}');

-- Catergories
INSERT INTO category (slug, data) VALUES ('electronics', '{"name": "Electronics"}');
INSERT INTO category (slug, data) VALUES ('clothing', '{"name": "Clothing"}');
INSERT INTO category (slug, data) VALUES ('sports-equipment', '{"name": "Sports Equipment"}');
INSERT INTO category (slug, data) VALUES ('toys', '{"name": "Toys"}');
INSERT INTO category (slug, data) VALUES ('furniture', '{"name": "Furniture"}');
INSERT INTO category (slug, data) VALUES ('instruments', '{"name": "Instruments"}');
INSERT INTO category (slug, data) VALUES ('office', '{"name": "Office"}');
INSERT INTO category (slug, data) VALUES ('free', '{"name": "Free"}');

-- Products
INSERT INTO product (owner_username, product_category, data) VALUES ('molly.member', 'clothing', '{"title": "Air Jordan 11", "quantity": 1,"price": 250, "description": "Never worn", "date": "2023-02-09T06:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('molly.member', 'toys', '{"title": "Honda Civic Toy Car", "quantity": 1,"price": 25, "description": "Great toy car for kids, barely used", "date": "2023-01-21T15:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('molly.member', 'toys', '{"title": "Baseballs", "quantity": 40,"price": 2, "description": "Used baseball, need to get rid off them", "date": "2022-01-21T15:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('molly.member', 'instruments', '{"title": "Guitar", "quantity": 1,"price": 100, "description": "Old guitar, was used by grandpa, looking for a new owner. Needs strings replaced", "date": "2022-12-05T09:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('mia.mod', 'furniture', '{"title": "Fake Apples", "quantity": 100,"price": 0.50, "description": "Fake apples, first come first serve", "date": "2023-02-09T07:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('mia.mod', 'clothing', '{"title": "Vintage Disney Hoodie", "quantity": 1,"price": 75, "description": "Vintage Disney Hoodie from 1980s", "date": "2023-01-39T21:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('mia.mod', 'electronics', '{"title": "Samsung TV", "quantity": 1,"price": 400, "description": "Brand new tv, still in the box", "date": "2022-07-39T01:00:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('anna.admin', 'furniture', '{"title": "Painting of Sailboat", "quantity": 1,"price": 30, "description": "Old painting of a sailboat from the 1960s", "date": "2021-05-39T21:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('anna.admin', 'clothing', '{"title": "Resistol Cowboy Hat", "quantity": 1,"price": 550.75, "description": "Never worn Resistol cowboy hat, comes in box, size medium", "date": "2020-07-39T11:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('anna.admin', 'electronics', '{"title": "Canon EOS R6", "quantity": 1,"price": 1000, "description": "Used but no damage, has about 20,000 shutter count", "date": "2022-01-39T02:43:08.000Z"}');
INSERT INTO product (owner_username, product_category, data) VALUES ('anna.admin', 'sports-equipment', '{"title": "Surfboard", "quantity": 4,"price": 400, "description": "Brand new custom made surf boards, different size", "date": "2022-02-09T00:15:08.000Z"}');
