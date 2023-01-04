import { Exception } from "@exceptions/Exception";

function ValidateRouter(schema, params){
  const validateSchema = schema.validate(params);
  if(validateSchema.error) throw new Exception(validateSchema.error.message, 400);
  return true;
}

export  {ValidateRouter};