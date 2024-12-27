import CloseIcon from "@app/components/icons/close"
import { getLuminosity } from "@app/lib/utils"

type TagLike = { color: string, name: string, links?: number }
interface FormTagProps {
  tag: TagLike,
  onRemove?: () => void,
}
export default function CreateLinkFormTag({ tag, onRemove }: FormTagProps) {
  const label = "Remover tag " + tag.name
  const luminosity = getLuminosity(tag.color)
  const textColor = luminosity > 0.6 ? "#000" : "#FFF"
  return(
    <div className="rounded-lg px-2 py-1 inline-flex items-center" style={{ backgroundColor: tag.color, color: textColor }}>
      <span> {tag.name} {tag.links ? `(${tag.links})` : ""} </span>
      {onRemove &&
        <CloseIcon
          className="size-5 ml-1 cursor-pointer"
          onClick={onRemove}
          aria-label={label}
          role="button"
        />
      }
    </div>
  )
}