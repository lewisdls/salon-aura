import { headers } from "next/headers";

// Proxies the Yotpo Site Reviews widget CDN so the browser never calls Yotpo
// directly (avoids CORS) and the response is cached for an hour.
const YOTPO_APP_KEY =
  process.env.YOTPO_APP_KEY;

const locale = process.env.NEXT_PUBLIC_LOCALE || "es";

export async function GET() {
  const headersList = await headers();
  const locale = headersList.get("accept-language").split(',')[0] || "en";
  const url = `https://api-cdn.yotpo.com/v3/storefront/store/${YOTPO_APP_KEY}/product/yotpo_site_reviews/reviews?perPage=50&page=1&lang=${locale}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Yotpo responded with ${res.status}`);
    }

    const data = await res.json();

    const reviews = (data.reviews ?? [])
      .filter((r) => !r.deleted && r.content)
      .map((r) => ({
        id: r.id,
        score: r.score,
        title: r.title ?? "",
        content: r.content ?? "",
        name: r.user?.displayName ?? "Cliente",
        date: r.createdAt ?? null,
        verified: Boolean(r.verifiedBuyer),
      }));

    const bottomline = {
      average: data.bottomline?.averageScore ?? null,
      total: data.bottomline?.totalReview ?? reviews.length,
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
