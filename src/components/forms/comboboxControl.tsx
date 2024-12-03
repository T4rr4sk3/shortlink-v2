import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import type { Control, FieldPath, FieldValue, FieldValues } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import ChevronUpDownIcon from "../icons/chevronUpDown"
import { Button } from "../ui/button"
import { cn } from "@app/lib/utils"
import { Check } from "lucide-react"
import LoadingIcon from "../icons/loading"

type ComboOption = {label: string, value: string}
interface ComboboxControlProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName
  options: ComboOption[]
  placeholder: string
  searchPlaceholder?: string
  emptyMessage?: string
  label?: string
  control?: Control<TFieldValues>
  helperMessage?: string
  errorMessage?: string
  defaultValue?: FieldValue<TFieldValues>
  className?: string
  disabled?: boolean
  loading?: boolean
  emptyLabel?: string
  emptyValue?: unknown
}
export default function ComboboxControl<
TFieldValues extends FieldValues = FieldValues,
TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control, name, defaultValue, disabled, label, placeholder, className, errorMessage,
  helperMessage, options, emptyMessage, searchPlaceholder, loading, emptyValue, emptyLabel
}: ComboboxControlProps<TFieldValues, TName>) {
  return(
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => {
        const fieldValue = String(field.value)
        const currentValue = options.find((opt) => opt.value === fieldValue)?.label
        const inputPlaceholder = searchPlaceholder || "Search " + placeholder.toLocaleLowerCase()
        const emptyMessagePlaceholder = emptyMessage || "No " + placeholder.toLocaleLowerCase() + " found."
        const onChangeValue = (value: string) => () => field.onChange((fieldValue === value) ? emptyValue : value)
        const iconClassName = (value: string) => cn("ml-auto", fieldValue === value ? "opacity-100" : "opacity-0")
        return(
          <FormItem className="flex flex-col">
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    disabled={disabled || loading}
                    className={cn(
                      "w-full justify-between font-normal border-cinza-fumaca-light",
                      !field.value && "text-cinza-fumaca-main",
                      className
                    )}
                  >
                    {currentValue || placeholder}
                    {loading ? <LoadingIcon /> : <ChevronUpDownIcon />}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className={cn("p-0 w-full", className)}>
                <Command>
                  <CommandInput name={field.name} placeholder={inputPlaceholder} disabled={disabled || loading} />
                  <CommandList>
                    <CommandEmpty>{emptyMessagePlaceholder}</CommandEmpty>
                    <CommandGroup>
                      {emptyLabel &&
                        <CommandItem value={emptyLabel} onSelect={onChangeValue(String(emptyValue))}>
                          {emptyLabel}
                          <Check className={iconClassName(String(emptyValue))} />
                        </CommandItem>
                      }
                      {options.map(option => (
                        <CommandItem key={option.value} value={option.label} onSelect={onChangeValue(option.value)}>
                          {option.label}
                          <Check className={iconClassName(option.value)} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {helperMessage && <FormDescription>{helperMessage}</FormDescription>}
            <FormMessage errorMessage={errorMessage} />
          </FormItem>
        )
      }}
    />
  )
}