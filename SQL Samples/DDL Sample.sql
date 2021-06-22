CREATE TABLE IF NOT EXISTS `employee` (
`employee_id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
`first_name` varchar(20) NOT NULL,
`last_name` varchar(20) NOT NULL,
`street` varchar(25) NOT NULL,
`city` varchar(20) NOT NULL,
`state` char(2) NOT NULL,
`zipcode` char(10) NOT NULL,
`hire_date` date NOT NULL,
`manager_id` integer,
/* 1.b. */
CONSTRAINT `employee_fk` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`employee_id`)  
);

CREATE TABLE IF NOT EXISTS `customer`(
`customer_id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
`first_name` varchar(20) NOT NULL,
`last_name` varchar(20) NOT NULL,
`street` varchar(25) NOT NULL,
`city` varchar(20) NOT NULL,
`state` char(2) NOT NULL,
`zipcode` char(10) NOT NULL,
`phone` varchar(11) NOT NULL,
`email` varchar(100) NULL
/* 1.a. */
);

CREATE TABLE IF NOT EXISTS `invoice` (
`invoice_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
`date_id` date NOT NULL,
`date_out` date,
/* 1.c. */
`customer_id` integer NOT NULL,
`employee_id` integer NOT NULL,
CONSTRAINT `invoice_fk1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
CONSTRAINT `invoice_fk2` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
/* 3 */
);

CREATE TABLE IF NOT EXISTS `item` (
`item_id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
`description` text NOT NULL,
/* 4 */
`price` double(5,2)
/* 2 */
);

CREATE TABLE IF NOT EXISTS ` complaint`(
`complaint_id` integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
`date` date	NOT NULL,
`details` text NOT NULL,
`customer_id` int NOT NULL,
`item_id` int NOT NULL,
CONSTRAINT `complaint_fk1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
CONSTRAINT `complaint_fk2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`)
);

CREATE TABLE IF NOT EXISTS `invoice_item` (
`item_id` int NOT NULL,
`invoice_id` int NOT NULL,
`quantity` int NOT NULL,
PRIMARY KEY (item_id, invoice_id),
CONSTRAINT `invoice_item_fk1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`),
CONSTRAINT `invoice_item_fk2` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`)
);