import { number, object, string } from "yup";
import type { InferType } from "yup";

export const createGroupSchema = object({
  name: string().min(3, "Nome do grupo muito curto")
    .required("Nome do grupo obrigatório")
    .max(100, "Nome do grupo muito longo"),
  parentGroupId: number().optional().positive("Id do grupo inválido")
})

export type CreateGroupSchema = InferType<typeof createGroupSchema>