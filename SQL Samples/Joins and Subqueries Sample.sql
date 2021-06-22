#1 Show item information for all items that have been included on an invoice. Show common columns only once.
SELECT *
FROM invoice_item
NATURAL JOIN item;
#2 Show customers and their invoices. Include all customers whether or not they have an invoice.
SELECT *
FROM customer c
LEFT OUTER JOIN invoice i ON c.customer_id = i.customer_id;
#3 Show customers (first and last name) that picked up (date out) their dry cleaning between September 1, 2017 and September 30, 2017.
SELECT first_name, last_name
FROM invoice i
JOIN customer c ON i.customer_id=c.customer_id
WHERE date_out BETWEEN '2017-09-1' AND '2017-09-30';
#4 Using subqueries only, show the first name and last name of all customers who have had an invoice with an item named Dress Shirt. Present the results sorted by last name in ascending order and then first name in descending order.
SELECT first_name, last_name
FROM customer
WHERE customer_id IN (SELECT customer_id
					  FROM invoice
					  WHERE invoice_id IN (SELECT invoice_id
											FROM invoice_item
											WHERE item_id IN (SELECT item_id
																 FROM item
																 WHERE description='Dress Shirt')))
ORDER BY first_name DESC, last_name ASC;
#5 Without entering table IDs except to connect the tables, use subqueries to change Jedidiah Bugbee's quantity of Dress Shirts included on his March 21, 2018 invoice from 6 to 3.
UPDATE invoice_item
SET quantity=3
WHERE invoice_id IN (SELECT invoice_id
					 FROM invoice
					 WHERE customer_id
					 AND date_in='2018-03-21' IN (SELECT customer_id
														FROM customer
														WHERE last_name='Bugbee'));
#6 Show customers (first and last name) and their total number of invoices. Give the total column an alias of total_invoices.
SELECT first_name, last_name, quantity AS 'total_invoices'
FROM customer c
JOIN invoice i ON c.customer_id=i.customer_id
JOIN invoice_item ii ON ii.invoice_id=i.invoice_id
GROUP BY first_name, last_name;
#7 Show customers (first and last name) that have had more than $500 worth of dry cleaning done. Give the total cost an alias of total_dry_cleaning.
SELECT first_name, last_name, price*quantity AS total_dry_cleaning
FROM customer c
JOIN invoice i ON c.customer_id=i.customer_id
JOIN invoice_item ii ON i.invoice_id=ii.invoice_id
JOIN item it ON ii.item_id=it.item_id
WHERE price*quantity>500;
#8 Show the invoice id, subtotal (price times quantity), tax (subtotal times 7.5% tax rate), and total (subtotal plus tax) for all invoices where the subtotal is greater than $150. Set column aliases for subtotal, tax, and total. Sort by subtotal in descending order.
SELECT i.invoice_id, price*quantity AS subtotal, subtotal*1.075 AS tax, subtotal+tax AS total
FROM invoice_item ii
JOIN invoice i ON ii.invoice_id=i.invoice_id
JOIN item it ON it.item_id=ii.item_id
WHERE price*quantity>150
ORDER BY subtotal DESC;