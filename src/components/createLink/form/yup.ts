import type { InferType } from "yup";
import { array, number, object, string } from "yup";

export const createLinkSchema = object({
  name: string().min(5, "Nome muito curto").max(100, "Máximo de caracteres excedido").required("Nome do link obrigatório"),
  url: string().max(2048, "Máximo de caracteres excedido").url("URL deve ser válida").required("URL obrigatória"),
  expiresAt: string().optional().transform((value) => {
    if (typeof value !== "string") return value
    return value + "T00:00"
  }),
  groupId: number().positive("Número inválido").optional().nullable(),
  tags: array(
    number().positive("Número inválido").required("Id da tag obrigatória")
  ).max(5, "Máximo de tags excedido").optional().nullable(),
})

export type CreateLinkSchema = InferType<typeof createLinkSchema>