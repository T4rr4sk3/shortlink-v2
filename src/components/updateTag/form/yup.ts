import { object, string, type InferType } from "yup";

import { HEX_COLOR } from "@app/lib/regexp";

export const updateTagSchema = object({
  name: string().min(3, "Nome da tag muito curto")
    .required("Nome da tag obrigatório")
    .max(100, "Nome da tag muito longo"),
  color: string().matches(HEX_COLOR, "Valor deve ser uma cor hexadecimal")
    .transform((value) => value?.toUpperCase())
    .required("Cor da tag obrigatória"),
})

export type UpdateTagSchema = InferType<typeof updateTagSchema>