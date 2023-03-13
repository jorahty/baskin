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

INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabca', 'molly_member', 'apparel', '{"name": "Air Jordan 15", "quantity": 1,"price": 250, "discount": 0, "description": "Never worn. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-02-09T06:43:08.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcb', 'molly_member', 'toys', '{"name": "Honda Civic Toy Car", "quantity": 1,"price": 25, "discount": 0, "description": "Great toy car for kids, barely used. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-01-21T15:43:08.000Z", "images": ["3b0664c7-8af6-4747-9775-b92ac9ab395f"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcc', 'molly_member', 'toys', '{"name": "Baseballs", "quantity": 40,"price": 2, "discount": 0.20, "description": "Used baseball, need to get rid off them. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-01-21T15:43:08.000Z", "images": ["27397fe4-f681-4f8c-960d-97eaaa7f33d6"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcd', 'molly_member', 'instruments', '{"name": "Guitar", "quantity": 1,"price": 100, "discount": 0,  "description": "Old guitar, was used by grandpa, looking for a new owner. Needs strings replaced. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-12-05T09:43:08.000Z", "images": ["2c286dc5-0479-44fa-adce-327495b3ca47"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabce', 'mia_moderator', 'furniture', '{"name": "Fake Apples", "quantity": 100,"price": 0.50, "discount": 0, "description": "Fake apples, first come first serve. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-02-09T07:43:08.000Z", "images": ["7f34a30c-a963-440a-8659-afe68ae4ae7b"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcf', 'mia_moderator', 'apparel', '{"name": "Vintage Disney Hoodie", "quantity": 1,"price": 75, "discount": 0.15, "description": "Vintage Disney Hoodie from 1980s. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2023-01-21T21:43:08.000Z", "images": ["583f3a92-5837-4a07-aa5f-e2bf98f40c92"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcg', 'mia_moderator', 'electronics', '{"name": "Samsung TV", "quantity": 1,"price": 400, "discount": 0, "description": "Brand new tv, still in the box. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-07-28T01:00:08.000Z", "images": ["c8faf8e2-c855-4eba-816e-b1c20fb14754"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabch', 'anna_admin', 'furniture', '{"name": "Painting of Sailboat", "quantity": 1,"price": 30, "discount": 0, "description": "Old painting of a sailboat from the 1960s. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2021-05-19T21:43:08.000Z", "images": ["336b3b2d-1cd0-4650-ae8b-ba7a96976853"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabci', 'anna_admin', 'apparel', '{"name": "Resistol Cowboy Hat", "quantity": 1,"price": 550.75, "discount": 0, "description": "Never worn Resistol cowboy hat, comes in box, size medium. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2020-07-19T11:43:08.000Z", "images": ["bd4e0f00-5494-4d27-ba4f-2b27baaf19a7"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcj', 'anna_admin', 'electronics', '{"name": "Canon EOS R6", "quantity": 1,"price": 1000, "discount": 0, "description": "Used but no damage, has about 20,000 shutter count. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-01-19T02:43:08.000Z", "images": ["84bb26c6-1172-4fff-bc34-80cdd697b8f4"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabck', 'anna_admin', 'sports', '{"name": "Surfboard", "quantity": 4,"price": 400, "discount": 0, "description": "Brand new custom made surf boards, different size. Ut porta, lectus nec sodales semper, leo est dictum massa, non tristique mi mauris id orci. Pellentesque volutpat dapibus ipsum lobortis convallis. Morbi vel mi non ligula euismod feugiat feugiat sit amet enim. Fusce mattis porta ante, non euismod tortor condimentum eget. Pellentesque dapibus orci cursus purus aliquet, et lobortis tellus faucibus. Nullam eu libero eget tortor euismod ullamcorper. Quisque eget nibh eros. Mauris porttitor tincidunt felis, sed aliquam eros venenatis ultricies.", "date": "2022-02-09T00:15:08.000Z", "images": ["6d1dd747-8172-4dd1-88b9-093dde1ba612"]}');

INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcl', 'molly_member', 'vehicles', '{"name": "Electric Skateboard", "quantity": 2,"price": 480, "discount": 0, "description": "20-mile range, battery and remote included", "date": "2023-02-09T06:43:08.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcm', 'anna_admin', 'boats', '{"name": "Island Yacht", "quantity": 1,"price": 50000, "discount": 0, "description": "Classic beauty, fully restored", "date": "2023-02-10T09:12:47.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcn', 'mia_moderator', 'sailboats', '{"name": "Racing Sailboat", "quantity": 1,"price": 75000, "discount": 0, "description": "Fast and sleek, perfect for competitions", "date": "2023-02-11T16:20:15.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabco', 'molly_member', 'cars', '{"name": "Sports Car", "quantity": 1,"price": 90000, "discount": 0, "description": "Brand new, top of the line model", "date": "2023-02-12T18:59:33.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcp', 'anna_admin', 'trucks', '{"name": "Pickup Truck", "quantity": 1,"price": 35000, "discount": 0, "description": "Heavy-duty, perfect for hauling", "date": "2023-02-13T22:48:02.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcq', 'mia_moderator', 'motorcycles', '{"name": "Harley Davidson", "quantity": 1,"price": 20000, "discount": 0, "description": "Vintage model, in great condition", "date": "2023-02-14T10:23:16.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcr', 'molly_member', 'property', '{"name": "Luxury Condo", "quantity": 1,"price": 1500000, "discount": 0, "description": "Spacious, with beautiful views", "date": "2023-02-15T14:36:44.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcs', 'molly_member', 'cabins', '{"name": "Cozy Cabin", "quantity": 2, "price": 400, "discount": 0, "description": "Rustic cabin in the woods, perfect for a weekend getaway", "date": "2023-02-12T08:22:16.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabct', 'molly_member', 'apartments', '{"name": "Modern Studio Apartment", "quantity": 1, "price": 800, "discount": 0, "description": "Newly renovated studio apartment in the city", "date": "2023-02-14T12:10:45.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcu', 'anna_admin', 'beachfront', '{"name": "Beachfront Villa", "quantity": 1, "price": 2000, "discount": 0, "description": "Luxurious beachfront villa with private access to the beach", "date": "2023-02-18T19:01:37.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcv', 'mia_moderator', 'apparel', '{"name": "MLB Baseball Hat", "quantity": 1, "price": 250, "discount": 0, "description": "Never worn, soft fabric", "date": "2023-02-09T06:43:08.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcw', 'molly_member', 'tops', '{"name": "Mens Robe", "quantity": 4, "price": 100, "discount": 0, "description": "Elegant and comfortable blouse for any occasion", "date": "2023-02-26T09:54:22.000Z", "images": ["90b7c548-362f-46bc-bfa0-e785bec66e4d","b3caedc8-1b17-498c-ba6f-af54aa4752ce"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcx', 'anna_admin', 'shirts', '{"name": "Denim Shirt", "quantity": 3, "price": 80, "discount": 0, "description": "Classic denim shirt for a casual look", "date": "2023-02-15T17:39:05.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcy', 'mia_moderator', 'jackets', '{"name": "Leather Jacket", "quantity": 1, "price": 500, "discount": 0, "description": "Stylish and comfortable leather jacket for any season", "date": "2023-02-10T13:28:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabcz', 'molly_member', 'sweatshirts', '{"name": "Leather Jacket", "quantity": 2, "price": 120, "discount": 0, "description": "Warm and stylish", "date": "2023-02-12T09:45:21.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc1', 'molly_member', 'bottoms', '{"name": "Chino Pants", "quantity": 4, "price": 50, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-15T14:22:17.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc2', 'molly_member', 'jeans', '{"name": "Slim Fit Jeans", "quantity": 3, "price": 70, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-17T10:17:33.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc3', 'molly_member', 'shorts', '{"name": "Cargo Shorts", "quantity": 2, "price": 40, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-19T08:56:11.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc4', 'molly_member', 'shoes', '{"name": "Sneakers", "quantity": 1, "price": 80, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-20T19:03:42.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc5', 'molly_member', 'socks', '{"name": "Ankle Socks", "quantity": 5, "price": 10, "discount": 0, "description": "Comfortable and stylish", "date": "2023-02-22T15:11:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc6', 'molly_member', 'electronics', '{"name": "Wireless Headphones", "quantity": 1, "price": 120, "discount": 0, "description": "High-quality sound and comfortable fit", "date": "2023-02-24T12:08:12.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc7', 'mia_moderator', 'audio', '{"name": "Wireless Earbuds", "quantity": 2,"price": 120, "discount": 0, "description": "High-quality wireless earbuds with noise-cancelling technology", "date": "2023-02-28T09:15:42.000Z", "images": ["102253eb-bd10-4735-9057-87d734d0c9b3","1edab22a-f89e-4068-81bc-f475317a0ec3"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc8', 'molly_member', 'speakers', '{"name": "Wireless Bluetooth Speaker", "quantity": 3, "price": 80, "discount": 0, "description": "Powerful and portable wireless speaker with clear sound", "date": "2023-02-18T08:12:53.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdiabc9', 'anna_admin', 'microphones', '{"name": "Condenser Microphone", "quantity": 1, "price": 200, "discount": 0, "description": "High-quality condenser microphone with crystal-clear sound", "date": "2023-02-23T11:35:21.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123a', 'mia_moderator', 'cameras', '{"name": "Mirrorless Camera", "quantity": 1, "price": 1000, "discount": 0, "description": "Professional-grade mirrorless camera with advanced features", "date": "2023-02-17T14:49:12.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123b', 'molly_member', 'film', '{"name": "Color Film Pack", "quantity": 2, "price": 15, "discount": 0, "description": "Pack of 5 rolls of high-quality color film for photography enthusiasts", "date": "2023-02-22T09:27:04.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123c', 'anna_admin', 'digital', '{"name": "External Hard Drive", "quantity": 1, "price": 150, "discount": 0, "description": "High-capacity external hard drive for secure data storage", "date": "2023-02-12T17:54:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123d', 'mia_moderator', 'computers', '{"name": "Gaming Laptop", "quantity": 1, "price": 2000, "discount": 0, "description": "Powerful gaming laptop with high-end specs", "date": "2023-02-19T12:01:18.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123e', 'molly_member', 'laptops', '{"name": "Ultrabook Laptop", "quantity": 1, "price": 1200, "discount": 0, "description": "Slim and lightweight ultrabook laptop with long battery life", "date": "2023-02-14T09:16:27.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123f', 'anna_admin', 'desktops', '{"name": "Gaming Desktop Computer", "quantity": 2, "price": 1500, "discount": 0, "description": "Powerful gaming desktop computer with high-end graphics card and CPU", "date": "2023-02-10T15:48:22.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123g', 'mia_moderator', 'instruments', '{"name": "Electric Keyboard", "quantity": 1, "price": 800, "discount": 0, "description": "Professional-grade electric keyboard with weighted keys and multiple sound options", "date": "2023-02-10T16:12:01.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123h', 'molly_member', 'brass', '{"name": "Trumpet", "quantity": 1, "price": 1200, "discount": 0, "description": "High-quality brass trumpet with silver finish", "date": "2023-02-11T09:17:45.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123i', 'anna_admin', 'trumpets', '{"name": "Professional Trumpet", "quantity": 1, "price": 1800, "discount": 0, "description": "Professional-grade trumpet with gold finish and custom mouthpiece", "date": "2023-02-11T10:03:19.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123j', 'mia_moderator', 'string', '{"name": "Acoustic Guitar", "quantity": 1, "price": 1000, "discount": 0, "description": "High-quality acoustic guitar with spruce top and mahogany back and sides", "date": "2023-02-11T11:24:37.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123k', 'molly_member', 'guitars', '{"name": "Electric Guitar", "quantity": 1, "price": 1500, "discount": 0, "description": "Professional-grade electric guitar with maple neck and mahogany body", "date": "2023-02-11T13:09:10.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123l', 'anna_admin', 'violins', '{"name": "Violin", "quantity": 1, "price": 900, "discount": 0, "description": "High-quality violin with ebony fittings and fine tuners", "date": "2023-02-11T14:45:53.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123m', 'molly_member', 'toys', '{"name": "Lego Classic Creative Bricks", "quantity": 2, "price": 35, "discount": 0, "description": "A set of 1500 pieces to build anything you can imagine", "date": "2023-02-10T21:11:25.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123n', 'anna_admin', 'puzzles', '{"name": "1000-Piece Puzzle", "quantity": 1, "price": 20, "discount": 0, "description": "Beautiful puzzle with a vibrant forest scene", "date": "2023-02-11T06:23:48.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123o', 'mia_moderator', 'sports', '{"name": "Basketball", "quantity": 1, "price": 25, "discount": 0, "description": "Official size and weight basketball for indoor or outdoor play", "date": "2023-02-11T14:02:13.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123p', 'molly_member', 'home', '{"name": "Cotton Sheet Set", "quantity": 1, "price": 50, "discount": 0, "description": "100% cotton, queen size sheet set with a 400 thread count", "date": "2023-02-12T09:47:01.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123q', 'anna_admin', 'furniture', '{"name": "Mid-Century Modern Sofa", "quantity": 1, "price": 600, "discount": 0, "description": "A comfortable and stylish sofa for any living room", "date": "2023-02-12T19:55:39.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123r', 'mia_moderator', 'appliances', '{"name": "KitchenAid Stand Mixer", "quantity": 1, "price": 300, "discount": 0, "description": "A powerful and versatile kitchen appliance for baking and cooking", "date": "2023-02-13T06:34:58.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');
INSERT INTO product (id, member_username, category_slug, data) VALUES ('X0bZdi123s', 'molly_member', 'kitchen', '{"name": "Stainless Steel Cookware Set", "quantity": 1, "price": 200, "discount": 0, "description": "A set of pots and pans made with durable and easy-to-clean stainless steel", "date": "2023-02-13T17:22:58.000Z", "images": ["acc44792-f0f3-4970-8dda-d20c0423c305"]}');

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

INSERT INTO attribute (id, category_slug, data) VALUES ('rtCdNsBjQl', 'apparel', '{ "name": "Color", "type": "color" }');
INSERT INTO attribute (id, category_slug, data) VALUES ('vbdvBfzmmC', 'apparel', '{ "name": "Condition", "type": "set", "values": ["New", "Used"] }');

INSERT INTO attribute (id, category_slug, data) VALUES ('tWfXcUS2K5', 'tops', '{ "name": "Size", "type": "set", "values": ["XS", "S", "M", "L", "XL"] }');

INSERT INTO attribute (id, category_slug, data) VALUES ('pKtj6re3E1', 'shirts', '{ "name": "Sleeve type", "type": "set", "values": ["Short sleeve", "Long sleeve", "Sleeveless" ] }');

INSERT INTO attribute (id, category_slug, data) VALUES ('Z4i6HkRS9d', 'bottoms', '{ "name": "Waist", "type": "number", "min": 20, "max": 50 }');
INSERT INTO attribute (id, category_slug, data) VALUES ('vlLlpRBs8F', 'bottoms', '{ "name": "Inseam", "type": "number", "min": 20, "max": 40 }');

INSERT INTO attribute (id, category_slug, data) VALUES ('lajRCeKAW1', 'shoes', '{ "name": "Size", "type": "number", "min": 4, "max": 15 }');

-- ██ attribute_value ██

DELETE FROM attribute_value;

-- Racing Sailboat
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 't6guOpyORQ', '{ "value": "2017" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'UM9PPU64GB', '{ "value": "40000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'VuLNBGpP7Z', '{ "value": "Other" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'Iwiw1QLbXP', '{ "value": "80" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '3GZ3ozPoCS', '{ "value": "30" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '4gDdn60Dbd', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'iiAoJcJ5RH', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', 'R2BDfhnUXF', '{ "value": "Aluminum" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '767cAm6pTR', '{ "value": "11" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcn', '6B1BUxiIys', '{ "value": "Dacron" }');

-- Island Yacht
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'X0bZdioM6D', '{ "value": "Used" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 't6guOpyORQ', '{ "value": "2014" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'UM9PPU64GB', '{ "value": "60000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'Iwiw1QLbXP', '{ "value": "40" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', '3GZ3ozPoCS', '{ "value": "200" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', '4gDdn60Dbd', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'iiAoJcJ5RH', '{ "value": "#ffffff" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', 'R2BDfhnUXF', '{ "value": "Steel" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcm', '767cAm6pTR', '{ "value": "50" }');

-- Harley Davidson
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 't6guOpyORQ', '{ "value": "2019" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'Iwiw1QLbXP', '{ "value": "125" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcq', 'S8xteMD6V5', '{ "value": "#ff0000" }');

-- Pickup Truck
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'X0bZdioM6D', '{ "value": "Used" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 't6guOpyORQ', '{ "value": "2006" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'UM9PPU64GB', '{ "value": "150000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'VuLNBGpP7Z', '{ "value": "Gasoline" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'Iwiw1QLbXP', '{ "value": "95" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'ni6pEhjovT', '{ "value": "Manual" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', '7O5s6eKwwh', '{ "value": "2" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'lRriZmW7bx', '{ "value": "#000080" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcp', 'QxCtZcsWVh', '{ "value": "#ffffff" }');

-- Sports Car
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 't6guOpyORQ', '{ "value": "2020" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'VuLNBGpP7Z', '{ "value": "Electric" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'Iwiw1QLbXP', '{ "value": "216" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'ni6pEhjovT', '{ "value": "Automatic" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', '7O5s6eKwwh', '{ "value": "5" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'lRriZmW7bx', '{ "value": "#000000" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabco', 'QxCtZcsWVh', '{ "value": "#ff00ff" }');

-- Electric Skateboard
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'X0bZdioM6D', '{ "value": "New" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 't6guOpyORQ', '{ "value": "2023" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'UM9PPU64GB', '{ "value": "0" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'VuLNBGpP7Z', '{ "value": "Electric" }');
INSERT INTO attribute_value (product_id, attribute_id, data) VALUES ('X0bZdiabcl', 'Iwiw1QLbXP', '{ "value": "25" }');

-- MLB Baseball Hat, Sleeveless Blouse, Denim Shirt, Leather Jacket, Leather Jacket, Chino Pants, Slim Fit Jeans, Cargo Shorts, Sneakers, Ankle Socks
-- Luxury Condo, Cozy Cabin, Modern Stud, Beachfront Villa

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
