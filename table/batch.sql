CREATE TABLE batch(
   series_id                            BIGSERIAL NOT NULL,
   insurance_company_id                 VARCHAR(128) NOT NULL,
   insurance_product_id                 VARCHAR(128) NOT NULL,
   series_start                         VARCHAR(128) NOT NULL,
   series_end                           VARCHAR(128) NOT NULL,
   policy_sold                          VARCHAR(128) NOT NULL,
   policy_sold_status                   BOOLEAN,
   series_issue_date                    DATE
 );

INSERT INTO batch (
insurance_company_id,
insurance_product_id,
series_start,
series_end,
policy_sold,
policy_sold_status,
series_issue_date ) VALUES

('1','2','AB16','AB60', 'AB40', false, '12-11-2020'),
('2','2','AB116','AB990', 'AB140', false, '12-11-2020'),
('1','1','AAA512','AAA972', 'AAA682', false, '12-11-2020'),
('2','1','AAA12','AAA546', 'AAA40', false, '12-11-2020');

/*
bunch -> batch -> 4000 policy
prouduct id -> dengu
company -> reliance

status 0
policy sold
ploicy sold status  -->
*/
