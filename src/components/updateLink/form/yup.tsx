import { array, number, object, string } from "yup";
import type { InferType } from "yup";

const updateLinkTagScheme = object({
  id: number().positive("Número inválido").required("Id da tag obrigatória"),
  name: string().required("Nome da tag obrigatório"),
  color: string().required("Cor da tag obrigatório"),
})

export const updateLinkSchema = object({
  name: string().min(5, "Nome muito curto").max(100, "Máximo de caracteres excedido").required("Nome do link obrigatório"),
  expiresAt: string().optional().nullable()
  // .test("after-today", "Data de expiração não pode ser passado", (value) => {
  //   if(!value) return true
  //   const date = new Date(value)
  //   return date.getTime() > Date.now()
  // })
  .transform((value) => {
    if (typeof value !== "string") return value
    return value + "T00:00"
  }),
  groupId: number().positive("Número inválido").optional().nullable(),
  tags: array(updateLinkTagScheme).max(5, "Máximo de tags excedido").default([]),
  // .transform((value) => {
  //   const tags = array(createLinkTagScheme).cast(value)
  //   if(tags) return tags.map((t) => t.id)
  // }),
})

export type UpdateLinkSchema = InferType<typeof updateLinkSchema>