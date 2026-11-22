import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import About from "@/pages/About";
import Certifications from "@/pages/Certifications";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import B2BEnquiry from "@/pages/B2BEnquiry";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/AdminLogin";
import AdminLayout from "@/pages/AdminLayout";
import AdminProducts from "@/pages/AdminProducts";
import AdminBlogs from "@/pages/AdminBlogs";
import AdminEnquiries from "@/pages/AdminEnquiries";
import AdminFeedback from "@/pages/AdminFeedback";
import AdminSubscribers from "@/pages/AdminSubscribers";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToaster position="top-center" toastOptions={{
          style: { background: 'hsl(var(--card))', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))' },
          success: { iconTheme: { primary: 'hsl(var(--primary))', secondary: 'hsl(var(--primary-foreground))' } },
        }} />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/b2b-enquiry" element={<B2BEnquiry />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminProducts />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="feedback" element={<AdminFeedback />} />
              <Route path="subscribers" element={<AdminSubscribers />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
