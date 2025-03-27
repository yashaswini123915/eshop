import ProductReviews from "@/components/ProductReviews/page";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Product {productId}</h1>

      {/* Product Details Section */}
      <p>Product description and details go here...</p>

      {/* Product Reviews Section */}
      <ProductReviews productId={productId} />
    </div>
  );
}
