import { Helmet } from "react-helmet-async";

export const SEO = ({
  title,
  description,
  image,
  canonical,
}: {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
}) => {
  const fullTitle = title.includes("Vedaqur") ? title : `${title} | Vedaqur`;
  const desc =
    description ||
    "Authentic AYUSH-approved Ayurvedic medicines from Vedaqur. Pure Roots. Proven Results. Pan India delivery.";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};
