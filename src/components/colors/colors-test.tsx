import { cn } from "@app/lib/utils"

export default function ColorsTest() {
  const ColorBox = ({className}: {className:string}) => (
    <div className={cn("h-6 w-6", className)}></div>
  )

  return(
    <div className="bg-gray-400 grid grid-cols-3 grid-flow-row max-w-screen-sm p-2">
      {/* Common */}
      <ColorBox className="bg-common-branco" />
      <ColorBox className="bg-common-preto" />
      <ColorBox className="" />
      {/* Cinza Fumaça */}
      <ColorBox className="bg-cinza-fumaca-light" />
      <ColorBox className="bg-cinza-fumaca-main" />
      <ColorBox className="bg-cinza-fumaca-dark" />
      {/* Primary */}
      <ColorBox className="bg-primary-light" />
      <ColorBox className="bg-primary-main" />
      <ColorBox className="bg-primary-dark" />
      {/* Secondary */}
      <ColorBox className="bg-secondary-light" />
      <ColorBox className="bg-secondary-main" />
      <ColorBox className="bg-secondary-dark" />
    </div>
  )
}