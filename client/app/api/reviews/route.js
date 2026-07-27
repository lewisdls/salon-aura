// Proxies the Yotpo Site Reviews widget CDN so the browser never calls Yotpo
// directly (avoids CORS) and the response is cached for an hour.
const YOTPO_APP_KEY =
  process.env.YOTPO_APP_KEY || "3FWcB1j854hQP82lPpICdcbE0ZZoV7vsrBYi6osG";

export async function GET() {
  const url = `https://api-cdn.yotpo.com/v1/widget/${YOTPO_APP_KEY}/products/yotpo_site_reviews/reviews.json?per_page=50&page=1`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Yotpo responded with ${res.status}`);
    }

    const data = await res.json();
    const response = data?.response ?? {};

    const reviews = (response.reviews ?? [])
      .filter((r) => !r.deleted && r.content)
      .map((r) => ({
        id: r.id,
        score: r.score,
        title: r.title ?? "",
        content: r.content ?? "",
        name: r.user?.display_name ?? "Cliente",
        date: r.created_at ?? null,
        verified: Boolean(r.verified_buyer),
      }));

    const bottomline = {
      average: response.bottomline?.average_score ?? null,
      total: response.bottomline?.total_review ?? reviews.length,
    };

    return new Response(JSON.stringify({ reviews, bottomline }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching Yotpo reviews:", error);
    return new Response(
      JSON.stringify({ reviews: [], bottomline: null, error: "Failed to fetch reviews." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
