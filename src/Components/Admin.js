import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://mpcrackers-api.onrender.com/mpcrackers";
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || "https://mpcrackers-api.onrender.com";

const CATEGORIES = [
  "One Sound Crackers",
  "Flower Pots",
  "Ground Chakkars",
  "Atom Bombs",
  "Paper Blasts",
  "Rockets",
  "Soil Pots",
  "Time Pass Crackers",
  "Matches",
  "Kids Items",
  "Handles",
  "Twinkling Stars",
  "Ultra Wheels",
  "Peacock Fountain",
  "Fancy Items",
  "Gun Shower",
  "Colour Fountain",
  "Special Sparklers",
  "Special Crackers",
  "Single Shots",
  "Special Single Shot",
  "Mega Deluxe",
  "Repeating Shots",
  "Special Shots",
  "Electric Crackers",
  "Guns",
  "Sparklers",
  "Gift Boxes",
  "Family Packs"
];

const STATUSES = ["Available", "Out of Stock", "Hidden"];

const emptyForm = {
  productName: "",
  category: CATEGORIES[0],
  quantity: "",
  mrpPrice: "",
  discountPercentage: 80,
  sellingPrice: 0,
  description: "",
  status: "Available",
};

const calcSellingPrice = (mrp, discount) => {
  const m = Number(mrp) || 0;
  const d = Number(discount) || 0;
  const price = m - (m * d) / 100;
  return Math.round(price * 100) / 100;
};

const statusBadgeClass = {
  Available: "badge-available",
  "Out of Stock": "badge-outstock",
  Hidden: "badge-hidden",
};

const Admin = () => {
  // ---------- form state ----------
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // ---------- list state ----------
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ---------- toasts ----------
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  // ---------- fetch products ----------
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (filter !== "All") params.status = filter;
      const { data } = await axios.get(API_BASE_URL, { params });
      setProducts(data);
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to load products.",
        "error"
      );
    } finally {
      setLoadingProducts(false);
    }
  }, [search, filter, showToast]);

  useEffect(() => {
    const t = setTimeout(fetchProducts, search ? 350 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filter]);

  // ---------- selling price auto-calc ----------
  useEffect(() => {
    const sp = calcSellingPrice(form.mrpPrice, form.discountPercentage);
    setForm((prev) =>
      prev.sellingPrice === sp ? prev : { ...prev, sellingPrice: sp }
    );
  }, [form.mrpPrice, form.discountPercentage]);

  // ---------- form handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateFile = (file) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      return "Only JPG, JPEG, and PNG images are allowed.";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "Image must be smaller than 5 MB.";
    }
    return "";
  };

  const applyFile = (file) => {
    const err = validateFile(file);
    if (err) {
      setErrors((prev) => ({ ...prev, image: err }));
      return;
    }
    setErrors((prev) => ({ ...prev, image: "" }));
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.productName.trim()) {
      newErrors.productName = "Product name cannot be empty.";
    }
    if (form.quantity === "" || Number(form.quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative.";
    }
    if (form.mrpPrice === "" || Number(form.mrpPrice) < 0) {
      newErrors.mrpPrice = "MRP cannot be negative.";
    }
    if (form.description && form.description.length > 300) {
      newErrors.description = "Description cannot exceed 300 characters.";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("productName", form.productName);
    fd.append("category", form.category);
    fd.append("quantity", form.quantity);
    fd.append("mrpPrice", form.mrpPrice);
    fd.append("discountPercentage", form.discountPercentage);
    fd.append("sellingPrice", form.sellingPrice);
    fd.append("description", form.description || "");
    fd.append("status", form.status);
    if (imageFile) fd.append("productImage", imageFile);
    return fd;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setUploadProgress(0);
    const onUploadProgress = (evt) => {
      if (evt.total) {
        setUploadProgress(Math.round((evt.loaded * 100) / evt.total));
      }
    };
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/${editingId}`, buildFormData(), config);
        showToast("Product Updated Successfully");
      } else {
        await axios.post(API_BASE_URL, buildFormData(), config);
        showToast("Product Added Successfully");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      productName: product.productName || "",
      category: product.category || CATEGORIES[0],
      quantity: product.quantity ?? "",
      mrpPrice: product.mrpPrice ?? "",
      discountPercentage: product.discountPercentage ?? 80,
      sellingPrice: product.sellingPrice ?? 0,
      description: product.description || "",
      status: product.status || "Available",
    });
    setImagePreview(
      product.productImage ? `${SERVER_URL}${product.productImage}` : ""
    );
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/${deleteTarget._id}`);
      showToast("Product Deleted Successfully");
      if (editingId === deleteTarget._id) resetForm();
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed to delete product.",
        "error"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const hasDiscount =
    Number(form.mrpPrice) > 0 && Number(form.sellingPrice) < Number(form.mrpPrice);

  const navigate = useNavigate()
  function handleNavigate() {
    navigate('/orders')
  }


  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <div className="admin-product-page">
      {/* HERO */}
      <section className="ap-hero">
        <div className="ap-hero-fx" aria-hidden="true">
          <span className="fx-spark fx-spark-1" />
          <span className="fx-spark fx-spark-2" />
          <span className="fx-spark fx-spark-3" />
          <span className="fx-spark fx-spark-4" />
          <span className="fx-spark fx-spark-5" />
        </div>
        <div className="ap-hero-content">
          <h1 className="ap-hero-title" style={{marginTop:'30px'}}>ADMIN PRODUCT MANAGEMENT</h1>
          <button className="view-orders-btn" onClick={handleNavigate}>View Orders</button>
          <button className="logout-btn" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
          <p className="ap-hero-subtitle">
            Manage your crackers inventory quickly and efficiently.
          </p>
        </div>
      </section>

      <div className="ap-container">
        {/* FORM CARD */}
        <section className="ap-card ap-form-card">
          <div className="ap-form-header">
            <h2 className="ap-section-heading">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            {editingId && (
              <button type="button" className="ap-btn-cancel" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="ap-form-group">
              <label htmlFor="productName">
                Product Name <span className="ap-required">*</span>
              </label>
              <input
                id="productName"
                name="productName"
                type="text"
                placeholder="Classic Lakshmi Bomb"
                value={form.productName}
                onChange={handleChange}
              />
              {errors.productName && (
                <span className="ap-field-error">{errors.productName}</span>
              )}
            </div>

            <div className="ap-form-group">
              <label htmlFor="productImage">Product Image</label>
              <div
                className={`ap-dropzone ${isDragging ? "ap-dropzone-active" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="ap-upload-preview">
                    <img src={imagePreview} alt="Product preview" />
                    <button
                      type="button"
                      className="ap-btn-remove-image"
                      onClick={handleRemoveImage}
                      aria-label="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <path d="M17 8l-5-5-5 5" />
                      <path d="M12 3v12" />
                    </svg>
                    <p>Drag &amp; drop an image here</p>
                    <button
                      type="button"
                      className="ap-btn-choose"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose Image
                    </button>
                    <span className="ap-upload-hint">JPG, PNG or JPEG • Max 5 MB</span>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  id="productImage"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileSelect}
                  hidden
                />
              </div>
              {errors.image && <span className="ap-field-error">{errors.image}</span>}
              {isSubmitting && uploadProgress > 0 && (
                <div className="ap-progress-track">
                  <div className="ap-progress-fill" style={{ width: `${uploadProgress}%` }} />
                </div>
              )}
            </div>

            <div className="ap-form-row">
              <div className="ap-form-group">
                <label htmlFor="quantity">
                  Available Quantity <span className="ap-required">*</span>
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.quantity}
                  onChange={handleChange}
                />
                {errors.quantity && (
                  <span className="ap-field-error">{errors.quantity}</span>
                )}
              </div>

              <div className="ap-form-group">
                <label htmlFor="mrpPrice">
                  MRP Price Per Box <span className="ap-required">*</span>
                </label>
                <div className="ap-input-prefix">
                  <span>₹</span>
                  <input
                    id="mrpPrice"
                    name="mrpPrice"
                    type="number"
                    min="0"
                    placeholder="500"
                    value={form.mrpPrice}
                    onChange={handleChange}
                  />
                </div>
                {errors.mrpPrice && (
                  <span className="ap-field-error">{errors.mrpPrice}</span>
                )}
              </div>
            </div>

            <div className="ap-form-row">
              <div className="ap-form-group">
                <label htmlFor="discountPercentage">
                  Discount Percentage ({form.discountPercentage}%)
                </label>
                <input
                  id="discountPercentage"
                  name="discountPercentage"
                  type="range"
                  min="0"
                  max="100"
                  value={form.discountPercentage}
                  onChange={handleChange}
                  className="ap-range"
                />
              </div>

              <div className="ap-form-group">
                <label htmlFor="sellingPrice">Selling Price</label>
                <div className="ap-selling-display">₹{form.sellingPrice}</div>
              </div>
            </div>

            <div className="ap-form-row">
              <div className="ap-form-group">
                <label htmlFor="category">Product Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="ap-form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={form.status} onChange={handleChange}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="ap-form-group">
              <label htmlFor="description">
                Product Description{" "}
                <span className="ap-optional">({form.description.length}/300)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                maxLength="300"
                placeholder="Describe the crackling brilliance of this product..."
                value={form.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="ap-field-error">{errors.description}</span>
              )}
            </div>

            <button type="submit" className="ap-btn-submit" disabled={isSubmitting}>
              {isSubmitting && <span className="ap-spinner" aria-hidden="true" />}
              {isSubmitting ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </section>

        {/* LIVE PREVIEW */}
        <section className="ap-card ap-preview-card">
          <span className="ap-preview-label">Live Preview</span>
          <div className="ap-preview-image-wrap">
            {imagePreview ? (
              <img src={imagePreview} alt={form.productName || "Preview"} className="ap-preview-image" />
            ) : (
              <div className="ap-preview-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span>Image preview</span>
              </div>
            )}
            {form.quantity !== "" && Number(form.quantity) < 10 && (
              <span className="ap-preview-lowstock">Low Stock</span>
            )}
            <span className={`ap-preview-status ${statusBadgeClass[form.status]}`}>
              {form.status}
            </span>
          </div>
          <div className="ap-preview-body">
            <span className="ap-preview-category">{form.category}</span>
            <h3 className="ap-preview-name">{form.productName || "Your product name here"}</h3>
            <div className="ap-preview-pricing">
              {hasDiscount && <span className="ap-preview-mrp">₹{form.mrpPrice}</span>}
              <span className="ap-preview-selling">₹{form.sellingPrice || 0}</span>
            </div>
            {form.description && <p className="ap-preview-description">{form.description}</p>}
          </div>
        </section>

        {/* PRODUCT LIST */}
        <section className="ap-card ap-list-card">
          <div className="ap-list-toolbar">
            <h2 className="ap-section-heading">All Products</h2>
            <div className="ap-toolbar-controls">
              <div className="ap-search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products by name"
                />
              </div>
              <select
                className="ap-filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter products"
              >
                <option value="All">All Products</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Hidden">Hidden</option>
              </select>
            </div>
          </div>

          {loadingProducts ? (
            <div className="ap-skeleton-grid">
              {[...Array(3)].map((_, i) => (
                <div className="ap-skeleton-card" key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="ap-empty-state">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M20 7h-3.6l-1.7-2.5A2 2 0 0013 3.5h-2a2 2 0 00-1.7 1L7.6 7H4a1 1 0 00-1 1v11a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1z" />
                <circle cx="12" cy="14" r="3.2" />
              </svg>
              <h3>No Products Added Yet</h3>
              <p>Add your first cracker product using the form above.</p>
            </div>
          ) : (
            <div className="ap-product-grid">
              {products.map((p) => (
                <div className="ap-product-card" key={p._id}>
                  <div className="ap-pc-image-wrap">
                    {p.productImage ? (
                      <img src={`${SERVER_URL}${p.productImage}`} alt={p.productName} />
                    ) : (
                      <div className="ap-pc-placeholder">MS</div>
                    )}
                    {p.quantity < 10 && <span className="ap-pc-lowstock">Low Stock</span>}
                    <span className={`ap-pc-status ${statusBadgeClass[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="ap-pc-body">
                    <span className="ap-pc-category">{p.category}</span>
                    <h3 className="ap-pc-name">{p.productName}</h3>
                    <div className="ap-pc-pricing">
                      <span className="ap-pc-mrp">₹{p.mrpPrice}</span>
                      <span className="ap-pc-selling">₹{p.sellingPrice}</span>
                    </div>
                    <span className="ap-pc-qty">Qty: {p.quantity} Pcs</span>
                  </div>
                  <div className="ap-pc-actions">
                    <button className="ap-pc-btn ap-pc-edit" onClick={() => handleEdit(p)}>
                      ✏ Edit
                    </button>
                    <button className="ap-pc-btn ap-pc-delete" onClick={() => setDeleteTarget(p)}>
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* DELETE CONFIRMATION */}
      {deleteTarget && (
        <div className="ap-modal-backdrop" onClick={() => setDeleteTarget(null)}>
          <div className="ap-delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ap-delete-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" />
              </svg>
            </div>
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to delete <strong>{deleteTarget.productName}</strong>?
              This action cannot be undone.
            </p>
            <div className="ap-delete-actions">
              <button className="ap-btn-modal-cancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="ap-btn-modal-delete" onClick={handleDeleteConfirm} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOASTS */}
      <div className="ap-toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`ap-toast ap-toast-${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
