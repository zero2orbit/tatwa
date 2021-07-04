const Joi = require('@hapi/joi');

const employeeRegSchema = Joi.object({
    name: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
    email: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    // proj_id: Joi.number()
    //             .integer()
    //             .required()
})



const projectSchema = Joi.object({
    projectName: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
    projectDesc: Joi.string()
                    .min(3)
                    .required(),

    // dept_id: Joi.number()
    //                 .integer()
    //                 .required()
})

const DepaertmentSchema = Joi.object({
    depaertmentName: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(100)
                    .required(),
    depaertmentDesc: Joi.string()
                    .min(3)
                    .required()
})



module.exports = {
    employeeRegSchema,
    projectSchema,
    DepaertmentSchema
}
