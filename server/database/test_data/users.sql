insert into users (id, first_name, last_name, email, role, customer_id) values (1, 'Jacob', 'Froman', 'jacob.h.froman@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (2, 'Sherrie', 'B', 'sherrie.bloomquist@yahoo.com', 'customer', 50);
insert into users (id, first_name, last_name, email, role, customer_id) values (3, NULL, NULL, 'j.amakyecubed@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (4, NULL, NULL, 'karlabrandon817@gmail.com', 'admin', 100);

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
