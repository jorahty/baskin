DELETE FROM category;
DELETE FROM attribute;
DELETE FROM product;
DELETE FROM attribute_value;

-- ██ Category definitions: 

-- vehicles
INSERT INTO category (slug, parent_slug, data) VALUES ('vehicles', NULL, '{"name": "Vehicles"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('X0bZdioM6D', 'vehicles', '{ "name": "Condition", "type": "set", "values": ["New", "Used"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('t6guOpyORQ', 'vehicles', '{ "name": "Model year", "type": "number", "min": 1886, "max": 2023 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('UM9PPU64GB', 'vehicles', '{ "name": "Miles driven", "type": "number", "min": 0, "step": 100 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('VuLNBGpP7Z', 'vehicles', '{ "name": "Fuel type", "type": "set", "values": ["Gasoline", "Electric", "Diesel", "Other"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('Iwiw1QLbXP', 'vehicles', '{ "name": "Top speed", "type": "number", "min": 5, "max": 300, "step": 5, "symbol": "mph" }');

-- cars
INSERT INTO category (slug, parent_slug, data) VALUES ('cars', 'vehicles', '{"name": "Cars"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('ni6pEhjovT', 'cars', '{ "name": "Transmission type", "type": "set", "values": ["Automatic", "Manual"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('7O5s6eKwwh', 'cars', '{ "name": "Seats", "type": "number", "min": 1, "max": 10 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('lRriZmW7bx', 'cars', '{ "name": "Interior", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('QxCtZcsWVh', 'cars', '{ "name": "Exterior", "type": "color" }');

-- motorcycles
INSERT INTO category (slug, parent_slug, data) VALUES ('motorcycles', 'vehicles', '{"name": "Motorcycles"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('S8xteMD6V5', 'motorcycles', '{ "name": "Color", "type": "color" }');

-- boats
INSERT INTO category (slug, parent_slug, data) VALUES ('boats', 'vehicles', '{"name": "Boats"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('3GZ3ozPoCS', 'boats', '{ "name": "Length", "type": "number", "min": 1, "max": 300, "symbol": "ft" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('4gDdn60Dbd', 'boats', '{ "name": "Interior", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('iiAoJcJ5RH', 'boats', '{ "name": "Exterior", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('R2BDfhnUXF', 'boats', '{ "name": "Hull material", "type": "set", "values": ["Steel", "Aluminum", "Fiberglass", "Plastic", "Wood"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('767cAm6pTR', 'boats', '{ "name": "Passenger capacity", "type": "number", "min": 1, "max": 100 }');

-- sailboats
INSERT INTO category (slug, parent_slug, data) VALUES ('sailboats', 'boats', '{"name": "Sailboats"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('6B1BUxiIys', 'sailboats', '{ "name": "Sail material", "type": "set", "values": ["Dacron", "Kevlar", "Carbon fiber", "Spectra", "Technora", "Vectran"] }');

-- trucks
INSERT INTO category (slug, parent_slug, data) VALUES ('trucks', 'cars', '{"name": "Trucks"}');

-- property
INSERT INTO category (slug, parent_slug, data) VALUES ('property', NULL, '{"name": "Property"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('dCdFfnYJ3A', 'property', '{ "name": "Bedrooms", "type": "number", "min": 0, "max": 20 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('eCdFfnYJ3A', 'property', '{ "name": "Bathrooms", "type": "number", "min": 0, "max": 20 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('fCdFfnYJ3A', 'property', '{ "name": "Square feet", "type": "number", "min": 10, "max": 10000, "step": 10 }');

-- cabins
INSERT INTO category (slug, parent_slug, data) VALUES ('cabins', 'property', '{"name": "Cabins"}');

-- apartments
INSERT INTO category (slug, parent_slug, data) VALUES ('apartments', 'property', '{"name": "Apartments"}');

-- beachfront
INSERT INTO category (slug, parent_slug, data) VALUES ('beachfront', 'apartments', '{"name": "Beachfront"}');

-- apparel
INSERT INTO category (slug, parent_slug, data) VALUES ('apparel', NULL, '{"name": "Apparel"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('rtCdNsBjQl', 'apparel', '{ "name": "Color", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('vbdvBfzmmC', 'apparel', '{ "name": "Condition", "type": "set", "values": ["New", "Used"] }');

-- tops
INSERT INTO category (slug, parent_slug, data) VALUES ('tops', 'apparel', '{"name": "Tops"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('tWfXcUS2K5', 'tops', '{ "name": "Size", "type": "set", "values": ["XS", "S", "M", "L", "XL"] }');

-- shirts
INSERT INTO category (slug, parent_slug, data) VALUES ('shirts', 'tops', '{"name": "Shirts"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('pKtj6re3E1', 'shirts', '{ "name": "Sleeve type", "type": "set", "values": ["Short sleeve", "Long sleeve", "Sleeveless" ] }');

-- bottoms
INSERT INTO category (slug, parent_slug, data) VALUES ('bottoms', 'apparel', '{"name": "Bottoms"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('Z4i6HkRS9d', 'bottoms', '{ "name": "Waist", "type": "number", "min": 20, "max": 50 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('vlLlpRBs8F', 'bottoms', '{ "name": "Inseam", "type": "number", "min": 20, "max": 40 }');

-- shoes
INSERT INTO category (slug, parent_slug, data) VALUES ('shoes', 'apparel', '{"name": "Shoes"}');
INSERT INTO attribute (id, category_slug, data) VALUES ('lajRCeKAW1', 'shoes', '{ "name": "Size", "type": "number", "min": 4, "max": 15 }');

-- jackets
INSERT INTO category (slug, parent_slug, data) VALUES ('jackets', 'tops', '{"name": "Jackets"}');

-- sweatshirts
INSERT INTO category (slug, parent_slug, data) VALUES ('sweatshirts', 'tops', '{"name": "Sweatshirts"}');

-- jeans
INSERT INTO category (slug, parent_slug, data) VALUES ('jeans', 'bottoms', '{"name": "Jeans"}');

-- shorts
INSERT INTO category (slug, parent_slug, data) VALUES ('shorts', 'bottoms', '{"name": "Shorts"}');

-- socks
INSERT INTO category (slug, parent_slug, data) VALUES ('socks', 'apparel', '{"name": "Socks"}');

-- electronics
INSERT INTO category (slug, parent_slug, data) VALUES ('electronics', NULL, '{"name": "Electronics"}');

-- audio
INSERT INTO category (slug, parent_slug, data) VALUES ('audio', 'electronics', '{"name": "Audio"}');

-- speakers
INSERT INTO category (slug, parent_slug, data) VALUES ('speakers', 'audio', '{"name": "Speakers"}');

-- microphones
INSERT INTO category (slug, parent_slug, data) VALUES ('microphones', 'audio', '{"name": "Microphones"}');

-- cameras
INSERT INTO category (slug, parent_slug, data) VALUES ('cameras', 'electronics', '{"name": "Cameras"}');

-- film
INSERT INTO category (slug, parent_slug, data) VALUES ('film', 'cameras', '{"name": "Film"}');

-- digital
INSERT INTO category (slug, parent_slug, data) VALUES ('digital', 'cameras', '{"name": "Digital"}');

-- computers
INSERT INTO category (slug, parent_slug, data) VALUES ('computers', NULL, '{"name": "Computers"}');

-- laptops
INSERT INTO category (slug, parent_slug, data) VALUES ('laptops', 'computers', '{"name": "Laptops"}');

-- desktops
INSERT INTO category (slug, parent_slug, data) VALUES ('desktops', 'computers', '{"name": "Desktop computers"}');

-- instruments
INSERT INTO category (slug, parent_slug, data) VALUES ('instruments', NULL, '{"name": "Instruments"}');

-- brass
INSERT INTO category (slug, parent_slug, data) VALUES ('brass', 'instruments', '{"name": "Brass"}');

-- trumpets
INSERT INTO category (slug, parent_slug, data) VALUES ('trumpets', 'brass', '{"name": "Trumpets"}');

-- string
INSERT INTO category (slug, parent_slug, data) VALUES ('string', 'instruments', '{"name": "String"}');

-- guitars
INSERT INTO category (slug, parent_slug, data) VALUES ('guitars', 'string', '{"name": "Guitars"}');

-- violins
INSERT INTO category (slug, parent_slug, data) VALUES ('violins', 'string', '{"name": "Violins"}');

-- toys
INSERT INTO category (slug, parent_slug, data) VALUES ('toys', NULL, '{"name": "Toys & Games"}');

-- puzzles
INSERT INTO category (slug, parent_slug, data) VALUES ('puzzles', 'toys', '{"name": "Puzzles"}');

-- sports
INSERT INTO category (slug, parent_slug, data) VALUES ('sports', NULL, '{"name": "Sporting Goods"}');

-- home
INSERT INTO category (slug, parent_slug, data) VALUES ('home', NULL, '{"name": "Home Goods"}');

-- furniture
INSERT INTO category (slug, parent_slug, data) VALUES ('furniture', 'home', '{"name": "Furniture"}');

-- appliances
INSERT INTO category (slug, parent_slug, data) VALUES ('appliances', 'home', '{"name": "Appliances"}');

-- kitchen
INSERT INTO category (slug, parent_slug, data) VALUES ('kitchen', 'home', '{"name": "Kitchen"}');

-- ██ Product definitions:

-- Racing Sailboat
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcn', 'mia_moderator', 'sailboats', '{"name": "Racing Sailboat", "quantity": 1,"price": 75000, "discount": 0, "description": "Fast and sleek, perfect for competitions", "date": "2023-02-11T16:20:15.000Z", "images": ["2fe0f827-a8f6-45e4-b743-84fb1446b8e8","0a900ea2-495d-48a7-85d4-09c141ad0a64"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 't6guOpyORQ', '{ "value": "2017" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'UM9PPU64GB', '{ "value": "40000" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'VuLNBGpP7Z', '{ "value": "Other" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'Iwiw1QLbXP', '{ "value": "80" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '3GZ3ozPoCS', '{ "value": "30" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '4gDdn60Dbd', '{ "value": "#ffffff" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'iiAoJcJ5RH', '{ "value": "#ffffff" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'R2BDfhnUXF', '{ "value": "Aluminum" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '767cAm6pTR', '{ "value": "11" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '6B1BUxiIys', '{ "value": "Dacron" }');

-- Island Yacht
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcm', 'anna_admin', 'boats', '{"name": "Island Yacht", "quantity": 1,"price": 50000, "discount": 0, "description": "Classic beauty, fully restored", "date": "2023-02-10T09:12:47.000Z", "images": ["aceb3da8-b9f0-4d89-a168-d2e0de11f721","30db552d-2234-4f53-9ae6-9617a24975d9"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'X0bZdioM6D', '{ "value": "Used" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 't6guOpyORQ', '{ "value": "2014" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'UM9PPU64GB', '{ "value": "60000" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'Iwiw1QLbXP', '{ "value": "40" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', '3GZ3ozPoCS', '{ "value": "200" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', '4gDdn60Dbd', '{ "value": "#ffffff" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'iiAoJcJ5RH', '{ "value": "#ffffff" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'R2BDfhnUXF', '{ "value": "Steel" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcm', '767cAm6pTR', '{ "value": "50" }');

-- Harley Davidson
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcq', 'mia_moderator', 'motorcycles', '{"name": "Harley Davidson", "quantity": 1,"price": 20000, "discount": 0, "description": "Vintage model, in great condition", "date": "2023-02-14T10:23:16.000Z", "images": ["0425bf9c-c603-4bbf-86bb-d2a2444b7292","401fe716-44b8-4016-803e-8d0918854d50"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 't6guOpyORQ', '{ "value": "2019" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'Iwiw1QLbXP', '{ "value": "125" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'S8xteMD6V5', '{ "value": "#110000" }');

-- Pickup Truck
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcp', 'anna_admin', 'trucks', '{"name": "Pickup Truck", "quantity": 1,"price": 35000, "discount": 0, "description": "Heavy-duty, perfect for hauling", "date": "2023-02-13T22:48:02.000Z", "images": ["fbe51a7c-4ad9-42e4-9e44-39a9c45916f1","47cda44d-8cbb-4180-8781-ed77acd682a0"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'X0bZdioM6D', '{ "value": "Used" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 't6guOpyORQ', '{ "value": "2006" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'UM9PPU64GB', '{ "value": "150000" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'Iwiw1QLbXP', '{ "value": "95" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'ni6pEhjovT', '{ "value": "Manual" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', '7O5s6eKwwh', '{ "value": "2" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'lRriZmW7bx', '{ "value": "#000080" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'QxCtZcsWVh', '{ "value": "#ffffff" }');

-- Sports Car
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabco', 'molly_member', 'cars', '{"name": "Sports Car", "quantity": 1,"price": 90000, "discount": 0, "description": "Brand new, top of the line model", "date": "2023-02-12T18:59:33.000Z", "images": ["ba445183-0dc9-4de7-93e5-60b226cf8add","2cf19783-8d06-42d7-880c-7e48650ddddc"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 't6guOpyORQ', '{ "value": "2020" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'VuLNBGpP7Z', '{ "value": "Electric" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'Iwiw1QLbXP', '{ "value": "216" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'ni6pEhjovT', '{ "value": "Automatic" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', '7O5s6eKwwh', '{ "value": "5" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'lRriZmW7bx', '{ "value": "#000000" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'QxCtZcsWVh', '{ "value": "#ff00ff" }');

-- Electric Skateboard
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcl', 'molly_member', 'vehicles', '{"name": "Electric Skateboard", "quantity": 2,"price": 480, "discount": 0, "description": "20-mile range, battery and remote included", "date": "2023-02-09T06:43:08.000Z", "images": ["a8b1f98d-62cc-46fb-aa54-be72129adaee","d4ff6acd-4c14-4a50-b0b1-6402fa4a8aea"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 't6guOpyORQ', '{ "value": "2023" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'VuLNBGpP7Z', '{ "value": "Electric" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'Iwiw1QLbXP', '{ "value": "25" }');

-- Winter Boots
INSERT INTO product (id, member_username, category_slug, data) VALUES ('hUsowTyhs6', 'mia_moderator', 'shoes', '{"name": "Winter Boots", "quantity": 1, "price": 90, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-20T19:03:42.000Z", "images": ["7e16fafb-18d9-4928-9cd0-31a9c6e42549","e2fd6e80-63b8-41e0-9321-858fd8e2caa7"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('hUsowTyhs6', 'lajRCeKAW1', '{ "value": "14" }');

-- Classic Sneakers
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc4', 'mia_moderator', 'shoes', '{"name": "Classic Sneakers", "quantity": 1, "price": 80, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-20T19:03:42.000Z", "images": ["0f9399f4-76d5-43f9-81e4-d40e195b0e1e","c53b3a6c-5188-4827-97d0-f938d2ffdb38","44dba03b-26b7-4a48-a6ca-fae666b6f576","d4131af4-f40d-4ab4-a7ed-f214ca0d8592"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('X0bZdiabc4', 'lajRCeKAW1', '{ "value": "6" }');

-- Air Low
INSERT INTO product (id, member_username, category_slug, data) VALUES ('eUsowTyhs6', 'mia_moderator', 'shoes', '{"name": "Air Low", "quantity": 1, "price": 25, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-20T19:03:42.000Z", "images": ["d8f39e38-3346-44bf-a0e0-2fcb3891c9be","3ff349c5-cbed-4c95-bb4e-59736f4d5137"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('eUsowTyhs6', 'lajRCeKAW1', '{ "value": "8" }');

-- Hiking Boots
INSERT INTO product (id, member_username, category_slug, data) VALUES ('gUsowTyhs6', 'mia_moderator', 'shoes', '{"name": "Hiking Boots", "quantity": 1, "price": 65, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-20T19:03:42.000Z", "images": ["c28c131f-ae2b-445c-b6e3-5db614ae5ba3","005db097-da7e-400a-900f-e47308979a8b"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('gUsowTyhs6', 'lajRCeKAW1', '{ "value": "12" }');

-- Excellent Shoe
INSERT INTO product (id, member_username, category_slug, data) VALUES ('fUsowTyhs6', 'mia_moderator', 'shoes', '{"name": "Excellent shoe", "quantity": 1, "price": 60, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-20T19:03:42.000Z", "images": ["6a9d495b-1b3d-4dfe-91f9-356063ed0c2c","e831eb05-41af-40cc-846d-ac23f888208a"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('fUsowTyhs6', 'lajRCeKAW1', '{ "value": "10" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabca', 'molly_member', 'apparel', '{"name": "Air Jordan 42", "quantity": 1,"price": 250, "discount": 0, "description": "Never worn. Ut porta, lectus nec sodales semper, leo est dictum massa, non.", "date": "2023-02-09T06:43:08.000Z", "images": ["c8d79347-04b0-4b14-9012-77daa697bc1f","773ecc98-048a-4530-a70f-c48fa58eb9e7"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcb', 'molly_member', 'toys', '{"name": "Honda Civic Toy Car", "quantity": 1,"price": 25, "discount": 0, "description": "Great toy car for kids, barely used. Ut porta, lectus ultricies.", "date": "2023-01-21T15:43:08.000Z", "images": ["3b0664c7-8af6-4747-9775-b92ac9ab395f"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcc', 'molly_member', 'toys', '{"name": "Baseballs", "quantity": 40,"price": 2, "discount": 0.20, "description": "Used baseball, need to get rid off them. Ut porta, lectus.", "date": "2022-01-21T15:43:08.000Z", "images": ["27397fe4-f681-4f8c-960d-97eaaa7f33d6"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcd', 'molly_member', 'instruments', '{"name": "Guitar", "quantity": 1,"price": 100, "discount": 0,  "description": "Old guitar, was used by grandpa, looking for a new owner. Needs strings, sed aliquam eros venenatis ultricies.", "date": "2022-12-05T09:43:08.000Z", "images": ["2c286dc5-0479-44fa-adce-327495b3ca47"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabce', 'mia_moderator', 'furniture', '{"name": "Fake Apples", "quantity": 100,"price": 0.50, "discount": 0, "description": "Fake apples, first come first serve. Ut porta venenatis ultricies.", "date": "2023-02-09T07:43:08.000Z", "images": ["7f34a30c-a963-440a-8659-afe68ae4ae7b"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcf', 'mia_moderator', 'apparel', '{"name": "Vintage Disney Hoodie", "quantity": 1,"price": 75, "discount": 0.15, "description": "Vintage Disney Hoodie from 1980s. Ut porta venenatis ultricies.", "date": "2023-01-21T21:43:08.000Z", "images": ["583f3a92-5837-4a07-aa5f-e2bf98f40c92"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcg', 'mia_moderator', 'electronics', '{"name": "Samsung TV", "quantity": 1,"price": 400, "discount": 0, "description": "Brand new tv, still in the box. Ut porta, lectus nec", "date": "2022-07-28T01:00:08.000Z", "images": ["c8faf8e2-c855-4eba-816e-b1c20fb14754"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabch', 'anna_admin', 'furniture', '{"name": "Painting of Sailboat", "quantity": 1,"price": 30, "discount": 0, "description": "Old painting of a sailboat from the 1960s. Ut eros venenatis ultricies.", "date": "2021-05-19T21:43:08.000Z", "images": ["336b3b2d-1cd0-4650-ae8b-ba7a96976853"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabci', 'anna_admin', 'apparel', '{"name": "Resistol Cowboy Hat", "quantity": 1,"price": 550.75, "discount": 0, "description": "Never worn Resistol cowboy hat, comes in box, size felis, sed aliquam eros venenatis ultricies.", "date": "2020-07-19T11:43:08.000Z", "images": ["bd4e0f00-5494-4d27-ba4f-2b27baaf19a7"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcj', 'anna_admin', 'electronics', '{"name": "Canon EOS R6", "quantity": 1,"price": 1000, "discount": 0, "description": "Used but no damage, has about 20,000 shutter count aliquam eros venenatis ultricies.", "date": "2022-01-19T02:43:08.000Z", "images": ["84bb26c6-1172-4fff-bc34-80cdd697b8f4"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabck', 'anna_admin', 'sports', '{"name": "Surfboard", "quantity": 4,"price": 400, "discount": 0, "description": "Brand new custom made surf boards, different size. Ut porta venenatis ultricies.", "date": "2022-02-09T00:15:08.000Z", "images": ["6d1dd747-8172-4dd1-88b9-093dde1ba612"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcr', 'molly_member', 'property', '{"name": "Luxury Condo", "quantity": 1,"price": 1500000, "discount": 0, "description": "Spacious, with beautiful views", "date": "2023-02-15T14:36:44.000Z", "images": ["3c38072f-d1e3-4ae0-b9eb-88eb03aecd0e","9d5e6e71-c4a5-4f2e-ba7f-981a9467cdfc"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcs', 'molly_member', 'cabins', '{"name": "Cozy Cabin", "quantity": 2, "price": 400, "discount": 0, "description": "Rustic cabin in the woods, perfect for a weekend getaway", "date": "2023-02-12T08:22:16.000Z", "images": ["4e5bfc5a-f01e-473d-8937-b28de31b6e68","e3ec5e47-321e-4ac0-b91f-6d49f19ccf4d"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabct', 'molly_member', 'apartments', '{"name": "Modern Studio Apartment", "quantity": 1, "price": 800, "discount": 0, "description": "Newly renovated studio apartment in the city", "date": "2023-02-14T12:10:45.000Z", "images": ["0c421b08-f2c1-4103-b83d-6fbbb5173713","5c84c746-0ad4-434b-9660-36b3c1adcc64"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcu', 'anna_admin', 'beachfront', '{"name": "Beachfront Villa", "quantity": 1, "price": 2000, "discount": 0, "description": "Luxurious beachfront villa with private access to the beach", "date": "2023-01-18T19:01:37.000Z", "images": ["39070ccf-9b97-4aad-a41d-9561cfde67a1","bc64e5b5-35fc-43c3-8133-1f374b42f19a"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcv', 'mia_moderator', 'apparel', '{"name": "MLB Baseball Hat", "quantity": 1, "price": 250, "discount": 0, "description": "Never worn, soft fabric", "date": "2023-02-09T06:43:08.000Z", "images": ["276047c0-b5bb-43f5-8e71-d545dbebd0a0","139a6716-68c1-47d6-b308-8313f968aae0"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcw', 'molly_member', 'tops', '{"name": "Mens Robe", "quantity": 4, "price": 100, "discount": 0, "description": "Elegant and comfortable blouse for any occasion", "date": "2023-01-26T09:54:22.000Z", "images": ["afac48ee-1976-4190-b062-035dc475a212","e4232605-0471-44ea-bd47-7efb035cca24"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcy', 'mia_moderator', 'jackets', '{"name": "Leather Jacket", "quantity": 1, "price": 500, "discount": 0, "description": "Stylish and comfortable leather jacket for any season", "date": "2023-02-10T13:28:39.000Z", "images": ["88cba487-8df6-4da2-9467-5f94431f7581","f6b888fa-4ea4-437f-b293-ab221c7b1da7"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcz', 'molly_member', 'sweatshirts', '{"name": "Casual Sweatshirt", "quantity": 2, "price": 120, "discount": 0, "description": "Warm and stylish", "date": "2023-02-12T09:45:21.000Z", "images": ["0cd6420d-8156-4660-a048-21e9faddfad1","008183ab-af0b-4f54-8be2-985f92c9cbe3"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc1', 'molly_member', 'bottoms', '{"name": "Chino Pants", "quantity": 4, "price": 50, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-15T14:22:17.000Z", "images": ["16ff22c8-b525-4401-b0cd-69c8ca24b7f6","562b0615-3345-46f2-ba32-ef0357ca4ce0"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc2', 'molly_member', 'jeans', '{"name": "Slim Fit Jeans", "quantity": 3, "price": 70, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-17T10:17:33.000Z", "images": ["97247a71-cee5-4f10-9fd9-e4880872e0ad","8e4c8923-8d3f-463c-bbf1-c15ee45eca42"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc3', 'molly_member', 'shorts', '{"name": "Cargo Shorts", "quantity": 2, "price": 40, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-19T08:56:11.000Z", "images": ["b1f8761d-42c0-45b1-8e32-fccf4e6ed76e","196fed79-4b37-4247-af14-82348a1c1ca5"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc5', 'molly_member', 'socks', '{"name": "Ankle Socks", "quantity": 5, "price": 10, "discount": 0, "description": "Comfortable and stylish", "date": "2022-02-22T15:11:39.000Z", "images": ["d241fd44-afbe-4cfb-9b76-eea9818c4420","ad5a1c9f-60e4-4ea8-a91b-fb73437f1e96"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc6', 'molly_member', 'electronics', '{"name": "Wireless Headphones", "quantity": 1, "price": 120, "discount": 0, "description": "High-quality sound and comfortable fit", "date": "2022-02-24T12:08:12.000Z", "images": ["a0ab4f24-e0dd-4513-999f-64c5a19efceb","9b66b0ed-542e-4051-8035-fc97628300e1"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc7', 'mia_moderator', 'audio', '{"name": "Wireless Earbuds", "quantity": 2,"price": 120, "discount": 0, "description": "High-quality wireless earbuds with noise-cancelling technology", "date": "2023-01-28T09:15:42.000Z", "images": ["a85c8ab1-75e3-4074-b8db-99c1ec734e9a","7f08f47a-0766-4ee2-a198-b4e6e9755256"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc8', 'molly_member', 'speakers', '{"name": "Wireless Bluetooth Speaker", "quantity": 3, "price": 80, "discount": 0, "description": "Powerful and portable wireless speaker with clear sound", "date": "2023-02-18T08:12:53.000Z", "images": ["31a55f0c-176c-4a0a-b500-5b6bdc97bebd","fdb0389e-b66c-47c6-b37c-dd89ba32e405"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc9', 'anna_admin', 'microphones', '{"name": "Condenser Microphone", "quantity": 1, "price": 200, "discount": 0, "description": "High-quality condenser microphone with crystal-clear sound", "date": "2022-02-23T11:35:21.000Z", "images": ["af66b32e-c049-4442-8663-ec396fa4f01c","380e5588-b0a8-4a7b-899e-9834e5e5405a"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123a', 'mia_moderator', 'cameras', '{"name": "Mirrorless Camera", "quantity": 1, "price": 1000, "discount": 0, "description": "Professional-grade mirrorless camera with advanced features", "date": "2023-02-17T14:49:12.000Z", "images": ["b1e0acd7-0736-4751-a4d2-c1f54d6941c5","3eed0bf5-9a7d-4dc7-a85d-b9fc95f63a8b"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123b', 'molly_member', 'film', '{"name": "Color Film Pack", "quantity": 2, "price": 15, "discount": 0, "description": "Pack of 5 rolls of high-quality color film for photography enthusiasts", "date": "2022-02-22T09:27:04.000Z", "images": ["03bb42a4-7127-4303-b6ac-a9d9b46c6d8f","10482388-f353-4635-9799-7b3ab8bd660c"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123c', 'anna_admin', 'digital', '{"name": "External Hard Drive", "quantity": 1, "price": 150, "discount": 0, "description": "High-capacity external hard drive for secure data storage", "date": "2023-02-12T17:54:39.000Z", "images": ["4601e217-0109-4722-9030-460b01d2a849","ec42762a-9c3b-4ed4-9ebd-2903a7f2d714"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123d', 'mia_moderator', 'computers', '{"name": "Gaming Laptop", "quantity": 1, "price": 2000, "discount": 0, "description": "Powerful gaming laptop with high-end specs", "date": "2022-02-19T12:01:18.000Z", "images": ["9540f773-a794-42b4-9f9a-746970a77ed0","ff294e9d-9fcd-41a3-981f-cbdedd764790"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123e', 'molly_member', 'laptops', '{"name": "Ultrabook Laptop", "quantity": 1, "price": 1200, "discount": 0, "description": "Slim and lightweight ultrabook laptop with long battery life", "date": "2023-02-14T09:16:27.000Z", "images": ["3fcb3aa0-03ea-4337-bac0-0b00340f08d3"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123f', 'anna_admin', 'desktops', '{"name": "Gaming Desktop Computer", "quantity": 2, "price": 1500, "discount": 0, "description": "Powerful gaming desktop computer with high-end graphics card and CPU", "date": "2023-02-10T15:48:22.000Z", "images": ["de1f592f-25d3-4a8e-8672-90f8911f59e9","fe6cab2a-a3d8-4d49-8a2b-39c9956e9c2a"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123g', 'mia_moderator', 'instruments', '{"name": "Electric Keyboard", "quantity": 1, "price": 800, "discount": 0, "description": "Professional-grade electric keyboard with weighted keys and multiple sound options", "date": "2023-02-10T16:12:01.000Z", "images": ["ccd503ba-5dbe-4633-87ff-1b6af86a1e65","aed1b47e-1e02-48ac-a2b5-bfee44b4afab"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123h', 'molly_member', 'brass', '{"name": "Trumpet", "quantity": 1, "price": 1200, "discount": 0, "description": "High-quality brass trumpet with silver finish", "date": "2023-02-11T09:17:45.000Z", "images": ["79d8ea7a-4df6-4485-aab1-ee0ffb13586c","7a556c48-1b9a-4680-91ba-e9cb1ba28946"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123i', 'anna_admin', 'trumpets', '{"name": "Professional Trumpet", "quantity": 1, "price": 1800, "discount": 0, "description": "Professional-grade trumpet with gold finish and custom mouthpiece", "date": "2023-02-11T10:03:19.000Z", "images": ["ec90482e-3841-4bbe-8d8b-fcbbaaaff093","0a2f8ae3-fa7a-4eb4-afc9-cde5cb4b4cd8"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123j', 'mia_moderator', 'string', '{"name": "Acoustic Guitar", "quantity": 1, "price": 1000, "discount": 0, "description": "High-quality acoustic guitar with spruce top and mahogany back and sides", "date": "2023-02-11T11:24:37.000Z", "images": ["e03778ba-23e9-4150-b6e0-e39bc098c20d","19d1cda7-f3ce-415c-b9cf-858722f7d95e"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123k', 'molly_member', 'guitars', '{"name": "Electric Guitar", "quantity": 1, "price": 1500, "discount": 0, "description": "Professional-grade electric guitar with maple neck and mahogany body", "date": "2023-02-11T13:09:10.000Z", "images": ["d6b5b84d-1220-48ee-9f5c-1914cb535f88","0f06c8ae-e03e-413b-9d57-894685cd9f62"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123l', 'anna_admin', 'violins', '{"name": "Violin", "quantity": 1, "price": 900, "discount": 0, "description": "High-quality violin with ebony fittings and fine tuners", "date": "2023-02-11T14:45:53.000Z", "images": ["e105635c-45e0-42a4-af2c-cca14191e4ff","e77cb0ce-e874-43ac-8f8d-f5009cfc4763"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123m', 'molly_member', 'toys', '{"name": "Lego Classic Creative Bricks", "quantity": 2, "price": 35, "discount": 0, "description": "A set of 1500 pieces to build anything you can imagine", "date": "2023-02-10T21:11:25.000Z", "images": ["ca87aa9f-ffc8-4986-a239-735ebb19bb02","5e251116-1918-415e-a301-b87871f80f04"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123n', 'anna_admin', 'puzzles', '{"name": "1000-Piece Puzzle", "quantity": 1, "price": 20, "discount": 0, "description": "Beautiful puzzle with a vibrant forest scene", "date": "2023-02-11T06:23:48.000Z", "images": ["62cecf4a-512e-4794-8bd9-38d952db7938","da6ca5c8-e38c-401d-b09d-f20522d41e8a"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123o', 'mia_moderator', 'sports', '{"name": "Basketball", "quantity": 1, "price": 25, "discount": 0, "description": "Official size and weight basketball for indoor or outdoor play", "date": "2023-02-11T14:02:13.000Z", "images": ["c1044663-80c2-4aa0-8259-91257e8e9a35","f129ab2f-8445-4bc9-9316-9bc53301b134"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123p', 'molly_member', 'home', '{"name": "Cotton Sheet Set", "quantity": 1, "price": 50, "discount": 0, "description": "100% cotton, queen size sheet set with a 400 thread count", "date": "2023-02-12T09:47:01.000Z", "images": ["adea7631-d08b-4357-a2ff-5f024cdafb81","b34d7076-eca5-41d8-855c-781221eb1148"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123q', 'anna_admin', 'furniture', '{"name": "Mid-Century Modern Sofa", "quantity": 1, "price": 600, "discount": 0, "description": "A comfortable and stylish sofa for any living room", "date": "2023-02-12T19:55:39.000Z", "images": ["86bc7ca8-f79d-40ae-9536-56724a5a069e","d1bbb70c-fbb8-4bc4-824b-3a0b0b77aae2"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123r', 'mia_moderator', 'appliances', '{"name": "KitchenAid Stand Mixer", "quantity": 1, "price": 300, "discount": 0, "description": "A powerful and versatile kitchen appliance for baking and cooking", "date": "2023-02-13T06:34:58.000Z", "images": ["ca58a498-86a3-47df-a848-96d40c0bb9e9"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123s', 'molly_member', 'kitchen', '{"name": "Stainless Steel Cookware Set", "quantity": 1, "price": 200, "discount": 0, "description": "A set of pots and pans made with durable and easy-to-clean stainless steel", "date": "2023-02-13T17:22:58.000Z", "images": ["5179b8c7-a327-4fc5-84b2-5804465c2cf7","ac6feefc-dc56-44c8-92c0-a3f906c6a5bd"]}');

-- SHIRTS BEGIN

INSERT INTO product (id, member_username, category_slug, data) VALUES ('A0bZdiabcl', 'molly_member',  'shirts', '{"name": "Sunny Days Halter Top",     "quantity": 1, "price": 35, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-03-13", "images": ["564471a0-1728-4770-9a42-57fb445746a2"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('A0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#ccd12d" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('A0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('A0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('A0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('B0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Cosmic Tie-Dye Tee",        "quantity": 1, "price": 20, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-02-27", "images": ["9f9e61c2-bef3-4919-aef2-dc04a34d7d57"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('B0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#0b0c10" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('B0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('B0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('B0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('C0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Rustic Romance Shirt",      "quantity": 1, "price": 15, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-02-13", "images": ["a72a37ee-2eb7-4a77-95bc-229c10b2067c"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('C0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#dc3261" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('C0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('C0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('C0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('D0bZdiabcl', 'molly_member',  'shirts', '{"name": "Ocean Breeze Tee",          "quantity": 1, "price": 25, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-01-30", "images": ["a7a1ccc1-a051-4b86-94f6-b0f946b3b58f"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('D0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#1f4d8b" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('D0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('D0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('D0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('E0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Sunset Stripe Shirt",       "quantity": 1, "price": 190, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-01-16", "images": ["2ca0a526-0ab2-44dc-abaf-f86866ce7cb5"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('E0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#565ca8" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('E0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('E0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('E0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('F0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Coastal Cruiser Top",       "quantity": 1, "price": 75, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-01-02", "images": ["25cbaf2f-f15d-4592-8506-ceb465166b36"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('F0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#7ac2b6" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('F0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('F0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('F0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('G0bZdiabcl', 'molly_member',  'shirts', '{"name": "Desert Oasis",         "quantity": 1, "price": 40, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-12-19", "images": ["d14233b4-fd56-43cb-829d-50eb475925e5"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('G0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#2e3586" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('G0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('G0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('G0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('H0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Mountain View Shirt",       "quantity": 1, "price": 235, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-12-05", "images": ["5dabd148-b63b-460e-ad15-ea83e79b8176"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('H0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#004aa9" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('H0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('H0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('H0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('I0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Island Breeze Tank",       "quantity": 1, "price": 155, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-11-21", "images": ["98484af4-df32-4460-a1df-16aa60c1fc12"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('I0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#daa030" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('I0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('I0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('I0bZdiabcl', 'pKtj6re3E1', '{ "value": "Sleeveless" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('J0bZdiabcl', 'molly_member',  'shirts', '{"name": "Rustic Charm Shirt",        "quantity": 1, "price": 265, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-11-07", "images": ["3b66d72a-ab0c-4e5f-bdf6-ebe744747bea"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('J0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#a9cee9" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('J0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('J0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('J0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('K0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Urban Explorer Tee",        "quantity": 1, "price": 130, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-10-24", "images": ["fab6c3fe-f8c8-4339-b85f-ccb3b2cdcafa"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('K0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#01bab5" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('K0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('K0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('K0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('L0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Weekend Getaway Top",       "quantity": 1, "price": 185, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-10-10", "images": ["2b5b8e46-0b33-4c1f-a6a1-4a452aa33b6f"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('L0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#f5e7b6" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('L0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('L0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('L0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('M0bZdiabcl', 'molly_member',  'shirts', '{"name": "Bohemian Dream Shirt",      "quantity": 1, "price": 85, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-09-26", "images": ["f4fcf221-9a3e-494a-a9d9-b01bdcae357e"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('M0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#222c73" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('M0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('M0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('M0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('N0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Seaside Soiree Shirt",      "quantity": 1, "price": 150, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-09-12", "images": ["8357d87d-8123-4fde-b49e-105472090e70"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('N0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#fed045" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('N0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('N0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('N0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('O0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Summer Solstice",      "quantity": 1, "price": 295, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-08-29", "images": ["ee943cb7-97e7-4b59-bd67-a740b1c3d837"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('O0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#fe6110" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('O0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('O0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('O0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('P0bZdiabcl', 'molly_member',  'shirts', '{"name": "Wildflower Meadow Tee",     "quantity": 1, "price": 270, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-08-15", "images": ["2e266e82-d0ef-4b8e-a2da-64d3dd030d7c"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('P0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#623a93" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('P0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('P0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('P0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('Q0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Cityscape Graphic T-Shirt", "quantity": 1, "price": 115, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-08-01", "images": ["e4b8678d-967b-4cfd-8297-1e516ab3ade9"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Q0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#31625f" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Q0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Q0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Q0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('R0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Coastal Cottage Shirt",     "quantity": 1, "price": 225, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-07-18", "images": ["927f9131-aa44-4273-965c-a4dd7ad8919a"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('R0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#a33051" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('R0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('R0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('R0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('S0bZdiabcl', 'molly_member',  'shirts', '{"name": "Zen Garden Top",            "quantity": 1, "price": 165, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-07-04", "images": ["6f73a174-10d4-4b36-a29c-872f38c05ca7"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('S0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#fe6507" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('S0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('S0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('S0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('T0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Festival Vibes Shirt",      "quantity": 1, "price": 60, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-06-20", "images": ["1613fd76-4848-422d-a875-32cb1ebf6200"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('T0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#96001d" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('T0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('T0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('T0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('U0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Surf Shack Tank",            "quantity": 1, "price": 55, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-06-06", "images": ["c5a2a92a-c7db-4a21-b400-c45fa909bf55"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('U0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#03472e" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('U0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('U0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('U0bZdiabcl', 'pKtj6re3E1', '{ "value": "Sleeveless" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('V0bZdiabcl', 'molly_member',  'shirts', '{"name": "Midnight Garden Shirt",     "quantity": 1, "price": 265, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-05-23", "images": ["b3337e35-0a78-43c4-b97a-e999da3b0cc1"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('V0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#f0bfd2" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('V0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('V0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('V0bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('W0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Tropical Getaway Shirt",    "quantity": 1, "price": 250, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-05-09", "images": ["d8999d60-a58c-4787-94b3-2fb7a8a9154c"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('W0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#fcc25e" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('W0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('W0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('W0bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('x0bZdiabcl', 'molly_member',  'shirts', '{"name": "Canyon Adventure Tee",      "quantity": 1, "price": 20, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-04-25", "images": ["a5d6aa6e-aa64-479e-a23d-e9036e0a8936"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('x0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#ff6f05" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('x0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('x0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('x0bZdiabcl', 'pKtj6re3E1', '{ "value": "Sleeveless" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('Y0bZdiabcl', 'anna_admin',    'shirts', '{"name": "Palm Springs Top",          "quantity": 1, "price": 100, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-04-11", "images": ["754c06c8-674d-4206-a129-671b7ad68253"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Y0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#b04468" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Y0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Y0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Y0bZdiabcl', 'pKtj6re3E1', '{ "value": "Sleeveless" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('Z0bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Wanderlust Tank",           "quantity": 1, "price": 10, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-03-28", "images": ["43afb3a9-3a91-4568-ba10-2a3c88d7d47a"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Z0bZdiabcl', 'rtCdNsBjQl', '{ "value": "#03449e" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Z0bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Z0bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('Z0bZdiabcl', 'pKtj6re3E1', '{ "value": "Sleeveless" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('00bZdiabcl', 'molly_member',  'shirts', '{"name": "Sunflower Fields Tunic",    "quantity": 1, "price": 215, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-03-14", "images": ["e88cfada-e4ff-4836-b16e-71e6ee03ce37"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('00bZdiabcl', 'rtCdNsBjQl', '{ "value": "#601f27" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('00bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('00bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('00bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('10bZdiabcl', 'anna_admin',    'shirts', '{"name": "Retro Surf Shirt",          "quantity": 1, "price": 110, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-02-28", "images": ["779cbe32-dc28-4b2a-a7dd-2a508ae33fc6"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('10bZdiabcl', 'rtCdNsBjQl', '{ "value": "#263451" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('10bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('10bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('10bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('20bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Golden Hour Tee",           "quantity": 1, "price": 275, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-02-14", "images": ["f5ae9113-17da-4af4-bcdc-011856bcab0a"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('20bZdiabcl', 'rtCdNsBjQl', '{ "value": "#f5c139" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('20bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('20bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('20bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('30bZdiabcl', 'molly_member',  'shirts', '{"name": "Beachcomber Shirt",         "quantity": 1, "price": 45, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-01-31", "images": ["0bb33afe-a810-4b48-a37a-4537c16712c1"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('30bZdiabcl', 'rtCdNsBjQl', '{ "value": "#654e96" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('30bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('30bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('30bZdiabcl', 'pKtj6re3E1', '{ "value": "Sleeveless" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('40bZdiabcl', 'anna_admin',    'shirts', '{"name": "City Lights T-Shirt",       "quantity": 1, "price": 80, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-01-17", "images": ["bbb7839d-ceb9-4f09-b07c-f4233b28f441"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('40bZdiabcl', 'rtCdNsBjQl', '{ "value": "#432f76" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('40bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('40bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('40bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('50bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Canyon Vista Top",          "quantity": 1, "price": 145, "discount": 0, "description": "Classic shirt for a casual look", "date": "2021-01-03", "images": ["17d6b315-d9ed-434e-b197-1eb84618e556"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('50bZdiabcl', 'rtCdNsBjQl', '{ "value": "#dfdee3" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('50bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('50bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('50bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('60bZdiabcl', 'molly_member',  'shirts', '{"name": "Vintage Florals Shirt",     "quantity": 1, "price": 120, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-02-06", "images": ["7e219eb5-5cd4-4828-8468-098595abbdd6"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('60bZdiabcl', 'rtCdNsBjQl', '{ "value": "#0b4b33" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('60bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('60bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('60bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('70bZdiabcl', 'anna_admin',    'shirts', '{"name": "Oceanfront Tee",            "quantity": 1, "price": 195, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-03-06", "images": ["fdf78b5c-0508-488d-ad60-0a574507edde"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('70bZdiabcl', 'rtCdNsBjQl', '{ "value": "#f7f5f6" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('70bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('70bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('70bZdiabcl', 'pKtj6re3E1', '{ "value": "Short sleeve" }');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('80bZdiabcl', 'mia_moderator', 'shirts', '{"name": "Boho Chic Shirt",           "quantity": 1, "price": 190, "discount": 0, "description": "Classic shirt for a casual look", "date": "2022-01-09", "images": ["586c8403-7424-4c0a-8180-e7a052878fc0"]}');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('80bZdiabcl', 'rtCdNsBjQl', '{ "value": "#2f3728" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('80bZdiabcl', 'vbdvBfzmmC', '{ "value": "New" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('80bZdiabcl', 'tWfXcUS2K5', '{ "value": "M" }');
INSERT INTO attribute_value   (product_id, attribute_id, data) VALUES ('80bZdiabcl', 'pKtj6re3E1', '{ "value": "Long sleeve" }');

-- SHIRTS END
