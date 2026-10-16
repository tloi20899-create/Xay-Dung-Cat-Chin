# Xây Dựng Cát Chín — Starter

Đây là starter Next.js + Tailwind cho cửa hàng bán vật liệu xây dựng (landing + catalog + Stripe Checkout demo).

Quick start

1. Clone repo
   git clone https://github.com/tloi20899-create/Xay-Dung-Cat-Chin.git
2. Cài dependencies
   npm install
3. Tạo file `.env.local` (xem `.env.example`)
4. Chạy dev
   npm run dev

Environment variables (.env.local)

NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_xxx

Notes
- Ảnh sản phẩm đang tham chiếu trong /public/images — bạn có thể thêm ảnh thực tế vào thư mục public/images
- Đây là demo: dữ liệu sản phẩm lưu trong `data/products.json`. Để production, chuyển sang DB (Postgres/MongoDB) và dùng webhooks của Stripe để lưu đơn hàng.

Next steps I can help with:
- Thêm giỏ hàng client-side, lưu đơn hàng vào DB, tạo trang admin
- Cấu hình Vercel deploy tự động
- Tích hợp thanh toán địa phương (Momo/ZaloPay) hoặc COD
