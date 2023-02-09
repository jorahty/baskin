-- Users
INSERT INTO member (id, email, data) VALUES ('af956320-a052-11ed-a8fc-0242ac120001', 'molly@books.com', '{"name":"Molly Member","roles":["member"],"password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y"}');
INSERT INTO member (id, email, data) VALUES ('af956320-a052-11ed-a8fc-0242ac120002', 'anna@books.com', '{"name":"Anna Admin","roles":["member","moderator","admin"],"password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze"}');
INSERT INTO member (id, email, data) VALUES ('af956320-a052-11ed-a8fc-0242ac120003', 'nobby@books.com', '{"name":"Nobby Nobody","roles":[],"password":"$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm"}');
INSERT INTO member (id, email, data) VALUES ('af956320-a052-11ed-a8fc-0242ac120004', 'mia@books.com', '{"name":"Mia Moderator","roles":["member","moderator"],"password":"$2a$10$WlW22iG6lADY6EBgHAmhLumx1VadJXuGWIEwgAH/A07EvHBqZtDcO"}');

-- Catergories
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140001', '{"name": "Electronics"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140002', '{"name": "Clothing"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140003', '{"name": "Sports Equipment"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140004', '{"name": "Toys"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140005', '{"name": "Furniture"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140006', '{"name": "Instruments"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140007', '{"name": "Office"}');
INSERT INTO category (id, data) VALUES ('af956320-a052-11ed-a8fc-0242ac140008', '{"name": "Free"}');

-- Products
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130000', 'af956320-a052-11ed-a8fc-0242ac120001', 'af956320-a052-11ed-a8fc-0242ac140002', '{"title": "Air Jordan 11", "quantity": 1,"price": 250, "description": "Never worn", "date": "2023-02-09T06:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130001', 'af956320-a052-11ed-a8fc-0242ac120001', 'af956320-a052-11ed-a8fc-0242ac140004', '{"title": "Honda Civic Toy Car", "quantity": 1,"price": 25, "description": "Great toy car for kids, barely used", "date": "2023-01-21T15:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130002', 'af956320-a052-11ed-a8fc-0242ac120001', 'af956320-a052-11ed-a8fc-0242ac140003', '{"title": "Baseballs", "quantity": 40,"price": 2, "description": "Used baseball, need to get rid off them", "date": "2022-01-21T15:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130003', 'af956320-a052-11ed-a8fc-0242ac120001', 'af956320-a052-11ed-a8fc-0242ac140006', '{"title": "Guitar", "quantity": 1,"price": 100, "description": "Old guitar, was used by grandpa, looking for a new owner. Needs strings replaced", "date": "2022-12-05T09:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130004', 'af956320-a052-11ed-a8fc-0242ac120001', 'af956320-a052-11ed-a8fc-0242ac140005', '{"title": "Fake Apples", "quantity": 100,"price": 0.50, "description": "Fake apples, first come first serve", "date": "2023-02-09T07:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130005', 'af956320-a052-11ed-a8fc-0242ac120002', 'af956320-a052-11ed-a8fc-0242ac140002', '{"title": "Vintage Disney Hoodie", "quantity": 1,"price": 75, "description": "Vintage Disney Hoodie from 1980s", "date": "2023-01-39T21:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130006', 'af956320-a052-11ed-a8fc-0242ac120002', 'af956320-a052-11ed-a8fc-0242ac140001', '{"title": "Samsung TV", "quantity": 1,"price": 400, "description": "Brand new tv, still in the box", "date": "2022-07-39T01:00:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130007', 'af956320-a052-11ed-a8fc-0242ac120002', 'af956320-a052-11ed-a8fc-0242ac140002', '{"title": "Painting of Sailboat", "quantity": 1,"price": 30, "description": "Old painting of a sailboat from the 1960s", "date": "2021-05-39T21:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130008', 'af956320-a052-11ed-a8fc-0242ac120002', 'af956320-a052-11ed-a8fc-0242ac140002', '{"title": "Resistol Cowboy Hat", "quantity": 1,"price": 550.75, "description": "Never worn Resistol cowboy hat, comes in box, size medium", "date": "2020-07-39T11:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130009', 'af956320-a052-11ed-a8fc-0242ac120002', 'af956320-a052-11ed-a8fc-0242ac140001', '{"title": "Canon EOS R6", "quantity": 1,"price": 1000, "description": "Used but no damage, has about 20,000 shutter count", "date": "2022-01-39T02:43:08.000Z"}');
INSERT INTO product (id, mid, cid, data) VALUES ('af956320-a052-11ed-a8fc-0242ac130010', 'af956320-a052-11ed-a8fc-0242ac120002', 'af956320-a052-11ed-a8fc-0242ac140003', '{"title": "Surfboard", "quantity": 4,"price": 400, "description": "Brand new custom made surf boards, different size", "date": "2022-02-09T00:15:08.000Z"}');
