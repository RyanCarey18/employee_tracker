USE company_db;

INSERT INTO department (name)
VALUES ("Dairy"),
       ("Produce"),
       ("Grocery");

INSERT INTO role (department_id, title, salary)
VALUES (1, "Dairy Manager", 50000),
       (1, "Dairy Clerk", 25000),
       (2, "Produce Manager", 55000),
       (2, "Produce professor", 23000),
       (3, "Grocery Manager",52000),
       (3, "Stocker", 27000);

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "Kyle", "Richards", 1),
       (2, "Nathan", "Smith", 1),
       (3, "Ken", "Jennings", 1),
       (4, "Sandy", "Cheeks", 1),
       (5, "George","Bird", 1),
       (6, "Scooter", "Bell", 1),
       (6, "Rebecca", "Black", 1);