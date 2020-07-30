CREATE TABLE template(
   series_id                            BIGSERIAL NOT NULL,
   insurance_company_id                 VARCHAR(255) NOT NULL,
   country                              VARCHAR(128) NOT NULL,
   product_id                           VARCHAR(128) NOT NULL,
   email_pdf                            VARCHAR(255) NOT NULL,
   email_html                           VARCHAR(255) NOT NULL,
   image_pdf                            VARCHAR(255) NOT NULL,
   image_html                           VARCHAR(255) NOT NULL
 );

INSERT INTO template (
insurance_company_id,
country,
product_id,
email_pdf,
email_html,
image_pdf,
image_html) VALUES

('1','INDIA','WEAAAQ','https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png', 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' , 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' ,'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png'),
('2','PAKISATN','AAAAAD','https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png', 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' , 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' ,'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png'),
('3','IRAQ','BSQAAI','https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png', 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' , 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' ,'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png'),
('11','AMERICA','POAAAQ','https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png', 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' , 'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png' ,'https://xpcfiles.s3.amazonaws.com/insurancedocs/1595922682946_img_avatar2.png');
