import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@app/components/ui/table";
import type { GetLinkReturn } from "@app/types/api/link";
import { linkGroupHref } from "@app/lib/link";
import GroupIcon from "@app/components/icons/group";
import LinkIcon from "@app/components/icons/link";
import { useActions } from "@app/hooks/use-actions";

interface Props { result: GetLinkReturn[], searchName: string }
export default function ShowLinksSearchModalResult({ result, searchName }: Props) {
  const { callAction } = useActions()
  function closeModal() { callAction("close") }
  return(
    <div className="relative w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 text-right">ID</TableHead>
            <TableHead className="w-48">Nome</TableHead>
            <TableHead className="w-48">Grupo</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!result.length &&
            <TableRow>
              <TableCell colSpan={3}>Sem resultados.</TableCell>
            </TableRow>
          }
          {result.map((link) => (
            <TableRowLink
              key={link.id} link={link}
              closeModal={closeModal}
              searchName={searchName}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface RowProps { link: GetLinkReturn, searchName: string, closeModal: () => void }
function TableRowLink({ link: { id, name, linkGroup: group }, searchName, closeModal }: RowProps) {
  const groupName = group ? group.name : "ROOT"
  const linkHref = group ? linkGroupHref(group.id, searchName) : "/show-links"
  const iconClassName = "size-6 mr-2 text-cinza-fumaca-main"
  return(
    <TableRow>
      <TableCell className="text-right">{id}</TableCell>
      <TableCell>
        <div title={name} className="flex items-center">
          <LinkIcon className={iconClassName} />
          <p className="truncate max-w-44">{name}</p>
        </div>
      </TableCell>
      <TableCell>
        <Link className="underline flex items-center" title={groupName} href={linkHref} onClick={closeModal}>
          <GroupIcon className={iconClassName} />
          <p className="truncate max-w-44">{groupName}</p>
        </Link>
      </TableCell>
    </TableRow>
  )
}