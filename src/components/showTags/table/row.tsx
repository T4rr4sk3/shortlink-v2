import { TableCell, TableRow } from "@app/components/ui/table";
import type { GetTagsReturn } from "@app/types/api/tag";

/** @deprecated */
export default function ShowTagsTableRow({ tag }: { tag: GetTagsReturn }) {
  const formattedDate = new Date(tag.createdAt)

  return(
    <TableRow key={tag.id}>
      <TableCell className="font-medium text-right">{tag.id}</TableCell>
      <TableCell>{tag.name}</TableCell>
      <TableCell>
        <div className="w-16 h-full text-transparent rounded-lg" style={{ backgroundColor: tag.color }}>
          {tag.color}
        </div>
      </TableCell>
      <TableCell className="text-right">{formattedDate.toLocaleString()}</TableCell>
    </TableRow>
  )
}