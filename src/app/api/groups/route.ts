import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dataIsApiCallError } from "@app/lib/api";
import { getLinkGroupsServer } from "@app/bin/endpoints/linkGroup";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || undefined
  const groupsOrError = await getLinkGroupsServer(name)
  const isError = dataIsApiCallError(groupsOrError)
  return NextResponse.json(groupsOrError, { status: isError ? groupsOrError.status : 200 })
}