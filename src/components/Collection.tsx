"use client";

import { useState } from "react";
import { categoryFilters, products, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "./Reveal";

type Filter = Category | "all";

export function Collection() {
  const [active, setActive] = useState<Filter>("all");

  const visible = products.filter((p) => active === "all" || p.category === active);

  return (
    <section className="collection" id="collection">
      <div className="shell">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            The Collection
          </p>
          <h2 className="section-title">
            Eleven ways to <em className="grad-gold">come back to yourself</em>
          </h2>
          <p className="section-sub">
            Tap any product to start a WhatsApp chat — we&rsquo;ll confirm price, size and delivery
            in a message.
          </p>
        </Reveal>

        <Reveal className="filters">
          <div role="tablist" aria-label="Filter products by category" className="filters__row">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active === filter.id}
                className={`chip ${active === filter.id ? "is-active" : ""}`}
                onClick={() => setActive(filter.id)}
              >
                {filter.label} <span>{filter.count}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid" id="grid">
          {products.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              hidden={!visible.includes(product)}
              delay={(i % 4) * 0.07}
              animationKey={`${product.slug}-${active}`}
            />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="grid__empty">Nothing in this category yet — try another filter.</p>
        ) : null}
      </div>
    </section>
  );
}
