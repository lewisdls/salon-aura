"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa6";

const Stars = ({ score = 5 }) => (
  <div
    className="flex gap-0.5 text-oxblood"
    role="img"
    aria-label={`${score} de 5 estrellas`}
  >
    {[1, 2, 3, 4, 5].map((n) =>
      n <= score ? <FaStar key={n} /> : <FaRegStar key={n} />
    )}
  </div>
);

const ReviewCard = ({ review }) => (
  <figure className="flex w-[300px] shrink-0 flex-col gap-4 rounded-4xl bg-white p-7 shadow-soft sm:w-[360px] h-full">
    <Stars score={review.score} />
    {review.title && (
      <figcaption className="text-lg font-semibold leading-snug text-ink">
        {review.title}
      </figcaption>
    )}
    <blockquote className="flex-1 leading-relaxed text-ink-soft">
      “{review.content}”
    </blockquote>
    <div className="flex items-center gap-3 pt-2">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-rose text-sm font-semibold text-oxblood">
        {review.name?.trim()?.charAt(0)?.toUpperCase() || "A"}
      </span>
      <div className="leading-tight">
        <p className="font-medium text-ink">{review.name}</p>
        {review.verified && (
          <p className="text-xs text-ink-soft">Cliente verificado</p>
        )}
      </div>
    </div>
  </figure>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [bottomline, setBottomline] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
        setBottomline(data.bottomline ?? null);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

  // Build a base set wide enough to fill the viewport, then duplicate it once
  // so the -50% marquee translation loops seamlessly.
  const base = [];
  while (base.length < Math.max(reviews.length, 6)) base.push(...reviews);
  const track = [...base, ...base];

  const average = bottomline?.average
    ? Number(bottomline.average).toFixed(1).replace(/\.0$/, "")
    : null;

  return (
    <section
      id="resenas"
      className="warm-grain overflow-hidden bg-cream-deep py-[var(--section-y)]"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="kicker">Reseñas</span>
            <h2 className="mt-4 text-headline font-semibold text-ink">
              Lo que dicen nuestras clientas
            </h2>
          </div>
          {average && (
            <div className="flex items-center gap-3">
              <Stars score={Math.round(bottomline.average)} />
              <p className="text-ink">
                <span className="text-xl font-semibold">{average}</span>
                <span className="text-ink-soft">
                  {" "}
                  · {bottomline.total} reseñas
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      {reduce ? (
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-4">
          {reviews.map((review) => (
            <div key={review.id} className="snap-start">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="group relative mt-16"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <ul className="flex w-max h-full gap-6 animate-marquee group-hover:[animation-play-state:paused]">
            {track.map((review, i) => (
              <li key={`${review.id}-${i}`} aria-hidden={i >= base.length}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Reviews;
