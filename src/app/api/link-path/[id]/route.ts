import { getLinkGroupTreeLinkPathServer } from "@app/bin/endpoints/linkGroupTree";
import type { WithParams } from "@app/types/props";
import { dataIsApiCallError } from "@app/lib/api";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_: NextRequest, {params}: WithParams<{id:string}>) {
  const linkPathOrError = await getLinkGroupTreeLinkPathServer(params.id)
  const isError = dataIsApiCallError(linkPathOrError)
  return NextResponse.json(linkPathOrError, { status: isError ? linkPathOrError.status : 200 })
}