CREATE TABLE partner_product(
   id                                   BIGSERIAL NOT NULL,
   product_name                         text,
   partner_id                           INTEGER,
   createdate                           DATE,
   updatedate                           DATE,
   status                               BOOLEAN
 );

INSERT INTO partner_product (
product_name,
partner_id,
createdate,
updatedate,
status ) VALUES
('{"health", "life"}', '1','1999-01-08','1999-01-06',false),
('{"Mobile", "Tyre"}', '2','2010-01-08','2011-01-06',true);
