-- @BLOCK
INSERT INTO dupliCustomers (passhash, phone, email, age, sex, house, area, landmark, city, state, pin)
VALUES (
  'Aa!12345',
  '9876543210',
  'amit@example.com',
  '2001-12-26',
  'm',
  'A11',
  'abc',
  'def',
  'Pune',
  'Maharashtra',
  '411001'
);

-- @BLOCK
SELECT CURRENT_DATE FROM DUAL;

-- @BLOCK
SELECT * FROM customers;

-- @BLOCK
SELECT * FROM sellers;

-- @BLOCK
DELETE FROM customers;

-- @BLOCK
DELETE FROM sellers;

-- @BLOCK
DESC sellers;
