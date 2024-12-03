import { number, object, string } from "yup";
import type { InferType } from "yup";

export const updateGroupSchema = object({
  name: string().min(3, "Nome do grupo muito curto")
    .required("Nome do grupo obrigatório")
    .max(100, "Nome do grupo muito longo"),
  parentGroupId: number().positive("Id do grupo inválido")
    .transform((value) => value || null)
    .nullable()
})

export type UpdateGroupSchema = InferType<typeof updateGroupSchema>