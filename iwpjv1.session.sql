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
SELECT * FROM categories;

-- @BLOCK
SELECT * FROM products;

-- @BLOCK
SELECT * FROM sellers;

-- @BLOCK
DELETE FROM customers;

-- @BLOCK
DELETE FROM sellers;

-- @BLOCK
DESC sellers;

-- @BLOCK
DESC products;

-- @BLOCK
INSERT INTO products (
    sid,
    catid,
    name,
    price,
    stock,
    description
  )
VALUES
(
15,
'112',
'iPad Pro (13 inch, Space Grey)',
'65000',
90,
'OS: iPadOS
Processor: M1'
),

(
15,
'113',
'iPhone 12 Pro Max (Purple)',
'100000',
100,
'OS: iOS
Processor: A13 Bionic'
);