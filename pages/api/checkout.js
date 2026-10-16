import fs from "fs";
import path from "path";
import Stripe from "stripe";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Parse body (Next.js parses JSON by default). If form sends urlencoded, check req.body
  const productId = req.body.productId || req.query.productId;
  const productsPath = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
  const product = products.find((p) => p.id === productId);

  if (!product) return res.status(400).json({ error: "Sản phẩm không tồn tại" });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-08-01" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: product.title,
              description: product.description
            },
            unit_amount: product.price
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/product/${product.id}`
    });

    res.writeHead(302, { Location: session.url });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi tạo checkout session" });
  }
}
