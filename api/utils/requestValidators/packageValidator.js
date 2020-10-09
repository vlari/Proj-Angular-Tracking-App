const Joi = require('joi');

exports.validatePackage = (body) => {

  const schema = Joi.object({
    trackingNumber: Joi.string()
      .required(),
    weight: Joi.string
      .required(),
    length: Joi.string
      .required(),
    width: Joi.string
      .required(),
    height: Joi.string
      .required(),
    service: Joi.string()
      .required(),
    AccountId: Joi.number()
      .required(),
    StatusTypeId: Joi.number()
      .required(),
    ContentTypeId: Joi.number()
      .required()
  });

  return schema.validate(body);
};