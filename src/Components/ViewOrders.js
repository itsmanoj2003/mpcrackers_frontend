import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./ViewOrders.css";
import { useNavigate } from "react-router-dom";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatCurrency = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

// Icons kept as small inline SVGs so the page has zero extra icon-library dependency.
const Icon = ({ name }) => {
  const paths = {
    user: "M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z",
    phone:
      "M6.6 10.8c1.3 2.6 3.5 4.8 6.1 6.1l2-2a1 1 0 011-.2c1.1.4 2.3.6 3.3.6a1 1 0 011 1v3.3a1 1 0 01-1 1C10.4 20.6 3.4 13.6 3.4 4.9a1 1 0 011-1H7.7a1 1 0 011 1c0 1.1.2 2.3.6 3.3a1 1 0 01-.2 1z",
    pin: "M12 2a7 7 0 00-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z",
    building:
      "M4 21V4a1 1 0 011-1h6a1 1 0 011 1v17M4 21h16M13 21V9a1 1 0 011-1h5a1 1 0 011 1v12M7 7h2M7 11h2M7 15h2",
    map: "M9 20l-6-3V4l6 3 6-3 6 3v13l-6-3-6 3zm0-13v13m6-16v13",
  };
  return (
    <svg
      className="vo-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.pin} />
    </svg>
  );
};

const StatusBadge = ({ status = "Pending" }) => (
  <span className={`vo-badge vo-badge-${status.toLowerCase()}`}>{status}</span>
);

const SkeletonCard = () => (
  <div className="vo-card vo-skeleton" aria-hidden="true">
    <div className="vo-skel-line vo-skel-w40" />
    <div className="vo-skel-line vo-skel-w60" />
    <div className="vo-skel-grid">
      <div className="vo-skel-block" />
      <div className="vo-skel-block" />
    </div>
    <div className="vo-skel-line vo-skel-w100" />
    <div className="vo-skel-line vo-skel-w100" />
  </div>
);

const EmptyState = () => (
  <div className="vo-empty">
    <svg
      className="vo-empty-illustration"
      viewBox="0 0 200 160"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="140" rx="70" ry="10" fill="var(--secondary)" opacity="0.12" />
      <rect x="55" y="60" width="90" height="65" rx="12" fill="var(--light)" stroke="var(--secondary)" strokeWidth="2" />
      <path d="M55 85h90" stroke="var(--secondary)" strokeWidth="2" opacity="0.5" />
      <circle cx="75" cy="72" r="4" fill="var(--secondary)" />
      <circle cx="90" cy="72" r="4" fill="var(--primary)" />
      <path d="M100 30l6 14 15 2-11 10 3 15-13-7-13 7 3-15-11-10 15-2z" fill="var(--secondary)" />
    </svg>
    <h3>No Orders Found</h3>
    <p>New customer orders will appear here as soon as they come in.</p>
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="vo-error" role="alert">
    <svg viewBox="0 0 24 24" className="vo-error-icon" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v6M12 16.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <p>Unable to load orders. Please try again.</p>
    <button className="vo-btn vo-btn-primary" onClick={onRetry}>
      Retry
    </button>
  </div>
);

const ProductTable = ({ items = [] }) => (
  <div className="vo-table-wrap">
    <table className="vo-table" aria-label="Order products">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => (
          <tr key={item.productId || idx} className={idx % 2 === 0 ? "vo-row-even" : "vo-row-odd"}>
            <td data-label="Product Name">{item.productName}</td>
            <td data-label="Price">{formatCurrency(item.price)}</td>
            <td data-label="Quantity">{item.quantity}</td>
            <td data-label="Subtotal">{formatCurrency(item.subtotal)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const OrderCard = ({ order, onView, onDeleteRequest, onMarkDelivered, onPrint }) => {
  const orderIdShort = order._id || "N/A";

  return (
    <article className="vo-card vo-fade-in" aria-label={`Order ${orderIdShort}`}>
      <header className="vo-card-top">
        <div>
          <p className="vo-order-id">Order #{orderIdShort}</p>
          <p className="vo-order-meta">
            {formatDate(order.createdAt)} &middot; {formatTime(order.createdAt)}
          </p>
        </div>
        <StatusBadge status={order.status || "Pending"} />
      </header>

      <div className="vo-customer-grid">
        <div className="vo-field">
          <Icon name="user" />
          <span>{order.name}</span>
        </div>
        <div className="vo-field">
          <Icon name="phone" />
          <span>{order.mobile}</span>
        </div>
        <div className="vo-field vo-field-wide">
          <Icon name="pin" />
          <span>{order.address}</span>
        </div>
        <div className="vo-field">
          <Icon name="building" />
          <span>
            {order.city}, {order.district}
          </span>
        </div>
        <div className="vo-field">
          <Icon name="map" />
          <span>
            {order.state} - {order.pincode}
          </span>
        </div>
      </div>

      <div className="vo-field vo-field-wide">
        <Icon name="upi" />
        <span>UPI ID: {order.paymentId}</span>
      </div>

      <ProductTable items={order.items} />

      <div className="vo-summary">
        <div className="vo-summary-item">
          <span className="vo-summary-label">Total Products</span>
          <span className="vo-summary-value">{order.totalItems}</span>
        </div>
        <div className="vo-summary-item">
          <span className="vo-summary-label">Total Quantity</span>
          <span className="vo-summary-value">{order.totalQuantity}</span>
        </div>
        <div className="vo-summary-item vo-summary-grand">
          <span className="vo-summary-label">Grand Total</span>
          <span className="vo-summary-value">{formatCurrency(order.grandTotal)}</span>
        </div>
      </div>

      <div className="vo-actions">
        <button className="vo-btn vo-btn-outline" onClick={() => onView(order)}>
          View Details
        </button>
        <button className="vo-btn vo-btn-outline" onClick={() => onPrint(order)}>
          Print Invoice
        </button>
        <button className="vo-btn vo-btn-secondary" onClick={() => onMarkDelivered(order)}>
          Mark as Delivered
        </button>
        <button className="vo-btn vo-btn-danger" onClick={() => onDeleteRequest(order)}>
          Delete Order
        </button>
      </div>
    </article>
  );
};

const DetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  const orderIdShort = order._id ? order._id.slice(-8).toUpperCase() : "N/A";
  return (
    <div className="vo-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="vo-details-title" onClick={onClose}>
      <div className="vo-modal" onClick={(e) => e.stopPropagation()}>
        <button className="vo-modal-close" onClick={onClose} aria-label="Close details">
          &times;
        </button>
        <h2 id="vo-details-title">Order #{orderIdShort}</h2>
        <p className="vo-order-meta">
          {formatDate(order.createdAt)} &middot; {formatTime(order.createdAt)}
        </p>
        <div className="vo-customer-grid">
          <div className="vo-field">
            <Icon name="user" />
            <span>{order.name}</span>
          </div>
          <div className="vo-field">
            <Icon name="phone" />
            <span>{order.mobile}</span>
          </div>
          <div className="vo-field vo-field-wide">
            <Icon name="pin" />
            <span>{order.address}</span>
          </div>
          <div className="vo-field">
            <Icon name="building" />
            <span>
              {order.city}, {order.district}
            </span>
          </div>
          <div className="vo-field">
            <Icon name="map" />
            <span>
              {order.state} - {order.pincode}
            </span>
          </div>

          <div className="vo-field vo-field-wide">
            <Icon name="upi" />
            <span>UPI ID: {order.paymentId}</span>
          </div>
        </div>
        <ProductTable items={order.items} />
        <div className="vo-summary">
          <div className="vo-summary-item">
            <span className="vo-summary-label">Total Products</span>
            <span className="vo-summary-value">{order.totalItems}</span>
          </div>
          <div className="vo-summary-item">
            <span className="vo-summary-label">Total Quantity</span>
            <span className="vo-summary-value">{order.totalQuantity}</span>
          </div>
          <div className="vo-summary-item vo-summary-grand">
            <span className="vo-summary-label">Grand Total</span>
            <span className="vo-summary-value">{formatCurrency(order.grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteConfirmModal = ({ order, onCancel, onConfirm }) => {
  if (!order) return null;
  const orderIdShort = order._id || "N/A";
  return (
    <div className="vo-modal-overlay" role="alertdialog" aria-modal="true" aria-labelledby="vo-confirm-title" onClick={onCancel}>
      <div className="vo-modal vo-modal-small" onClick={(e) => e.stopPropagation()}>
        <h2 id="vo-confirm-title">Delete Order?</h2>
        <p>
          Are you sure you want to delete order <strong>#{orderIdShort}</strong> for{" "}
          <strong>{order.name}</strong>? This action cannot be undone.
        </p>
        <div className="vo-modal-actions">
          <button className="vo-btn vo-btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="vo-btn vo-btn-danger" onClick={() => onConfirm(order)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [viewingOrder, setViewingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get("https://mpcrackers-api.onrender.com/mpcrackers/getorders");
      setOrders(response.data.orders || []);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const now = new Date();
    let result = orders.filter((o) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        o.name?.toLowerCase().includes(term) ||
        o.mobile?.includes(term) ||
        o.city?.toLowerCase().includes(term);

      if (!matchesSearch) return false;

      if (dateFilter === "all") return true;
      const created = new Date(o.createdAt);
      if (dateFilter === "today") {
        return created.toDateString() === now.toDateString();
      }
      if (dateFilter === "week") {
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return created >= weekAgo;
      }
      if (dateFilter === "month") {
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "highest") return b.grandTotal - a.grandTotal;
      if (sortBy === "lowest") return a.grandTotal - b.grandTotal;
      return 0;
    });

    return result;
  }, [orders, searchTerm, dateFilter, sortBy]);

  const handleMarkDelivered = (order) => {
    // UI-only: no backend endpoint requested for status updates yet.
    setOrders((prev) =>
      prev.map((o) => (o._id === order._id ? { ...o, status: "Delivered" } : o))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDeleteConfirm = async (order) => {
    try {

      await axios.delete(
        `https://mpcrackers-api.onrender.com/mpcrackers/deleteorder/${order._id}`
      );

      setOrders((prev) =>
        prev.filter((o) => o._id !== order._id)
      );

      setDeletingOrder(null);

      alert("Order deleted successfully");

    } catch (err) {

      alert("Unable to delete order");

    }
  };





  const navigate = useNavigate()
  function handleBack() {
    navigate(-1)
  }

  return (
    <div className="vo-page">
      <section className="vo-hero">
        <div className="vo-hero-fx" aria-hidden="true">
          <span className="vo-spark vo-spark-1" />
          <span className="vo-spark vo-spark-2" />
          <span className="vo-spark vo-spark-3" />
          <span className="vo-spark vo-spark-4" />
          <span className="vo-spark vo-spark-5" />
        </div>
        <h1 className="vo-hero-title" style={{ marginTop: '30px' }}>VIEW CUSTOMER ORDERS</h1>
        <p className="vo-hero-subtitle">Manage and monitor all customer orders in one place.</p>
        <button onClick={handleBack} style={{ height: '40px', width: '200px', marginTop: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#C9A227', color: '#3F0D12', fontWeight: 'bold', cursor: 'pointer' }}>Back</button>
      </section>

      <section className="vo-controls" aria-label="Search, filter and sort orders">
        <div className="vo-search">
          <svg className="vo-search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Search by name, mobile or city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search orders"
          />
        </div>

        <label className="vo-select-wrap">
          <span className="vo-select-label">Filter</span>
          <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} aria-label="Filter orders by date">
            <option value="all">All Orders</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </label>

        <label className="vo-select-wrap">
          <span className="vo-select-label">Sort</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort orders">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Total</option>
            <option value="lowest">Lowest Total</option>
          </select>
        </label>
      </section>

      <section className="vo-list" aria-live="polite">
        {loading && (
          <div className="vo-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && <ErrorState onRetry={fetchOrders} />}

        {!loading && !error && filteredOrders.length === 0 && <EmptyState />}

        {!loading && !error && filteredOrders.length > 0 && (
          <div className="vo-grid">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onView={setViewingOrder}
                onDeleteRequest={setDeletingOrder}
                onMarkDelivered={handleMarkDelivered}
                onPrint={handlePrint}
              />
            ))}
          </div>
        )}
      </section>

      <DetailsModal order={viewingOrder} onClose={() => setViewingOrder(null)} />
      <DeleteConfirmModal
        order={deletingOrder}
        onCancel={() => setDeletingOrder(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ViewOrders;
