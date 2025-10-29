import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const SiteContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export const SiteProvider = ({ children }) => {
  const [sections, setSections] = useState([]);
  const [pricing, setPricing] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [products, setProducts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [sectionRes, pricingRes, galleryRes, productsRes, jobsRes, blogRes] = await Promise.all([
          axios.get(`${API_BASE}/sections`),
          axios.get(`${API_BASE}/pricing`),
          axios.get(`${API_BASE}/gallery`),
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/jobs`, { params: { active: true } }),
          axios.get(`${API_BASE}/blog`, { params: { published: true } })
        ]);
        setSections(sectionRes.data);
        setPricing(pricingRes.data);
        setGallery(galleryRes.data);
        setProducts(productsRes.data);
        setJobs(jobsRes.data);
        setBlogPosts(blogRes.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load site content. Some sections may be unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const value = useMemo(
    () => ({
      sections,
      pricing,
      gallery,
      products,
      jobs,
      blogPosts,
      loading,
      error,
      refresh: async () => {
        try {
          const res = await axios.get(`${API_BASE}/sections`);
          setSections(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    }),
    [sections, pricing, gallery, products, jobs, blogPosts, loading, error]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
};

export const useSite = () => useContext(SiteContext);
