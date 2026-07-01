// Lightweight health endpoint. Referenced as the `status` link of the API
// catalog (/.well-known/api-catalog) so agents can programmatically check that
// the site is up.

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      service: "buvijon-web",
      time: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
