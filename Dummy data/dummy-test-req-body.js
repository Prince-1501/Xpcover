const customer = new customerModel({
  // partner_id: partnerid,
  // quoteData,
  currency : req.body.currency,
  premium_Calculations : {
      total_tickets_price : req.body.total_tickets_price,
      policy_start_date    : req.body.policy_start_date,
      destination_country  : req.body.destination_country,
      policy_end_date     :  req.body.policy_end_date,
      destination_region  : req.body.destination_region,
      reservation_number  : req.body.reservation_number,
      departure_country   : req.body.departure_country,
      flexible_ticket    : req.body.flexible_ticket,
      class    : req.body.class,
      flights : {
          legs : {
            departure_datetime   : req.body.departure_datetime,
            arrival_datetime   : req.body.arrival_datetime,
            flight_number   : req.body.flight_number,
            departure_airport   : req.body.departure_airport,
            arrival_airport   : req.body.arrival_airport,
            departure_country   : req.body.departure_country,
            arrival_country   : req.body.arrival_country
          },
          airline_reservation_number   : req.body.airline_reservation_number,
          departure_datetime   : req.body.departure_datetime,
          arrival_datetime   : req.body.arrival_datetime,
          departure_country   : req.body.departure_country,
          arrival_country   : req.body.arrival_country,
          departure_city   : req.body.departure_city,
          arrival_city   : req.body.arrival_city
      },
      number_of_children   : req.body.number_of_children,
      number_of_adults   : req.body.number_of_adults,
      number_of_infants   : req.body.number_of_infants,
      baggage_count   : req.body.baggage_count,
      trip_start_date   : req.body.trip_start_date,
      trip_end_date   : req.body.trip_end_date,
      insured : {
        id   : req.body.id,
        first_name   : req.body.first_name,
        last_name   : req.body.last_name,
        email   : req.body.email,
        country   : req.body.country,
        address1   : req.body.address1,
        address2   : req.body.address2,
        city   : req.body.city,
        postcode   : req.body.postcode,
        region   : req.body.region,
        phone   : req.body.phone,
        age   : req.body.age,
        birth_date   : req.body.birth_date,
        metadata   : req.body.metadata,
        company   : req.body.company
      },
      policy_type_version  : req.body.policy_type_version,
      policy_type  : req.body.policy_type
  },
  customer_country    : req.body.customer_country,
  customer_region    : req.body.customer_region,
  customer_language    : req.body.customer_language,
  customer_email    : req.body.customer_email,
  customer_ip    : req.body.customer_ip,
  customer_postcode    : req.body.customer_postcode,
  partner_id    : req.body.partner_id,
  partner_subsidiary    : req.body.partner_subsidiary,
  partner_transaction_id    : req.body.partner_transaction_id,
  partner_customer_id    : req.body.partner_customer_id,
  partner_metadata    : req.body.partner_metadata,
  opt_out    : req.body.opt_out,
  status    : req.body.status

});
console.log(customer);
