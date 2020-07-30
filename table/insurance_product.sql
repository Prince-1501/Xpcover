CREATE TABLE insurance_product(
   id BIGSERIAL NOT NULL,
   product_name VARCHAR(255) NOT NULL,
   insurance_product_id VARCHAR(6) NOT NULL,
   insurance_type VARCHAR(255) NOT NULL,
   insurance_category VARCHAR(255) NOT NULL,
   insurance_company_id INTEGER [],
   policyproducercode json,
   policynumber json,
   series_id json,
   country_id INTEGER,
   date_of_issue DATE,
   createdate DATE,
   updatedate DATE,
   status BOOLEAN,
   product_metadata TEXT,
   tags VARCHAR(255)
);

INSERT INTO
   insurance_product(
      product_name,
      insurance_product_id,
      insurance_type,
      insurance_category,
      insurance_company_id,
      policyproducercode,
      policynumber,
      series_id,
      country_id,
      date_of_issue,
      createdate,
      updatedate,
      status,
      product_metadata,
      tags
   )
VALUES
   (
      'Travel',
      'BQAAAA',
      'Travelling',
      'main product',
      ARRAY [1, 2, 3],
      '{"1":"POLICYPRODUCER09390", "2":"45788YPRODUCER09390", "3":"688666CYNUMBER8029" }',
      '{"1":"POLICYNUMBER8029", "2":"UEBWIW729292", "3":"GEYEEWI822892829"}',
      '{"1":"5688H923BHD", "2":"BAT332923BHD", "3":"DHDIE78BAT332923BHD"}',
      '23',
      '1999-01-08',
      '1999-01-08',
      '1999-01-06',
      false,
      'This is a Product which Provide a Insurance on Travel',
      'Construction All Risk'
   ),
   (
      'Life',
      'PTAAAC',
      'Instrument',
      'addons',
      ARRAY [1, 2, 3],
      '{"1":"POLICYPRODUCER09390", "2":"45788YPRODUCER09390", "3":"688666CYNUMBER8029" }',
      '{"1":"POLICYNUMBER8029", "2":"UEBWIW729292", "3":"GEYEEWI822892829"}',
      '{"1":"5688H923BHD", "2":"BAT332923BHD", "3":"DHDIE78BAT332923BHD"}',
      '78',
      '2010-01-08',
      '2010-01-08',
      '2011-01-06',
      true,
      'This is a Product which Provide a Insurance on Life of Perosn',
      'Construction All Risk'
   );
