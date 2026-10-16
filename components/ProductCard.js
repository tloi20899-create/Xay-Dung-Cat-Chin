export default function ProductCard({ p }) {
  return (
    <div className="border rounded p-4 flex flex-col bg-white">
      <img src={p.image} alt={p.title} className="h-40 w-full object-cover mb-3 rounded" />
      <h3 className="font-semibold text-lg">{p.title}</h3>
      <p className="text-sm text-gray-600 flex-1">{p.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">{p.price.toLocaleString()} {p.currency}</span>
        <a href={`/product/${p.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Xem</a>
      </div>
    </div>
  );
}
