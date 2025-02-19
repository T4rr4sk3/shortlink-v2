"use client"
import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@app/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@app/components/ui/popover";
import { getLinkTagsClient } from "@app/bin/endpoints/linkTag";
import { MainButton } from "@app/components/common/mainButton";
import type { GetTagsReturn } from "@app/types/api/tag";
import { useLoading } from "@app/hooks/use-loading";
import { Button } from "@app/components/ui/button";
import { apiRejectHandler } from "@app/lib/api";

interface TagInputProps {
  onIncludeTag: (tag: GetTagsReturn) => void,
  disabled?: boolean,
}
export default function CreateLinkFormTagInput({ onIncludeTag, disabled }: TagInputProps) {
  const { onLoading, offLoading, loading } = useLoading()
  const [tags, setTags] = useState<GetTagsReturn[]>([])
  const [isOpen, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const searchTags = useCallback(async (name?: string) => {
    onLoading()
    return getLinkTagsClient(name).then(setTags)
      .catch(apiRejectHandler("Buscar tags"))
      .finally(offLoading)
  }, [onLoading, offLoading])

  useEffect(() => { searchTags() }, [searchTags])

  const handleSelect = (itemValue: string) => {
    setValue(itemValue === value ? "" : itemValue)
    setOpen(false)
  }
  const selectClassName = (itemValue: string) => {
    return "ml-auto " + value === itemValue ? "opacity-100" : "opacity-0"
  }
  const currentTag = tags.find(tag => tag.name === value)
  const handleClick = () => {
    if(currentTag) {
      onIncludeTag(currentTag)
      setValue("")
      setOpen(false)
    }
  }
  return(
    <div className="w-full flex gap-1 p-2 border border-gray-300 rounded-md">
      <Popover open={isOpen} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={isOpen}
            className="w-full grow justify-normal border-none px-1 font-normal"
          >
            {currentTag ? currentTag.name : "Atribuir tag..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput disabled={disabled} placeholder="Nome da tag..." />
            <CommandList>
              <CommandEmpty>Tag não encontrada.</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={handleSelect}
                  >
                    {tag.name}
                    <Check className={selectClassName(tag.name)}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <MainButton
        className="shrink-0"
        type="button"
        disabled={disabled || !currentTag}
        loading={loading}
        loadingText="..."
        onClick={handleClick}
        variant="primary-stroke"
      >
        Incluir
      </MainButton>
    </div>
  )
}