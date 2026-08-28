import Image from "next/image";
import { imagePath, productLabel, type Product } from "@/lib/products";
import { WhatsAppButton } from "./WhatsAppButton";

interface ProductCardProps {
  product: Product;
  hidden: boolean;
  /** Stagger delay in seconds. */
  delay: number;
  /** Replays the pop animation when the active filter changes. */
  animationKey: string;
}

export function ProductCard({ product, hidden, delay, animationKey }: ProductCardProps) {
  return (
    <article
      key={animationKey}
      className={`card is-in ${hidden ? "is-hidden" : "is-filtering"}`}
      data-cat={product.category}
      style={
        {
          "--c1": product.accent.from,
          "--c2": product.accent.to,
          "--d": `${delay}s`,
        } as React.CSSProperties
      }
    >
      <div className="card__media">
        <Image
          src={imagePath(product)}
          alt={product.alt}
          width={1100}
          height={1100}
          sizes="(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 24vw"
        />
        {product.tag ? <span className="card__tag">{product.tag}</span> : null}
      </div>

      <div className="card__body">
        <p className="card__cat">
          {product.kind} · {product.size}
        </p>
        <h3 className="card__name">{product.name}</h3>
        <p className="card__desc">{product.description}</p>
        <ul className="card__notes">
          {product.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <WhatsAppButton product={productLabel(product)} className="btn--full">
          Buy on WhatsApp
        </WhatsAppButton>
      </div>
    </article>
  );
}
