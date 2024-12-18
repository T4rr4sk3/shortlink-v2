import { getLinksServer } from "@app/bin/endpoints/link";
import { dataIsApiCallError } from "@app/lib/api";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || undefined
  const tag = request.nextUrl.searchParams.get("tag") || undefined
  const linksOrError = await getLinksServer({ name, tag })
  const isError = dataIsApiCallError(linksOrError)
  return NextResponse.json(linksOrError, { status: isError ? linksOrError.status : 200 })
}