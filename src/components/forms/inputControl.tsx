import type { Control, FieldPath, FieldValue, FieldValues} from "react-hook-form";
import type { ChangeEvent, ComponentPropsWithoutRef } from "react";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { MainInput } from "./mainInput";

interface InputControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ComponentPropsWithoutRef<"input"> {
  name: TName
  label?: string
  control?: Control<TFieldValues>
  helperMessage?: string
  errorMessage?: string
  defaultValue?: FieldValue<TFieldValues>
}

export default function InputControl<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, label, errorMessage, helperMessage, ...props }: InputControlProps<TFieldValues, TName>) {
  return(
    <FormField
      name={name}
      control={control}
      disabled={props.disabled}
      render={({ field }) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          field.onChange(e);
          if(props.onChange) props.onChange(e)
        }

        const definitiveValue = (
          typeof field.value === "number" ||
          typeof field.value === "string" // number or string need to have a value
        ) ? field.value : props.defaultValue || ""

        return(
          <FormItem>
            {label && <FormLabel> {label} </FormLabel> }
            <FormControl>
              <MainInput {...props} {...field} value={definitiveValue} onChange={onChangeHandler} />
            </FormControl>
            {helperMessage &&
              <FormDescription> {helperMessage} </FormDescription>
            }
            <FormMessage errorMessage={errorMessage} />
          </FormItem>
        )
      }}
    />
  )
}