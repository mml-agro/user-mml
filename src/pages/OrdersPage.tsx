import React, { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getOrdersAPI, postReviewsAPI } from '../service' // adjust path
import { Package, ChevronLeft, ChevronRight, Tag, X, Star } from 'lucide-react'

// ── Types ────────────────────────────────────────────────────────────────────
interface ReviewInfo {
  id: string
  customerName: string
  productName: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  status: string
  adminReply: string | null
  createdAt: string
}

interface OrderItem {
  id: string
  productId: string
  productName: string
  productEmoji: string
  size: string
  quantity: number
  unitPrice: number
  totalPrice: number
  review: ReviewInfo | null
}

interface Order {
  id: string
  orderNumber: string
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentMethod: string
  paymentStatus: string
  subtotal: number
  deliveryCharge: number
  discountAmount: number
  totalAmount: number
  couponCode: string | null
  deliveryAddress: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
  }
  createdAt: string
  shippedAt: string | null
  deliveredAt: string | null
  items: OrderItem[]
}

interface ReviewTarget {
  productId: string
  orderId: string
  productName: string
  productEmoji: string
}

// ── Status styling ────────────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING:    { label: 'Pending',    className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  CONFIRMED:  { label: 'Confirmed',  className: 'bg-blue-50 text-blue-700 border border-blue-200' },
  PROCESSING: { label: 'Processing', className: 'bg-purple-50 text-purple-700 border border-purple-200' },
  SHIPPED:    { label: 'Shipped',    className: 'bg-indigo-50 text-indigo-700 border border-indigo-200' },
  DELIVERED:  { label: 'Delivered',  className: 'bg-green-50 text-green-700 border border-green-200' },
  CANCELLED:  { label: 'Cancelled',  className: 'bg-red-50 text-red-700 border border-red-200' },
}

const formatSize = (size: string) => size.replace('SIZE_', '')

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

const PAGE_SIZE = 10

// ── Component ─────────────────────────────────────────────────────────────────
const OrdersPage: React.FC = () => {
  const { user, isLoading: authLoading } = useAuth()
  const navigate = useNavigate()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalElements, setTotalElements] = useState(0)

  // ── Review modal state ───────────────────────────────────────────────────
  const [reviewTarget, setReviewTarget] = useState<ReviewTarget | null>(null)
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewComment, setReviewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState(false)

  // Redirect unauthenticated users only after auth check has finished
  useEffect(() => {
    if (!authLoading && !user) navigate('/login')
  }, [authLoading, user, navigate])

  // ── Fetch orders ────────────────────────────────────────────────────────────
  const fetchOrders = useCallback(async (p: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await getOrdersAPI(p, PAGE_SIZE)
      const data = res.data
      setOrders(data.content)
      setTotalPages(data.totalPages)
      setTotalElements(data.totalElements)
    } catch {
      setError('Failed to load orders. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) fetchOrders(page)
  }, [page, fetchOrders, user])

  // ── Review modal handlers ────────────────────────────────────────────────
  const openReviewModal = (target: ReviewTarget) => {
    setReviewTarget(target)
    setRating(5)
    setHoverRating(0)
    setReviewTitle('')
    setReviewComment('')
    setReviewError('')
    setReviewSuccess(false)
  }

  const closeReviewModal = () => {
    setReviewTarget(null)
  }

  const handleSubmitReview = async () => {
    if (!reviewTarget) return

    if (!reviewTitle.trim() || !reviewComment.trim()) {
      setReviewError('Please fill in all fields')
      return
    }

    setSubmitting(true)
    setReviewError('')

    try {
      await postReviewsAPI({
        productId: reviewTarget.productId,
        orderId: reviewTarget.orderId,
        rating,
        title: reviewTitle.trim(),
        comment: reviewComment.trim(),
      })
      setReviewSuccess(true)
      setTimeout(() => {
        closeReviewModal()
        fetchOrders(page) // refresh to show the new review
      }, 1200)
    } catch (e) {
      setReviewError('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // While auth is initializing, or if there's no user (about to redirect), render nothing
  if (authLoading || !user) return null

  // ── Skeleton loader ─────────────────────────────────────────────────────────
  const Skeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gold-100 animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-100 rounded-lg" />
              <div className="h-3 w-24 bg-gray-100 rounded-lg" />
            </div>
            <div className="h-6 w-20 bg-gray-100 rounded-full" />
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="h-4 w-48 bg-gray-100 rounded-lg" />
            <div className="h-4 w-36 bg-gray-100 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl font-black text-gray-900">
              My Orders
            </h1>
            {!loading && totalElements > 0 && (
              <p className="font-body text-sm text-gray-400 mt-1">
                {totalElements} order{totalElements !== 1 ? 's' : ''} placed
              </p>
            )}
          </div>
          <Link to="/account" className="font-body text-sm text-gold-600 hover:text-gold-800">
            ← My Account
          </Link>
        </div>

        {/* Loading */}
        {loading && <Skeleton />}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="font-body text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => fetchOrders(page)}
              className="btn-primary px-6 py-3"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="font-body text-gray-500 mb-6">Start shopping to see your orders here</p>
            <Link to="/shop" className="btn-primary">Shop Now</Link>
          </div>
        )}

        {/* Order list */}
        {!loading && !error && orders.length > 0 && (
          <>
            <div className="space-y-4">
              {orders.map(order => {
                const status = statusConfig[order.status] ?? { label: order.status, className: 'bg-gray-100 text-gray-600' }

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gold-100 hover:border-gold-300 hover:shadow-md transition-all"
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          style={{ fontFamily: "'Playfair Display',serif" }}
                          className="font-bold text-gray-900 text-lg"
                        >
                          {order.orderNumber}
                        </h3>
                        <p className="font-body text-sm text-gray-400 mt-0.5">
                          {formatDate(order.createdAt)}
                        </p>
                        <p className="font-body text-xs text-gray-400 mt-0.5">
                          {order.deliveryAddress.city}, {order.deliveryAddress.state}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-body font-bold ${status.className}`}>
                          {status.label}
                        </span>
                        <span className="text-xs font-body text-gray-400">
                          {order.paymentMethod} · {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="border-t border-gray-100 pt-4 mb-4">
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{item.productEmoji}</span>
                              <div>
                                <p className="font-body text-sm text-gray-800 font-medium">
                                  {item.productName}
                                </p>
                                <p className="font-body text-xs text-gray-400">
                                  {formatSize(item.size)} × {item.quantity}
                                </p>

                                {order.status === 'DELIVERED' && (
                                  item.review ? (
                                    <div className="mt-1.5 bg-gray-50 rounded-lg px-2.5 py-1.5 max-w-xs">
                                      <div className="flex items-center gap-1 mb-0.5">
                                        {[1, 2, 3, 4, 5].map(i => (
                                          <Star
                                            key={i}
                                            size={11}
                                            fill={i <= item.review!.rating ? '#f59e0b' : 'none'}
                                            stroke={i <= item.review!.rating ? '#f59e0b' : '#d1d5db'}
                                          />
                                        ))}
                                        {item.review.title && (
                                          <span className="font-body text-xs font-semibold text-gray-700 ml-1">
                                            {item.review.title}
                                          </span>
                                        )}
                                      </div>
                                      {item.review.comment && (
                                        <p className="font-body text-xs text-gray-500 line-clamp-2">
                                          {item.review.comment}
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => openReviewModal({
                                        productId: item.productId,
                                        orderId: order.id,
                                        productName: item.productName,
                                        productEmoji: item.productEmoji,
                                      })}
                                      className="font-body text-xs text-gold-600 hover:text-gold-800 mt-1 underline-offset-2 hover:underline"
                                    >
                                      Write a review
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                            <span className="font-body text-sm text-gray-700 font-semibold">
                              ₹{item.totalPrice.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price breakdown + coupon */}
                    <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4 space-y-1.5">
                      <div className="flex justify-between font-body text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal.toLocaleString()}</span>
                      </div>
                      {order.deliveryCharge > 0 && (
                        <div className="flex justify-between font-body text-sm text-gray-500">
                          <span>Delivery</span>
                          <span>₹{order.deliveryCharge}</span>
                        </div>
                      )}
                      {order.discountAmount > 0 && (
                        <div className="flex justify-between font-body text-sm text-green-600">
                          <span className="flex items-center gap-1">
                            <Tag size={12} />
                            {order.couponCode ? `Coupon (${order.couponCode})` : 'Discount'}
                          </span>
                          <span>− ₹{order.discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-gray-900">
                        <span
                          style={{ fontFamily: "'Playfair Display',serif" }}
                          className="text-sm"
                        >
                          Total
                        </span>
                        <span
                          style={{ fontFamily: "'Playfair Display',serif" }}
                          className="text-base text-gold-700"
                        >
                          ₹{order.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button className="px-4 py-2 rounded-xl text-xs font-body font-semibold bg-gold-50 text-gold-700 hover:bg-gold-100 transition-colors">
                        Track Order
                      </button>
                      {order.status === 'DELIVERED' && (
                        <button className="px-4 py-2 rounded-xl text-xs font-body font-semibold bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                          Reorder
                        </button>
                      )}
                      <button className="px-4 py-2 rounded-xl text-xs font-body font-semibold bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                        Invoice
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl font-body text-sm font-semibold bg-white border border-gold-200 text-gold-700 hover:bg-gold-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={15} /> Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`w-8 h-8 rounded-lg font-body text-sm font-semibold transition-colors ${
                        i === page
                          ? 'bg-gold-500 text-white'
                          : 'bg-white border border-gold-200 text-gold-700 hover:bg-gold-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl font-body text-sm font-semibold bg-white border border-gold-200 text-gold-700 hover:bg-gold-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight size={15} />
                </button>
              </div>
            )}
          </>
        )}

      </div>

      {/* ── Review Modal ─────────────────────────────────────────────────────── */}
      {reviewTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative">
            <button
              onClick={closeReviewModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{reviewTarget.productEmoji}</span>
              <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900">
                Write a Review
              </h3>
            </div>
            <p className="font-body text-sm text-gray-400 mb-4">{reviewTarget.productName}</p>

            {reviewSuccess ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">✅</div>
                <p className="font-body text-gray-700 font-semibold">Thanks for your review!</p>
              </div>
            ) : (
              <>
                {/* Rating */}
                <div className="mb-4">
                  <label className="font-body text-sm font-semibold text-gray-700 mb-2 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i)}
                        onMouseEnter={() => setHoverRating(i)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          size={28}
                          fill={i <= (hoverRating || rating) ? '#f59e0b' : 'none'}
                          stroke={i <= (hoverRating || rating) ? '#f59e0b' : '#d1d5db'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label className="font-body text-sm font-semibold text-gray-700 mb-2 block">Title</label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={e => setReviewTitle(e.target.value)}
                    placeholder="Sum up your experience"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:border-gold-400"
                  />
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="font-body text-sm font-semibold text-gray-700 mb-2 block">Review</label>
                  <textarea
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Tell us more about your experience"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 font-body text-sm focus:outline-none focus:border-gold-400 resize-none"
                  />
                </div>

                {reviewError && <p className="font-body text-sm text-red-500 mb-3">{reviewError}</p>}

                <button
                  onClick={handleSubmitReview}
                  disabled={submitting}
                  className="w-full btn-primary py-3 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersPage