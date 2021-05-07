-- @BLOCK
INSERT INTO dupliCustomers (passhash, phone, email, age, sex, house, area, landmark, city, state, pin)
VALUES (
  'Aa!12345',
  '9876543210',
  'amit@example.com',
  19,
  'm',
  'A11',
  'abc',
  'def',
  'Pune',
  'Maharashtra',
  '411001'
);

-- @BLOCK
SELECT * FROM duplicustomers;

-- @BLOCK
DELETE FROM duplicustomers;

-- @BLOCK
SELECT CURRENT_DATE FROM DUAL;


-- @BLOCK
DESC customers;
