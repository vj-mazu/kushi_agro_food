"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildCatalogProducts,
  CATALOG_STORAGE_KEY,
  defaultCatalog,
} from "../catalog-data";

function normalizeImages(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminCatalogPage() {
  const [catalog, setCatalog] = useState(defaultCatalog);
  const [selectedId, setSelectedId] = useState(defaultCatalog[0]?.id ?? "");
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      const savedCatalog = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (savedCatalog) {
        const parsed = JSON.parse(savedCatalog);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCatalog(parsed);
          setSelectedId(parsed[0].id);
        }
      }
    } catch {}
  }, []);

  const selectedProduct = useMemo(
    () => catalog.find((item) => item.id === selectedId) ?? catalog[0],
    [catalog, selectedId],
  );

  const updateSelected = (field, value) => {
    setCatalog((current) =>
      current.map((item) =>
        item.id === selectedProduct.id ? { ...item, [field]: value } : item,
      ),
    );
    setStatus("");
  };

  const updateImages = (value) => {
    const images = normalizeImages(value);
    setCatalog((current) =>
      current.map((item) =>
        item.id === selectedProduct.id
          ? {
              ...item,
              images,
              coverImage: images[0] || item.coverImage,
              views: images.length || item.views,
            }
          : item,
      ),
    );
    setStatus("");
  };

  const saveCatalog = () => {
    localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
    setStatus("Catalog saved. Website product names and images are updated.");
  };

  const resetCatalog = () => {
    localStorage.removeItem(CATALOG_STORAGE_KEY);
    setCatalog(defaultCatalog);
    setSelectedId(defaultCatalog[0].id);
    setStatus("Catalog reset to default data.");
  };

  const previewProducts = buildCatalogProducts(catalog);
  const previewProduct =
    previewProducts.find((item) => item.id === selectedProduct?.id) ?? previewProducts[0];

  return (
    <div className="min-h-screen bg-[#F6F1E8] px-6 py-10 text-[#1D160E] lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#8C6A3A]">
              Catalog Admin
            </p>
            <h1
              className="mt-4 text-4xl md:text-6xl"
              style={{ fontFamily: "Instrument Serif, serif" }}
            >
              Edit product names, KG labels, colors, and images.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#5F5548]">
              This panel updates the storefront catalog in the same browser using
              the same theme. Save here, then open the main website to see the change.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveCatalog}
              className="rounded-full bg-[#1D160E] px-6 py-3 text-sm text-white transition hover:bg-[#3A2E21]"
            >
              Save Catalog
            </button>
            <button
              type="button"
              onClick={resetCatalog}
              className="rounded-full border border-[#C9B089] px-6 py-3 text-sm text-[#1D160E] transition hover:bg-[#EADCC3]"
            >
              Reset Default
            </button>
            <a
              href="/"
              className="rounded-full border border-[#C9B089] px-6 py-3 text-sm text-[#1D160E] transition hover:bg-[#EADCC3]"
            >
              Open Storefront
            </a>
          </div>
        </div>

        {status ? (
          <div className="mt-6 rounded-3xl border border-[#DCC8A4] bg-[#FFF9EF] px-5 py-4 text-sm text-[#5F5548]">
            {status}
          </div>
        ) : null}

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.42fr_0.58fr]">
          <aside className="rounded-[2rem] border border-[#E3D2B5] bg-white/90 p-5 shadow-[0_14px_40px_rgba(82,59,31,0.08)]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#8C6A3A]">
              Products
            </p>
            <div className="mt-5 space-y-3">
              {previewProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedId(product.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition ${
                    product.id === selectedId
                      ? "border-[#1D160E] bg-[#F5E8D0]"
                      : "border-[#E3D2B5] bg-[#FFFDF9] hover:bg-[#FBF2E1]"
                  }`}
                >
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-[#FAF4EA] p-2">
                    <img
                      src={product.coverImage}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="truncate text-xl text-[#1D160E]"
                      style={{ fontFamily: "Instrument Serif, serif" }}
                    >
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm text-[#5F5548]">{product.pack}</p>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          {selectedProduct ? (
            <section className="rounded-[2rem] border border-[#E3D2B5] bg-white/90 p-6 shadow-[0_14px_40px_rgba(82,59,31,0.08)]">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className={`rounded-[1.75rem] bg-gradient-to-br ${previewProduct.accent} p-[1px]`}>
                    <div className="rounded-[1.7rem] bg-white p-4">
                      <img
                        src={previewProduct.coverImage}
                        alt={previewProduct.name}
                        className="mx-auto h-auto max-h-[28rem] w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-[#FAF4EA] p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#8C6A3A]">
                      Preview
                    </p>
                    <h2
                      className="mt-2 text-3xl text-[#1D160E]"
                      style={{ fontFamily: "Instrument Serif, serif" }}
                    >
                      {previewProduct.name}
                    </h2>
                    <p className="mt-2 text-sm text-[#5F5548]">{previewProduct.pack}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.18em] text-[#8C6A3A]">
                      Brand Name
                    </label>
                    <input
                      value={selectedProduct.name}
                      onChange={(event) => updateSelected("name", event.target.value)}
                      className="w-full rounded-2xl border border-[#D8C7A7] bg-[#FFFDF9] px-4 py-3 text-base outline-none transition focus:border-[#1D160E]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.18em] text-[#8C6A3A]">
                      Subtitle
                    </label>
                    <input
                      value={selectedProduct.tagline}
                      onChange={(event) => updateSelected("tagline", event.target.value)}
                      className="w-full rounded-2xl border border-[#D8C7A7] bg-[#FFFDF9] px-4 py-3 text-base outline-none transition focus:border-[#1D160E]"
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm uppercase tracking-[0.18em] text-[#8C6A3A]">
                        Pack Size
                      </label>
                      <input
                        value={selectedProduct.pack}
                        onChange={(event) => updateSelected("pack", event.target.value)}
                        className="w-full rounded-2xl border border-[#D8C7A7] bg-[#FFFDF9] px-4 py-3 text-base outline-none transition focus:border-[#1D160E]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm uppercase tracking-[0.18em] text-[#8C6A3A]">
                        Accent Gradient
                      </label>
                      <input
                        value={selectedProduct.accent}
                        onChange={(event) => updateSelected("accent", event.target.value)}
                        className="w-full rounded-2xl border border-[#D8C7A7] bg-[#FFFDF9] px-4 py-3 text-base outline-none transition focus:border-[#1D160E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.18em] text-[#8C6A3A]">
                      Images
                    </label>
                    <textarea
                      value={previewProduct.images.join("\n")}
                      onChange={(event) => updateImages(event.target.value)}
                      rows={10}
                      className="w-full rounded-2xl border border-[#D8C7A7] bg-[#FFFDF9] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#1D160E]"
                    />
                    <p className="mt-2 text-xs text-[#5F5548]">
                      Put one image URL or local public path per line. The first line becomes the cover image.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
