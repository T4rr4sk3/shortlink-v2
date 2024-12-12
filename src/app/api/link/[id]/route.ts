import { type NextRequest, NextResponse } from "next/server";
import { getLinkByIdServer } from "@app/bin/endpoints/link";
import type { WithParams } from "@app/types/props";
import { dataIsApiCallError } from "@app/lib/api";

export async function GET(_: NextRequest, { params }: WithParams<{ id: string }>) {
  const linkOrError = await getLinkByIdServer(params.id)
  const isError = dataIsApiCallError(linkOrError)
  return NextResponse.json(linkOrError, { status: isError ? linkOrError.status : 200 })
}