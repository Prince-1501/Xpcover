CREATE TABLE insurance_product_and_partner_product_mapping(
   id                                   BIGSERIAL NOT NULL,
   insurance_product_id                 INTEGER,
   partner_product_id                   INTEGER,
   createdate                           DATE,
   updatedate                           DATE,
   status                               BOOLEAN,
   start_date                           DATE,
   end_date                             DATE
);

INSERT INTO insurance_product_and_partner_product_mapping(
insurance_product_id,
partner_product_id,
createdate,
updatedate,
status,
start_date,
end_date ) VALUES
('1', '1' , '1999-01-08', '1999-01-06', true,'1999-01-08', '1999-01-06'),
('2', '2' , '2010-01-06', '2011-01-06', true,'2012-01-08', '2013-01-06');
