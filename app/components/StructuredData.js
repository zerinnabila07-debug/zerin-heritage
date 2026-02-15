export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zerin Heritage",
    "url": "https://zerin-heritage.vercel.app",
    "logo": "https://zerin-heritage.vercel.app/logo.png",
    "description": "Luxury South Asian Fashion & Heritage Wear - Premium sarees, kurtis, and accessories",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Banani",
      "addressLocality": "Dhaka",
      "postalCode": "1213",
      "addressCountry": "BD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1234-567890",
      "contactType": "Customer Service",
      "email": "info@zerinheritage.com",
      "availableLanguage": ["English", "Bengali"]
    },
    "sameAs": [
      "https://facebook.com/zerinheritage",
      "https://instagram.com/zerinheritage",
      "https://youtube.com/@zerinheritage"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zerin Heritage",
    "url": "https://zerin-heritage.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zerin-heritage.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Zerin Heritage",
    "image": "https://zerin-heritage.vercel.app/og-image.jpg",
    "description": "Explore Zerin Heritage for exclusive, high-fashion sarees, kurtis, and accessories. Experience timeless elegance with our handcrafted collections for Eid, Falgun, and special occasions.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Banani",
      "addressLocality": "Dhaka",
      "postalCode": "1213",
      "addressCountry": "BD"
    },
    "telephone": "+880-1234-567890",
    "priceRange": "৳৳৳",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Friday", "Saturday"],
        "opens": "10:00",
        "closes": "22:00"
      }
    ],
    "paymentAccepted": "Cash, Credit Card, Debit Card, bKash, Nagad",
    "currenciesAccepted": "BDT"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
    </>
  );
}
