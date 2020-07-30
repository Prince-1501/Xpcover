const ratingFunction = require("./productRatingFunctions");

exports.ratingEngine = async (partnerData, InsurancePolicies) => {
  let result = {};

  await Promise.all(
    InsurancePolicies.map(async (policies, index) => {
      switch (policies.insurance_product_id) {
        case "BQAAAA":
          const outputBQAAAA = await ratingFunction.BQAAAA(
            partnerData,
            policies
          );
          result[policies.insurance_product_id] = outputBQAAAA;
          break;

        case "PTAAAC":
          const outputPTAAAC = await ratingFunction.PTAAAC(
            partnerData,
            policies
          );
          result[policies.insurance_product_id] = outputPTAAAC;
          break;

        default:
          break;
      }
    })
  );

  return result;
};
