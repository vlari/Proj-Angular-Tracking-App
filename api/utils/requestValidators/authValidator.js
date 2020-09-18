const Joi = require('joi');

exports.validateSignup = (body) => {

  const schema = Joi.object({
    name: Joi.string()
      .required(),
    lastName: Joi.string(),
    dateOfBirth: Joi.string()
      .required(),
    citizenId: Joi.string()
      .required(),
    email: Joi.string()
      .pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)
      .required(),
    address: Joi.string()
      .required(),
    phone: Joi.string()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    DocumentTypeId: Joi.number()
      .required(),
    PaymentOptionId: Joi.number()
      .required(),
    FacilityId: Joi.number()
      .required()
  });

  return schema.validate(body);
};

exports.validateSignin = (body) => {

  const schema = Joi.object({
    email: Joi.string()
      .pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return schema.validate(body);
};

exports.validateEmail = (body) => {

  const schema = Joi.object({
    email: Joi.string()
      .pattern(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)
      .required()
  });

  return schema.validate(body);
};
