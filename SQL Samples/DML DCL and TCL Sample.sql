# Part 1
# 2. Insert a record in each table by doing the following:
# a. Insert yourself as a new customer.
INSERT INTO `customer`
VALUES (51, 'Riley', 'Barry', 'Fox Sedge Pl', 'Highlands Ranch', 'CO', '80126', '720-236-6679', 'rwb12128@creighton.edu');

# b. Add a new item of your choice.
INSERT INTO `customer` (first_name, last_name, phone)
VALUES ('Joe', 'Shmoe', 111-111-1111);

# c. Create a new invoice where you are the customer.
INSERT INTO `invoice` (date_in, customer_id)
VALUES ('2019-10-01', '51');

# d. Add your new item to the invoice you just created.
INSERT INTO `invoice_item`
VALUES ('51', 5, 5);

# 3. Using a query, show the structure (i.e. field, data type, null, key, default, auto_increment) of the customer table.customer
SELECT*
FROM customer;

# 4. Change Jedidiah Bugbee's phone to 712-883-6006.
UPDATE customer
SET phone = 712-883-6006
WHERE first_name = 'Jedidiah';

# 5. Increase the price for dry cleaning a Blouse by 14%.
SELECT item_id, description, price * 1.14
FROM item;

#6. Show all items that cost between $2.50 and $5 to dry clean.
SELECT*
FROM item
WHERE price BETWEEN 2.50 AND 5.00;

#7. List the first name, last name, and phone for all customers whose second and third numbers of their phone number are 13 and their last name doesn't start with a G.customer
SELECT first_name, last_name, phone
FROM customer
WHERE (phone LIKE '_13%'
AND last_name NOT LIKE 'G%');

#8. Show all information for customers who have an email address. Sort customers by last name in ascending order and then by first name in descending order.customer
SELECT*
FROM customer
WHERE email IS NOT null
ORDER BY last_name ASC;

SELECT*
FROM customer
WHERE email IS NOT null
ORDER BY first_name DESC;

#9. In one query, show the total number of items and the maximum, minimum, and average unit price (round the average to two decimal places) for all items.
SELECT item_id, description, max(price), min(price), AVG(price)
FROM item
GROUP BY price;

#10 Show the customer with the longest email address.
SELECT customer_id, first_name, last_name, max(length(email))
FROM customer;

#11 Using the DateDiff function, show the difference between today and the date each invoice went out.
SELECT datediff(2019-10-03, date_out)
FROM invoice;

#12 Show the total number of invoices received on each date where the date in is after June 1, 2017.customer
SELECT*
FROM invoice
WHERE date_in > 2017-07-01;

#13 For each item, show the total quantity included on all invoices where the total quantity is greater than or equal to 30. Give the total quantity column an alias of total_quantity.
SELECT invoice_id, item_id, quantity AS total_quantity
FROM invoice_item
WHERE quantity <= 30;

#14 Remove Formal Gown from the item table.
DELETE FROM item
WHERE description = 'Formal Gown';

#Part 2
# 1. Provide only the code (you won't be able to run them successfully) to the queries that would give the following privileges on the customer table to the users indicated. 
GRANT SELECT 
ON rwb12128 . customer
TO employee;

GRANT UPDATE
ON rwb12128 . customer
TO employee;

GRANT ALL
ON rwb12128 . customer
TO owner, manager;

# 2. Grant all privileges on your invoice_item table to one of your classmates (net ID must be lowercase) with the ability to pass these privileges to others. Have your classmate test this access.
GRANT ALL
ON rwb12128 . invoice_item
TO gtm97789
WITH GRANT OPTION;

# 3. Grant the select privilege on all tables in your database to another classmate. Have your classmate test this access.
GRANT SELECT
ON rwb12128 .* 
TO gtm97789;

# 4. Remove all privileges you granted to your classmates. Have your classmates test to see if they no longer have access.
REVOKE ALL
ON rwb12128 .*
FROM gtm97789;