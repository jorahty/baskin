TRUNCATE TABLE product_image;

-- Molly Member
--INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','a_' || translate(gen_random_uuid()::text, '-','') || '_m'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','a_738b2cc3b22a4d69951c18357e625f73_m'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','h_4020d0bd5f5a469fa4a38111c2a6f562_m'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','b_d9bd41c0a9c24dcbb23550947b080781_m'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','g_14c798ab6d684b2d82d38037bdda87a6_m'));

-- Mia Moderator
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','f_e69d1c6f4cba4fe993e5ea342e92d95e_m'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','v_a81a5fa502c04d29911bd3e9e2ada2a7_m'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','s_512a6c74918e4ec1941ddac7ab348ec6_m'));

-- Anna Moderator
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','p_0d0d395a267945ac8befa09c392d3c6d_a'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','r_bc86c3b3b6e84266b39da08d9d9b1b2f_a'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','c_62f96bf5df19414e885d00f612b77c95_a'));
INSERT INTO product_image(data) VALUES (jsonb_build_object('fileName','s_4e437d446f9e42ada6bb2b45c6cad6a2_a'));