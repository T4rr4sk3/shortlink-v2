"use client"
import { dataIsApiCallError, getApiCallErrorMessage } from "@app/lib/api";
import ComboboxControl from "@app/components/forms/comboboxControl";
import { getLinkGroupsClient } from "@app/bin/endpoints/linkGroup";
import type { GetGroupsReturn } from "@app/types/api/group";
import { useLoading } from "@app/hooks/use-loading";
import { toast } from "@app/hooks/use-toast";
import type { ComponentProps} from "react";
import { useEffect, useState } from "react";

type GroupSelectProps = Omit<ComponentProps<typeof ComboboxControl>, "options" | "placeholder">
/** @deprecated Use `LinkGroupComboboxControl` instead */
export default function CreateGroupFormGroupSelect(props: GroupSelectProps) {
  const [groups, setGroups] = useState<GetGroupsReturn[]>([])
  const { loading, offLoading, onLoading } = useLoading(true)

  useEffect(() => {
    onLoading()
    getLinkGroupsClient().then((data) => {
      if(dataIsApiCallError(data)) {
        const message = getApiCallErrorMessage(data, "Buscar grupos")
        toast({ description: message, variant: "error" })
      } else setGroups(data)
    })
    .finally(offLoading)
  }, [offLoading, onLoading])

  const options = groups.map((group) => ({ label: group.name + ` (${group.links})`, value: group.id.toString() }))

  return(
    <ComboboxControl
      options={options}
      loading={loading}
      placeholder="Grupo pai..."
      emptyMessage="Nenhum grupo encontrado"
      searchPlaceholder="Buscar grupo..."
      emptyLabel="Nenhum"
      emptyValue={null}
      {...props}
    />
  )
}