#
#1 Create a view called no_invoices. This view should display all information for customers who have no invoices. After creating this view, select from it and show only a list of customer emails.
CREATE VIEW no_invoice AS
SELECT *
FROM customer
JOIN invoice USING (customer_id)
WHERE invoice_id IS null;

SELECT email
FROM no_invoice;

#2 Create a view called invoice_summary. This view should display the invoice ID, date in, date out, description, quantity, and price. After creating this view, select from it while showing order summaries for those containing men's shirts where the date out was on or after October 1, 2017.
CREATE VIEW invoice_summary AS
SELECT invoice_id, date_in, date_out, description, quantity, price
FROM invoice 
JOIN invoice_item USING (invoice_id)
JOIN item USING (item_id);

SELECT *
FROM invoice_summary
WHERE description = "Mens Shirt"
AND date_out <= '2017-10-01';

#Part 2
#1 Create a procedure named price_change that takes two input parameters (i.e. item ID and price). The procedure should use the item ID and price input parameters to change the price for the given item. Provide the code that would test to see if your procedure works.
DELIMITER $$
CREATE PROCEDURE price_change (IN vItem_id int AND vPrice double(3,1))
BEGIN
UPDATE item
SET price = Vprice
SELECT item_id, price FROM item
END$$
DELIMITER;

#2 Create a function named invoice_total that will return the total for a given invoice (i.e. invoice ID). Select from this function displaying the invoice ID and the total for the selected invoice. Sort the results by total in descending order.
DELIMITER $$
CREATE FUNCTION invoice_total (vInvoice int) RETURNS double(10,2)
BEGIN
DECLARE vTotal double(10,2);
SELECT inv.invoice_id, 
	ROUND(SUM(it.price * inv.quantity),2) AS Subtotal, 
	ROUND(SUM(it.price * inv.quantity),2) * .075 AS Tax,
	ROUND(SUM(it.price * inv.quantity),2) * 1.075 AS Total
FROM invoice_item inv
JOIN item it ON it.item_id = inv.item_id
GROUP BY inv.invoice_id
ORDER BY subtotal DESC;
RETURN (vTotal);
END$$
DELIMITER;

SELECT invoice_total
FROM invoice;

#3 Create a trigger named invalid_date that checks if the invoice date in is before today. If this is the case supply the new record with the current date. Test to see if your trigger works.
DELIMITER $$
CREATE TRIGGER invalid_date
BEFORE INSERT ON invoice
FOR EACH ROW
BEGIN
INSERT INTO invoice (date_in)
VALUES (CURDATE());
END$$
DELIMITER;

INSERT INTO invoice (date_in)
VALUES (CURDATE());