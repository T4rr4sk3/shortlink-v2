import { getLinkGroupTreeGroupPathServer } from "@app/bin/endpoints/linkGroupTree";
import type { WithParams } from "@app/types/props";
import { dataIsApiCallError } from "@app/lib/api";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(_: NextRequest, {params}: WithParams<{id:string}>) {
  const groupPathOrError = await getLinkGroupTreeGroupPathServer(params.id)
  const isError = dataIsApiCallError(groupPathOrError)
  return NextResponse.json(groupPathOrError, { status: isError ? groupPathOrError.status : 200 })
}