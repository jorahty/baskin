DELETE FROM product_image;

-- Molly Member
--INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','air_jordans_11_' || translate(gen_random_uuid()::text, '-','') || '-m.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','air_jordans_11_738b2cc3b22a4d69951c18357e625f73-m.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','honda_civic_toy_car_4020d0bd5f5a469fa4a38111c2a6f562-m.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','baseballs_d9bd41c0a9c24dcbb23550947b080781-m.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','guitar_14c798ab6d684b2d82d38037bdda87a6-m.jpg'));

-- Mia Moderator
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','fake_apples_e69d1c6f4cba4fe993e5ea342e92d95e-m.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','vintage_disney_hoodie_a81a5fa502c04d29911bd3e9e2ada2a7-m.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','samsung_tv_512a6c74918e4ec1941ddac7ab348ec6-m.jpg'));

-- Anna Moderator
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','painting_of_sailboats_0d0d395a267945ac8befa09c392d3c6d-a.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','resistol_cowboy_hat_bc86c3b3b6e84266b39da08d9d9b1b2f-a.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','canon_eos_r6_62f96bf5df19414e885d00f612b77c95-a.jpg'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','surfboard_4e437d446f9e42ada6bb2b45c6cad6a2-a.jpg'));