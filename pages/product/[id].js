import fs from "fs";
import path from "path";
import { loadStripe } from "@stripe/stripe-js";

export default function ProductPage({ product }) {
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <img className="md:col-span-1 rounded" src={product.image} alt={product.title} />
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-2">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">{product.price.toLocaleString()} {product.currency}</p>
          <form action="/api/checkout" method="POST" className="mt-6">
            <input type="hidden" name="productId" value={product.id} />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Mua ngay (Stripe)</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const p = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(fs.readFileSync(p, "utf8"));
  const paths = products.map((prd) => ({ params: { id: prd.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const p = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(fs.readFileSync(p, "utf8"));
  const product = products.find((x) => x.id === params.id) || null;
  return { props: { product } };
}
