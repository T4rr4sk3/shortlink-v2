import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getLinkTagsServer } from "@app/bin/endpoints/linkTag";
import { dataIsApiCallError } from "@app/lib/api";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || undefined
  const tagsOrError = await getLinkTagsServer(name)
  const isError = dataIsApiCallError(tagsOrError)
  return NextResponse.json(tagsOrError, { status: isError ? tagsOrError.status : 200 })
}