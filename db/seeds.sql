USE company_db;

INSERT INTO department (name)
VALUES ("Electronics"),
       ("Grocery"),
       ("Customer Service");

INSERT INTO role (department_id, title, salary)
VALUES (2, "Stocker", 25000),
       (2, "Night Crew", 35000),
       (1, "Tech Guy", 30000),
       (3, "Representative", 40000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (2, "Scooter", "Bell", 2),
       (1, "Gordon", "Johnson", 2),
       (3, "Ken", "Jennings", 2),
       (4, "Sandy", "Cheeks", 2),
       (1, "George","Bird", 1),
       (2, "Rebecca", "Black", 1);