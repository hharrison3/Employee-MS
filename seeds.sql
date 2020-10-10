INSERT INTO department
    (name)
VALUES
    ('Management'),
    ('Sales'),
    ('Marketing');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Manager', 150000, 1),
    ('Assistant Manager', 80000, 1),
    ('Sales Lead', 100000, 2),
    ('Sales Person', 80000, 2),
    ('Marketing Head', 1250000, 3),
    ('Marketing Person', 90000, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Harbour', 'Harrison', 1, NULL),
    ('Jared', 'Santos', 2, 1),
    ('John', 'Buck', 3, NULL),
    ('Sarah', 'Stone', 4, 3),
    ('Stephanie', 'Lee', 5, NULL),
    ('Ryan', 'Wong', 6, 5);