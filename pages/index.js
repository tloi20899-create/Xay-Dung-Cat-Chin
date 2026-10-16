import fs from "fs";
import path from "path";
import ProductCard from "../components/ProductCard";

export default function Home({ products }) {
  return (
    <main className="container py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Xây Dựng Cát Chín</h1>
        <p className="text-gray-600">Vật tư xây dựng chất lượng — giao nhanh</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const p = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(fs.readFileSync(p, "utf8"));
  return { props: { products } };
}
