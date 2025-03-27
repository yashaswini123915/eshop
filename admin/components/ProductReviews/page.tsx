"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Review {
  username: string;
  rating: number;
  comment: string;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [customer, setCustomer] = useState<{ username: string } | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const storedCustomer = JSON.parse(localStorage.getItem("loggedInCustomer") || "null");
    setCustomer(storedCustomer);

    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || "[]");
    setReviews(storedReviews);

    if (storedCustomer) {
      setHasReviewed(storedReviews.some((review: Review) => review.username === storedCustomer.username));
    }
  }, [productId]);

  const handleSubmit = () => {
    if (!customer) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    if (hasReviewed) {
      toast.error("You have already reviewed this product.");
      return;
    }

    if (rating < 1 || comment.trim() === "") {
      toast.error("Please provide a rating and a comment.");
      return;
    }

    const newReview: Review = { username: customer.username, rating, comment };
    const updatedReviews = [...reviews, newReview];

    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setHasReviewed(true);
    toast.success("Review submitted successfully!");
  };

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "No Ratings";

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-3">Customer Reviews</h3>
      <p className="text-gray-600">Average Rating: {averageRating} ⭐ ({reviews.length} reviews)</p>

      {customer && !hasReviewed && (
        <div className="mt-4">
          <h4 className="font-medium">Leave a Review</h4>
          <Input type="number" min="1" max="5" placeholder="Rating (1-5)" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
          <Textarea placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} className="mt-2" />
          <Button onClick={handleSubmit} className="mt-2">Submit Review</Button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {reviews.map((review, index) => (
          <div key={index} className="border p-3 rounded-lg">
            <p className="font-bold">{review.username} ⭐ {review.rating}</p>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}