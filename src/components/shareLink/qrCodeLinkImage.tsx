import { apiUrl } from "@app/lib/api";
import Image from "next/image";

export default function QRCodeLinkImage({ code }: { code: string }) {
  const width = 128
  const apiUrlSrc = `${apiUrl}/${code}/qrcode?width=${width}`

  return(
    <Image
      className="aspect-square"
      width={width}
      height={width}
      alt="Link QRcode"
      src={apiUrlSrc}
    />
  )
}