/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    // 301 the old Base44 capitalised duplicate paths to the new canonical URLs.
    return [
      { source: "/ServicePage", destination: "/", permanent: true },
      { source: "/ArticlePage", destination: "/blog", permanent: true },
      { source: "/Articles", destination: "/blog", permanent: true },
      { source: "/articles", destination: "/blog", permanent: true },
      { source: "/QuotePage", destination: "/", permanent: true },
      { source: "/quote", destination: "/", permanent: true },
      { source: "/Home", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/Dashboard", destination: "/admin", permanent: true },
      { source: "/dashboard", destination: "/admin", permanent: true },
      { source: "/OfficeEnquiry", destination: "/office-cleaning-london", permanent: true },
      { source: "/office-enquiry", destination: "/office-cleaning-london", permanent: true },
      { source: "/PrivacyPolicy", destination: "/privacy-policy", permanent: true },
      { source: "/RefundPolicy", destination: "/refund-policy", permanent: true },
      { source: "/TermsConditions", destination: "/terms", permanent: true },
      { source: "/terms-conditions", destination: "/terms", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
