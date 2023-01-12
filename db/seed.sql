INSERT INTO department (department_name)
VALUES ("Employee"),
       ("Engineering"),
       ("Leadership"),
       ("Hospitality"),
       ("Finance");



INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 85000, 1),
       ("Coreographer", 50000, 3),
       ("accountant", 70000, 2),
       ("Banker", 35500, 1),
       ("Engineer", 600000.00, 4),
       ("CEO", 800000.00, 5),
       ("product marketing manager", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES   ("Jazz", "Tom", 1,NULL),
 ("Swizz", "Micheal", 4, NULL),
("Bims", "Karn", 6, 1),
("Jerry","Swizz", 5, 1),
("Megna", "Alcia", 7, 4),
("Harman", "Fatima", 6, 5),
("Jack", "Mahi", 2, 1),
("Jack", "Jill", 6, 5),
("Kamla", "Peehu", 3, 8);
