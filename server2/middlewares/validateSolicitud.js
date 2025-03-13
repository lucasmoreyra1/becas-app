import { body } from "express-validator";
import moment from "moment";

export const validateSolicitud = [
  // Validación de DNI (debe ser un número de 8 dígitos)
  body("dni")
    .isNumeric()
    .withMessage("El DNI debe ser un número")
    .isLength({ min: 8, max: 8 })
    .withMessage("El DNI debe tener exactamente 8 dígitos")
    .custom((value) => {
      const dni = parseInt(value, 10);
      if (dni < 50000000 || dni > 55999999) {
        throw new Error(
          "Debes tener entre 16 y 18 años para solicitar la beca"
        );
      }
      return true;
    }),

  // Validación de nombre
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

  // Validación de apellido
  body("apellido").notEmpty().withMessage("El apellido es obligatorio"),

  // Validación de teléfono (debe ser un teléfono válido)
  body("telefono").isMobilePhone().withMessage("Teléfono inválido"),

  // Validación de email (debe ser un correo electrónico válido)
  body("email").isEmail().withMessage("Email inválido"),

  // Validación de fecha de nacimiento (debe ser una fecha en formato ISO 8601)
  body("fecha_nacimiento")
    .isISO8601()
    .withMessage("Fecha inválida")
    .custom((value) => {
      const birthDate = moment(value);
      const currentDate = moment();

      const age = currentDate.diff(birthDate, "years");

      if (age < 16 || age > 18) {
        throw new Error("La edad debe estar entre 16 y 18 años");
      }

      return true;
    }),

  // Validación de colegio
  body("colegio").notEmpty().withMessage("El colegio es obligatorio"),

  // Validación de deporte
  body("deporte").notEmpty().withMessage("El deporte es obligatorio"),

  // Validación de categoría
  body("categoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isNumeric()
    .withMessage("La categoría debe ser un número")
    .isLength({ min: 4, max: 4 })
    .withMessage("El DNI debe tener exactamente 4 dígitos"),

  // Validación de club
  body("club").notEmpty().withMessage("El club es obligatorio"),

  // Validación de localidad
  body("localidad").notEmpty().withMessage("La localidad es obligatoria"),

  // Validación de barrio
  body("barrio").notEmpty().withMessage("El barrio es obligatorio"),

  // Validación de dirección
  body("direccion").notEmpty().withMessage("La dirección es obligatoria"),
];
