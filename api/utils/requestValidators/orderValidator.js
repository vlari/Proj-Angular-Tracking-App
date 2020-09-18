const Joi = require('joi');

exports.validateOrder = (body) => {
  const schema = Joi.object({
    subtotal: Joi.number()
      .required(),
    salesTax: Joi.number()
      .required(),
    total: Joi.number()
      .required(),
    packages: Joi.array()
      .required()
  });

  return schema.validate(body);
};
