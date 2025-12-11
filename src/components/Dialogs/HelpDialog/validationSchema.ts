import * as yup from "yup";

export const validationSchema = yup.object({
  personType: yup.string().required(),
  firstName: yup.string().required("Ім'я обов'язкове"),
  lastName: yup.string().required("Прізвище обов'язкове"),
  organization: yup.string().optional().default(""),
  email: yup
    .string()
    .email("Невірна email адреса")
    .required("Email обов'язковий"),
  phone: yup
    .string()
    .matches(/^[\d\s\-\+\(\)]+$/, "Невірний номер телефону")
    .required("Номер телефону обов'язковий"),
  country: yup.string().required("Країна обов'язкова"),
  city: yup.string().required("Місто обов'язкове"),
  state: yup.string().optional().default(""),
  address: yup.string().optional().default(""),
  postalCode: yup.string().optional().default(""),
  helpType: yup.string().required(),
  paymentMethod: yup.string().when("helpType", {
    is: "financial",
    then: (schema) => schema.required("Виберіть спосіб оплати"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  cardNumber1: yup.string().when(["helpType", "paymentMethod"], {
    is: (helpType: string) => helpType === "financial",
    then: (schema) => schema.required("Обов'язкове поле"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  cardNumber2: yup.string().when(["helpType", "paymentMethod"], {
    is: (helpType: string) => helpType === "financial",
    then: (schema) => schema.required("Обов'язкове поле"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  cardNumber3: yup.string().when(["helpType", "paymentMethod"], {
    is: (helpType: string) => helpType === "financial",
    then: (schema) => schema.required("Обов'язкове поле"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  cardNumber4: yup.string().when(["helpType", "paymentMethod"], {
    is: (helpType: string) => helpType === "financial",
    then: (schema) => schema.required("Обов'язкове поле"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  expiryDate: yup.string().when(["helpType", "paymentMethod"], {
    is: (helpType: string) => helpType === "financial",
    then: (schema) => schema.required("Обов'язкове поле"),
    otherwise: (schema) => schema.optional().default(""),
  }),
  cvv: yup.string().when(["helpType", "paymentMethod"], {
    is: (helpType: string) => helpType === "financial",
    then: (schema) => schema.required("Обов'язкове поле"),
    otherwise: (schema) => schema.optional().default(""),
  }),
});
