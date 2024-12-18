import { array, boolean, number, object, string, type InferType } from "yup";

const createLinkTagScheme = object({
  id: number().positive("Número inválido").required("Id da tag obrigatória"),
  name: string().required("Nome da tag obrigatório"),
  color: string().required("Cor da tag obrigatório"),
})

export const createLinkSchema = object({
  name: string().min(5, "Nome muito curto").max(100, "Máximo de caracteres excedido").required("Nome do link obrigatório"),
  url: string().max(2048, "Máximo de caracteres excedido").url("URL deve ser válida").required("URL obrigatória"),
  expires: boolean().default(false),
  expiresAt: string().when("expires", {
    is: true,
    then: (s) => s.required("Data de expiração obrigatória")
      .test("after-today", "Data de expiração não pode ser passado", (value) => {
        const date = new Date(value)
        return date.getTime() > Date.now()
      }),
    otherwise: (s) => s.optional()
  })
  .transform((value) => {
    if (typeof value !== "string") return value
    return value + "T00:00"
  }),
  groupId: number().positive("Número inválido").optional().nullable(),
  tags: array(createLinkTagScheme).max(5, "Máximo de tags excedido").default([]),
  // .transform((value) => {
  //   const tags = array(createLinkTagScheme).cast(value)
  //   if(tags) return tags.map((t) => t.id)
  // }),
})

export type CreateLinkSchema = InferType<typeof createLinkSchema>