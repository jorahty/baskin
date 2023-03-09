-- ██ category ██

DELETE FROM category;

INSERT INTO category (slug, parent_slug, data) VALUES ('vehicles', NULL, '{"name": "Vehicles"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('boats', 'vehicles', '{"name": "Boats"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('sailboats', 'boats', '{"name": "Sailboats"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('cars', 'vehicles', '{"name": "Cars"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('trucks', 'cars', '{"name": "Trucks"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('motorcycles', 'vehicles', '{"name": "Motorcycles"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('property', NULL, '{"name": "Property"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('cabins', 'property', '{"name": "Cabins"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('apartments', 'property', '{"name": "Apartments"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('beachfront', 'apartments', '{"name": "Beachfront"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('apparel', NULL, '{"name": "Apparel"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('tops', 'apparel', '{"name": "Tops"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('shirts', 'tops', '{"name": "Shirts"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('jackets', 'tops', '{"name": "Jackets"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('sweatshirts', 'tops', '{"name": "Sweatshirts"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('bottoms', 'apparel', '{"name": "Bottoms"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('jeans', 'bottoms', '{"name": "Jeans"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('shorts', 'bottoms', '{"name": "Shorts"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('shoes', 'apparel', '{"name": "Shoes"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('socks', 'apparel', '{"name": "Socks"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('electronics', NULL, '{"name": "Electronics"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('audio', 'electronics', '{"name": "Audio"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('speakers', 'audio', '{"name": "Speakers"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('microphones', 'audio', '{"name": "Microphones"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('cameras', 'electronics', '{"name": "Cameras"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('film', 'cameras', '{"name": "Film"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('digital', 'cameras', '{"name": "Digital"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('computers', NULL, '{"name": "Computers"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('laptops', 'computers', '{"name": "Laptops"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('desktops', 'computers', '{"name": "Desktop computers"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('instruments', NULL, '{"name": "Instruments"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('brass', 'instruments', '{"name": "Brass"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('trumpets', 'brass', '{"name": "Trumpets"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('string', 'instruments', '{"name": "String"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('guitars', 'string', '{"name": "Guitars"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('violins', 'string', '{"name": "Violins"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('toys', NULL, '{"name": "Toys & Games"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('puzzles', 'toys', '{"name": "Puzzles"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('sports', NULL, '{"name": "Sporting Goods"}');

INSERT INTO category (slug, parent_slug, data) VALUES ('home', NULL, '{"name": "Home Goods"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('furniture', 'home', '{"name": "Furniture"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('appliances', 'home', '{"name": "Appliances"}');
INSERT INTO category (slug, parent_slug, data) VALUES ('kitchen', 'home', '{"name": "Kitchen"}');

-- ██ product ██

DELETE FROM product;

INSERT INTO product (id, member_username, category_slug, data) VALUES ('038b7e70-a5c0-47e6-80f3-5b1772bb4a0d', 'molly_member', 'apparel', '{"name": "Air Jordan 15", "quantity": 1,"price": 250, "discount": 0, "description": "Never worn. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-02-09T06:43:08.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('5c55a266-a631-4598-9bd5-52bd5ee2d9aa', 'molly_member', 'toys', '{"name": "Honda Civic Toy Car", "quantity": 1,"price": 25, "discount": 0, "description": "Great toy car for kids, barely used. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-01-21T15:43:08.000Z", "images": ["3b0664c7-8af6-4747-9775-b92ac9ab395f"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('2759559e-84f2-4c41-9512-932589163f4f', 'molly_member', 'toys', '{"name": "Baseballs", "quantity": 40,"price": 2, "discount": 0.20, "description": "Used baseball, need to get rid off them. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-01-21T15:43:08.000Z", "images": ["27397fe4-f681-4f8c-960d-97eaaa7f33d6"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('46fd42cf-e976-48a0-9ac2-d97a96e885eb', 'molly_member', 'instruments', '{"name": "Guitar", "quantity": 1,"price": 100, "discount": 0,  "description": "Old guitar, was used by grandpa, looking for a new owner. Needs strings replaced. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-12-05T09:43:08.000Z", "images": ["2c286dc5-0479-44fa-adce-327495b3ca47"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('83901659-30c8-4b44-abe3-ee110fda259e', 'mia_moderator', 'furniture', '{"name": "Fake Apples", "quantity": 100,"price": 0.50, "discount": 0, "description": "Fake apples, first come first serve. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-02-09T07:43:08.000Z", "images": ["7f34a30c-a963-440a-8659-afe68ae4ae7b"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('72c33826-a3c3-4d1f-8e9a-3e7887d05832', 'mia_moderator', 'apparel', '{"name": "Vintage Disney Hoodie", "quantity": 1,"price": 75, "discount": 0.15, "description": "Vintage Disney Hoodie from 1980s. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-01-21T21:43:08.000Z", "images": ["583f3a92-5837-4a07-aa5f-e2bf98f40c92"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('ba70f276-85c2-4227-91cd-430d5ef36b09', 'mia_moderator', 'electronics', '{"name": "Samsung TV", "quantity": 1,"price": 400, "discount": 0, "description": "Brand new tv, still in the box. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-07-28T01:00:08.000Z", "images": ["c8faf8e2-c855-4eba-816e-b1c20fb14754"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('035f4c91-b755-4c4e-994f-1c5338960b7b', 'anna_admin', 'furniture', '{"name": "Painting of Sailboat", "quantity": 1,"price": 30, "discount": 0, "description": "Old painting of a sailboat from the 1960s. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2021-05-19T21:43:08.000Z", "images": ["336b3b2d-1cd0-4650-ae8b-ba7a96976853"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('4951a289-d778-43e8-acfc-75b3b6a31ae9', 'anna_admin', 'apparel', '{"name": "Resistol Cowboy Hat", "quantity": 1,"price": 550.75, "discount": 0, "description": "Never worn Resistol cowboy hat, comes in box, size medium. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2020-07-19T11:43:08.000Z", "images": ["bd4e0f00-5494-4d27-ba4f-2b27baaf19a7"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('19b2a9dc-b085-41d1-970a-69a2b1cbd8e1', 'anna_admin', 'electronics', '{"name": "Canon EOS R6", "quantity": 1,"price": 1000, "discount": 0, "description": "Used but no damage, has about 20,000 shutter count. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-01-19T02:43:08.000Z", "images": ["84bb26c6-1172-4fff-bc34-80cdd697b8f4"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('0ce2da04-d05d-46cf-8602-ae58ab7ec215', 'anna_admin', 'sports', '{"name": "Surfboard", "quantity": 4,"price": 400, "discount": 0, "description": "Brand new custom made surf boards, different size. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-02-09T00:15:08.000Z", "images": ["6d1dd747-8172-4dd1-88b9-093dde1ba612"]}');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('6f1de6c7-f6dc-4c80-a4a1-07d9247cb22e', 'molly_member', 'vehicles', '{"name": "Electric Skateboard", "quantity": 2,"price": 480, "discount": 0, "description": "20-mile range, battery and remote included", "date": "2023-02-09T06:43:08.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'anna_admin', 'boats', '{"name": "Island Yacht", "quantity": 1,"price": 50000, "discount": 0, "description": "Classic beauty, fully restored", "date": "2023-02-10T09:12:47.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'mia_moderator', 'sailboats', '{"name": "Racing Sailboat", "quantity": 1,"price": 75000, "discount": 0, "description": "Fast and sleek, perfect for competitions", "date": "2023-02-11T16:20:15.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'molly_member', 'cars', '{"name": "Sports Car", "quantity": 1,"price": 90000, "discount": 0, "description": "Brand new, top of the line model", "date": "2023-02-12T18:59:33.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'anna_admin', 'trucks', '{"name": "Pickup Truck", "quantity": 1,"price": 35000, "discount": 0, "description": "Heavy-duty, perfect for hauling", "date": "2023-02-13T22:48:02.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 'mia_moderator', 'motorcycles', '{"name": "Harley Davidson", "quantity": 1,"price": 20000, "discount": 0, "description": "Vintage model, in great condition", "date": "2023-02-14T10:23:16.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('b5a1c785-fd9e-4482-bf77-5d5b51a5b91e', 'molly_member', 'property', '{"name": "Luxury Condo", "quantity": 1,"price": 1500000, "discount": 0, "description": "Spacious, with beautiful views", "date": "2023-02-15T14:36:44.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('82c61a7f-8ab3-48f9-bcf9-3de86cb361d8', 'molly_member', 'cabins', '{"name": "Cozy Cabin", "quantity": 2, "price": 400, "discount": 0, "description": "Rustic cabin in the woods, perfect for a weekend getaway", "date": "2023-02-12T08:22:16.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('1a06a497-92ee-41cb-a246-854c0369afcb', 'molly_member', 'apartments', '{"name": "Modern Studio Apartment", "quantity": 1, "price": 800, "discount": 0, "description": "Newly renovated studio apartment in the city", "date": "2023-02-14T12:10:45.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('7760204d-364c-4235-8236-2f6e6978b54e', 'anna_admin', 'beachfront', '{"name": "Beachfront Villa", "quantity": 1, "price": 2000, "discount": 0, "description": "Luxurious beachfront villa with private access to the beach", "date": "2023-02-18T19:01:37.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('9c0cf70d-8a17-41c3-97d6-7d1b68a1b2e9', 'mia_moderator', 'apparel', '{"name": "Vintage Hoodie Sweatshirt", "quantity": 1, "price": 250, "discount": 0, "description": "Never worn, soft fabric", "date": "2023-02-09T06:43:08.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('5c14412d-5e63-4f05-853f-b52de9151cf8', 'molly_member', 'tops', '{"name": "Sleeveless Blouse", "quantity": 4, "price": 100, "discount": 0, "description": "Elegant and comfortable blouse for any occasion", "date": "2023-02-26T09:54:22.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('d9ca208f-8695-4426-8e6e-860fae0e1b9c', 'anna_admin', 'shirts', '{"name": "Denim Shirt", "quantity": 3, "price": 80, "discount": 0, "description": "Classic denim shirt for a casual look", "date": "2023-02-15T17:39:05.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('c2f7aa97-0e1c-4721-a857-8a7e0b450c9f', 'mia_moderator', 'jackets', '{"name": "Leather Jacket", "quantity": 1, "price": 500, "discount": 0, "description": "Stylish and comfortable leather jacket for any season", "date": "2023-02-10T13:28:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('5c5d0023-bb5c-4563-9770-8a87a04789cf', 'molly_member', 'sweatshirts', '{"name": "Leather Jacket", "quantity": 2, "price": 120, "discount": 0, "description": "Warm and stylish", "date": "2023-02-12T09:45:21.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('7b636227-ee7d-46eb-97c7-94d5f47a49c8', 'molly_member', 'bottoms', '{"name": "Chino Pants", "quantity": 4, "price": 50, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-15T14:22:17.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('9c9a82d3-b13b-49b5-b717-5c5b256d5ba7', 'molly_member', 'jeans', '{"name": "Slim Fit Jeans", "quantity": 3, "price": 70, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-17T10:17:33.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('507a9b2f-df10-4b1d-880f-ff76ce6b4d6e', 'molly_member', 'shorts', '{"name": "Cargo Shorts", "quantity": 2, "price": 40, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-19T08:56:11.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('82c6fe3f-342e-4bdc-a409-c431857f82e6', 'molly_member', 'shoes', '{"name": "Sneakers", "quantity": 1, "price": 80, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-20T19:03:42.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('6f58c8e9-c6b9-4c91-91a7-d188a77a0bca', 'molly_member', 'socks', '{"name": "Ankle Socks", "quantity": 5, "price": 10, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-22T15:11:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('f6fb33db-2e0f-4f74-a4e6-7d6c61b6e788', 'molly_member', 'electronics', '{"name": "Wireless Headphones", "quantity": 1, "price": 120, "discount": 0, "description": "High-quality sound and comfortable fit", "date": "2023-02-24T12:08:12.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('77e0a15c-0194-4b3e-9943-0b72de8e7605', 'mia_moderator', 'audio', '{"name": "Wireless Earbuds", "quantity": 2,"price": 120, "discount": 0, "description": "High-quality wireless earbuds with noise-cancelling technology", "date": "2023-02-28T09:15:42.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('3d30bb20-d524-44fc-9409-9c2c93d1407c', 'molly_member', 'speakers', '{"name": "Wireless Bluetooth Speaker", "quantity": 3, "price": 80, "discount": 0, "description": "Powerful and portable wireless speaker with clear sound", "date": "2023-02-18T08:12:53.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('97fa7c34-5d11-4850-bc21-c49604c00a85', 'anna_admin', 'microphones', '{"name": "Condenser Microphone", "quantity": 1, "price": 200, "discount": 0, "description": "High-quality condenser microphone with crystal-clear sound", "date": "2023-02-23T11:35:21.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('d8c890b5-34c5-4a3e-8d3b-cc36c65ccfd5', 'mia_moderator', 'cameras', '{"name": "Mirrorless Camera", "quantity": 1, "price": 1000, "discount": 0, "description": "Professional-grade mirrorless camera with advanced features", "date": "2023-02-17T14:49:12.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('834efdb6-6044-4b44-8fcb-560710936f37', 'molly_member', 'film', '{"name": "Color Film Pack", "quantity": 2, "price": 15, "discount": 0, "description": "Pack of 5 rolls of high-quality color film for photography enthusiasts", "date": "2023-02-22T09:27:04.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('e8fa8d54-641a-4d7b-9422-91474d713c62', 'anna_admin', 'digital', '{"name": "External Hard Drive", "quantity": 1, "price": 150, "discount": 0, "description": "High-capacity external hard drive for secure data storage", "date": "2023-02-12T17:54:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('dff59ac0-4d80-4b96-85c4-14f3a118e7fe', 'mia_moderator', 'computers', '{"name": "Gaming Laptop", "quantity": 1, "price": 2000, "discount": 0, "description": "Powerful gaming laptop with high-end specs", "date": "2023-02-19T12:01:18.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('511fea83-9f5f-4606-85ec-3d769da4bf63', 'molly_member', 'laptops', '{"name": "Ultrabook Laptop", "quantity": 1, "price": 1200, "discount": 0, "description": "Slim and lightweight ultrabook laptop with long battery life", "date": "2023-02-14T09:16:27.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('3bc82ef7-1138-4f97-945a-08626a42a648', 'anna_admin', 'desktops', '{"name": "Gaming Desktop Computer", "quantity": 2, "price": 1500, "discount": 0, "description": "Powerful gaming desktop computer with high-end graphics card and CPU", "date": "2023-02-10T15:48:22.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('a33abc11-264e-4bbb-82e8-b87226bb4383', 'mia_moderator', 'instruments', '{"name": "Electric Keyboard", "quantity": 1, "price": 800, "discount": 0, "description": "Professional-grade electric keyboard with weighted keys and multiple sound options", "date": "2023-02-10T16:12:01.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('2a38839e-3b0d-47f0-9e60-d6b19c0978ad', 'molly_member', 'brass', '{"name": "Trumpet", "quantity": 1, "price": 1200, "discount": 0, "description": "High-quality brass trumpet with silver finish", "date": "2023-02-11T09:17:45.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('74dca5e8-c702-4e70-ad16-0a16a64d55fa', 'anna_admin', 'trumpets', '{"name": "Professional Trumpet", "quantity": 1, "price": 1800, "discount": 0, "description": "Professional-grade trumpet with gold finish and custom mouthpiece", "date": "2023-02-11T10:03:19.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('cd13d088-21cf-4286-ae61-0643d321dd9e', 'mia_moderator', 'string', '{"name": "Acoustic Guitar", "quantity": 1, "price": 1000, "discount": 0, "description": "High-quality acoustic guitar with spruce top and mahogany back and sides", "date": "2023-02-11T11:24:37.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('9aec3d5a-a339-4f24-b5a3-8419ac8542f2', 'molly_member', 'guitars', '{"name": "Electric Guitar", "quantity": 1, "price": 1500, "discount": 0, "description": "Professional-grade electric guitar with maple neck and mahogany body", "date": "2023-02-11T13:09:10.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('c75e6c75-17da-4a36-81b2-bc540da2b191', 'anna_admin', 'violins', '{"name": "Violin", "quantity": 1, "price": 900, "discount": 0, "description": "High-quality violin with ebony fittings and fine tuners", "date": "2023-02-11T14:45:53.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('529cd6bb-3340-4ac6-867e-28c4a3df8165', 'molly_member', 'toys', '{"name": "Lego Classic Creative Bricks", "quantity": 2, "price": 35, "discount": 0, "description": "A set of 1500 pieces to build anything you can imagine", "date": "2023-02-10T21:11:25.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('94901a0c-aa63-4bf2-a424-51e7c87507cd', 'anna_admin', 'puzzles', '{"name": "1000-Piece Puzzle", "quantity": 1, "price": 20, "discount": 0, "description": "Beautiful puzzle with a vibrant forest scene", "date": "2023-02-11T06:23:48.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('1cce66f2-d732-4b7a-bcac-2f3506559d4a', 'mia_moderator', 'sports', '{"name": "Basketball", "quantity": 1, "price": 25, "discount": 0, "description": "Official size and weight basketball for indoor or outdoor play", "date": "2023-02-11T14:02:13.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('68d83917-0365-4d68-9db6-baf58b88fe74', 'molly_member', 'home', '{"name": "Cotton Sheet Set", "quantity": 1, "price": 50, "discount": 0, "description": "100% cotton, queen size sheet set with a 400 thread count", "date": "2023-02-12T09:47:01.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('bdb1d2ea-4c4b-4c3f-b245-0d8d98a6d4d5', 'anna_admin', 'furniture', '{"name": "Mid-Century Modern Sofa", "quantity": 1, "price": 600, "discount": 0, "description": "A comfortable and stylish sofa for any living room", "date": "2023-02-12T19:55:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('4ea6a974-87e0-456f-83dc-ebefecebf59c', 'mia_moderator', 'appliances', '{"name": "KitchenAid Stand Mixer", "quantity": 1, "price": 300, "discount": 0, "description": "A powerful and versatile kitchen appliance for baking and cooking", "date": "2023-02-13T06:34:58.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('e3d53512-2c00-49ee-a0ab-8bc6c6a3e696', 'molly_member', 'kitchen', '{"name": "Stainless Steel Cookware Set", "quantity": 1, "price": 200, "discount": 0, "description": "A set of pots and pans made with durable and easy-to-clean stainless steel", "date": "2023-02-13T17:22:58.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');

-- ██ attribute ██

DELETE FROM attribute;

INSERT INTO attribute (id, category_slug, data) VALUES ('X0bZdioM6D', 'vehicles', '{ "name": "Condition", "type": "set", "values": ["New", "Used"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('t6guOpyORQ', 'vehicles', '{ "name": "Model year", "type": "number", "min": 1886, "max": 2023 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('UM9PPU64GB', 'vehicles', '{ "name": "Miles driven", "type": "number", "min": 0, "step": 100 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('VuLNBGpP7Z', 'vehicles', '{ "name": "Fuel type", "type": "set", "values": ["Gasoline", "Electric", "Diesel", "Other"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('Iwiw1QLbXP', 'vehicles', '{ "name": "Top speed", "type": "number", "min": 5, "max": 300, "step": 5, "symbol": "mph" }');

INSERT INTO attribute (id, category_slug, data) VALUES ('ni6pEhjovT', 'cars', '{ "name": "Transmission type", "type": "set", "values": ["Automatic", "Manual"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('7O5s6eKwwh', 'cars', '{ "name": "Seats", "type": "number", "min": 1, "max": 10 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('lRriZmW7bx', 'cars', '{ "name": "Interior", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('QxCtZcsWVh', 'cars', '{ "name": "Exterior", "type": "color" }');

INSERT INTO attribute (id, category_slug, data) VALUES ('S8xteMD6V5', 'motorcycles', '{ "name": "Color", "type": "color" }');

INSERT INTO attribute (id, category_slug, data) VALUES ('3GZ3ozPoCS', 'boats', '{ "name": "Length", "type": "number", "min": 1, "max": 300, "symbol": "ft" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('4gDdn60Dbd', 'boats', '{ "name": "Interior", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('iiAoJcJ5RH', 'boats', '{ "name": "Exterior", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('R2BDfhnUXF', 'boats', '{ "name": "Hull material", "type": "set", "values": ["Steel", "Aluminum", "Fiberglass", "Plastic", "Wood"] }');
INSERT INTO attribute (id, category_slug, data) VALUES ('767cAm6pTR', 'boats', '{ "name": "Passenger capacity", "type": "number", "min": 1, "max": 100 }');

INSERT INTO attribute (id, category_slug, data) VALUES ('6B1BUxiIys', 'sailboats', '{ "name": "Sail material", "type": "set", "values": ["Dacron", "Kevlar", "Carbon fiber", "Spectra", "Technora", "Vectran"] }');

INSERT INTO attribute (id, category_slug, data) VALUES ('dCdFfnYJ3A', 'property', '{ "name": "Bedrooms", "type": "number", "min": 0, "max": 20 }');
INSERT INTO attribute (category_slug, data) VALUES ('property', '{ "name": "Bathrooms", "type": "number", "min": 0, "max": 20 }');
INSERT INTO attribute (category_slug, data) VALUES ('property', '{ "name": "Square feet", "type": "number", "min": 10, "max": 10000, "step": 10 }');

INSERT INTO attribute (category_slug, data) VALUES ('apparel', '{ "name": "Color", "type": "color" }');
INSERT INTO attribute (category_slug, data) VALUES ('apparel', '{ "name": "Condition", "type": "set", "values": ["New", "Used"] }');

INSERT INTO attribute (category_slug, data) VALUES ('tops', '{ "name": "Size", "type": "set", "values": ["XS", "S", "M", "L", "XL"] }');

INSERT INTO attribute (category_slug, data) VALUES ('shirts', '{ "name": "Sleeve type", "type": "set", "values": ["Short sleeve", "Long sleeve", "Sleeveless" ] }');

INSERT INTO attribute (category_slug, data) VALUES ('bottoms', '{ "name": "Waist", "type": "number", "min": 20, "max": 50 }');
INSERT INTO attribute (category_slug, data) VALUES ('bottoms', '{ "name": "Inseam", "type": "number", "min": 20, "max": 40 }');

INSERT INTO attribute (category_slug, data) VALUES ('shoes', '{ "name": "Size", "type": "number", "min": 4, "max": 15 }');

-- ██ attribute_value ██

DELETE FROM attribute_value;

-- Racing Sailboat
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 't6guOpyORQ', '{ "value": "2017" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'UM9PPU64GB', '{ "value": "40000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'VuLNBGpP7Z', '{ "value": "Other" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'Iwiw1QLbXP', '{ "value": "80" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', '3GZ3ozPoCS', '{ "value": "30" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', '4gDdn60Dbd', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'iiAoJcJ5RH', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', 'R2BDfhnUXF', '{ "value": "Aluminum" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', '767cAm6pTR', '{ "value": "11" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('905ee7b9-3b15-48d3-a03c-7a75f4969822', '6B1BUxiIys', '{ "value": "Dacron" }');

-- Island Yacht
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'X0bZdioM6D', '{ "value": "Used" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 't6guOpyORQ', '{ "value": "2014" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'UM9PPU64GB', '{ "value": "60000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'Iwiw1QLbXP', '{ "value": "40" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', '3GZ3ozPoCS', '{ "value": "200" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', '4gDdn60Dbd', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'iiAoJcJ5RH', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', 'R2BDfhnUXF', '{ "value": "Steel" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('0dc12e27-cc41-4d8a-a2c4-08044cb2a1a8', '767cAm6pTR', '{ "value": "50" }');

-- Harley Davidson
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 't6guOpyORQ', '{ "value": "2019" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 'Iwiw1QLbXP', '{ "value": "125" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6a33d0d7-6e9a-497a-8b52-6e0c6c51004e', 'S8xteMD6V5', '{ "value": "#ff0000" }');

-- Pickup Truck
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'X0bZdioM6D', '{ "value": "Used" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 't6guOpyORQ', '{ "value": "2006" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'UM9PPU64GB', '{ "value": "150000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'Iwiw1QLbXP', '{ "value": "95" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'ni6pEhjovT', '{ "value": "Manual" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', '7O5s6eKwwh', '{ "value": "2" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'lRriZmW7bx', '{ "value": "#000080" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('343f8d01-92b9-4e23-9c4b-8c4d29a470a5', 'QxCtZcsWVh', '{ "value": "#ffffff" }');

-- Sports Car
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 't6guOpyORQ', '{ "value": "2020" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'VuLNBGpP7Z', '{ "value": "Electric" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'Iwiw1QLbXP', '{ "value": "216" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'ni6pEhjovT', '{ "value": "Automatic" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', '7O5s6eKwwh', '{ "value": "5" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'lRriZmW7bx', '{ "value": "#000000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('c8e8c29b-83b3-4cf7-8d1f-65afae0b1911', 'QxCtZcsWVh', '{ "value": "#ff00ff" }');

-- Electric Skateboard
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6f1de6c7-f6dc-4c80-a4a1-07d9247cb22e', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6f1de6c7-f6dc-4c80-a4a1-07d9247cb22e', 't6guOpyORQ', '{ "value": "2023" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6f1de6c7-f6dc-4c80-a4a1-07d9247cb22e', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6f1de6c7-f6dc-4c80-a4a1-07d9247cb22e', 'VuLNBGpP7Z', '{ "value": "Electric" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('6f1de6c7-f6dc-4c80-a4a1-07d9247cb22e', 'Iwiw1QLbXP', '{ "value": "25" }');
