// Example API: list products (use DB in production)
import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const p = path.join(process.cwd(), "data", "products.json");
  const products = JSON.parse(fs.readFileSync(p, "utf8"));
  res.status(200).json(products);
}
