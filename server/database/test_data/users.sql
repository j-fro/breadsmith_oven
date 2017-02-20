insert into users (id, first_name, last_name, email, role, customer_id) values (42, 'Nancy', 'Anderson', 'nancy@breadsmithmn.com', 'admin', 42);
insert into users (id, first_name, last_name, email, role, customer_id) values (43, 'Dave', null, 'dave@breadsmithmn.com', 'admin', 42);
insert into users (id, first_name, last_name, email, role, customer_id) values (44, 'Ryan', null, 'ryan@breadsmithmn.com', 'admin', 42);
insert into users (id, first_name, last_name, email, role, customer_id) values (45, 'Jen', null, 'jen@breadsmithmn.com', 'admin', 42);
insert into users (id, first_name, last_name, email, role, customer_id) values (101, 'Jacob', 'Froman', 'jacob.h.froman@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (102, 'John', 'Amakye', 'j.amakyecubed@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (103, 'Karla', 'Hugo', 'karlabrandon817@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (104, 'Sherrie', 'Bloomquist', 'sherrie.bloomquist@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (105, 'Deforis', 'Nash', 'defhnash@gmail.com', 'admin', 100);
insert into users (id, first_name, last_name, email, role, customer_id) values (106, 'Sherrie', 'Bloomquist', 'sherrieatprimehotel@gmail.com', 'customer', 101);

SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
