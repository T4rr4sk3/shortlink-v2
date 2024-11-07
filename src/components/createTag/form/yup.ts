import { HEX_COLOR } from "@app/lib/regexp";
import { boolean, object, string } from "yup";
import type { InferType } from "yup";

export const createTagSchema = object({
  name: string().min(3, "Nome da tag muito curto")
    .required("Nome da tag obrigatório")
    .max(100, "Nome da tag muito longo"),
  color: string().matches(HEX_COLOR, "Valor deve ser uma cor hexadecimal")
    .transform((value) => value?.toUpperCase())
    .optional(),
  haveColor: boolean().default(false),
})

export type CreateTagSchema = InferType<typeof createTagSchema>