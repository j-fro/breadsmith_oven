insert into users (id, first_name, last_name, email, role, customer_id) values (2, 'Jacob', 'Froman', 'jacob.h.froman@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (3, 'John', 'Amakye', 'j.amakyecubed@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (4, 'Karla', 'Hugo', 'karlabrandon817@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (5, 'Sherrie', 'Bloomquist', 'sherrie.bloomquist@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (6, 'Deforis', 'Nash', 'defhnash@gmail.com', 'admin', 100);

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
