// TEMPORARY diagnostic endpoint — remove once the DATABASE_URL wiring issue
// is confirmed fixed. Reports presence (never values) of the candidate
// connection-string env vars plus deployment identity, so we can tell
// definitively what the live function sees without guessing via redeploys.

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      hasDATABASE_URL: !!process.env.DATABASE_URL,
      hasPOSTGRES_URL: !!process.env.POSTGRES_URL,
      hasNEON_DATABASE_URL: !!process.env.NEON_DATABASE_URL,
      hasDATABASE_URL_UNPOOLED: !!process.env.DATABASE_URL_UNPOOLED,
      hasPOSTGRES_URL_NON_POOLING: !!process.env.POSTGRES_URL_NON_POOLING,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      gitSha: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
