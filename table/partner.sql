CREATE TABLE partner(
   id                         BIGSERIAL NOT NULL,
   company_name               VARCHAR(64) NOT NULL,
   registration_id            VARCHAR(128) NOT NULL,
   vat                        VARCHAR(64) NOT NULL,
   brand_name                 VARCHAR(128) NOT NULL,
   country_present_in         text[],
   state_present_in           text[],
   main_product               text[],
   insurance_product_name     VARCHAR(255) NOT NULL,
   upload_doc                 VARCHAR(255) NOT NULL,
   company_metadata           TEXT,
   createdate                 DATE,
   updatedate                 DATE,
   status                     BOOLEAN
);

INSERT INTO partner(
  company_name,
  registration_id,
  vat,
  brand_name,
  country_present_in,
  state_present_in,
  main_product,
  insurance_product_name,
  upload_doc,
  company_metadata,
  createdate,
  updatedate,
  status) VALUES ('XPCOVER','RESGISTARTION71209323QP','VAT29328922','DUMMY DATA xpcover','{"AMERICA", "INDIA"}','{"ca", "pk"}','{"health", "car"}',
    'XPCOVER TESTING PRODUCT NAME','upload/file/patth/293293kwewnaowc', 'Abhishek xpcover@test.com 3293232030', '1999-01-08','1999-01-06',false),

('XPCOVER2','RESGISTARTESTING2','VAT29DHDD922','DUMMY DATA 2 xpcover','{"CHINA", "DHAKA"}','{"ko", "we"}','{"skin", "truck"}',
'TESTING2 PRODUCTWER NAME','upload/file/patth/89799bdibsow', 'PRINCE xpcover2@test.com 93298392392','2010-01-08','2011-01-06',true);
