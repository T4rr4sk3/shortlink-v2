import type { Control, FieldPath, FieldValue, FieldValues} from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useId, type ChangeEvent, type ComponentPropsWithoutRef } from "react";
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

export default function CheckboxControl<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, control, label, errorMessage, helperMessage, className, id, ...props }: InputControlProps<TFieldValues, TName>) {
  const inputId = useId()
  return(
    <FormField
      name={name}
      control={control}
      disabled={props.disabled}
      render={({ field }) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
          field.onChange(e.target.checked);
          if(props.onChange) props.onChange(e)
        }

        const definitiveValue = (
          typeof field.value === "number" ||
          typeof field.value === "string" // number or string need to have a value
        ) ? field.value : props.defaultValue || ""

        const definitiveId = id || inputId

        return(
          <FormItem>
            <FormControl>
              <FormLabel htmlFor={definitiveId} className="inline-flex w-full items-center">
                <MainInput id={definitiveId} {...props} {...field} className="w-4 h-4 mr-2" type="checkbox" value={definitiveValue} checked={field.value || false} onChange={onChangeHandler} />
                <span className={className}>{label}</span>
              </FormLabel>
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