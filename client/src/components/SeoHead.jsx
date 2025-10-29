import { Helmet } from 'react-helmet-async';

const SeoHead = ({ title, description, image, url, keywords }) => (
  <Helmet>
    <title>{title ? `${title} | Nash Sajt` : 'Nash Sajt — Digital Experiences that Convert'}</title>
    {description && <meta name="description" content={description} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta property="og:type" content="website" />
    {title && <meta property="og:title" content={`${title} | Nash Sajt`} />}
    {description && <meta property="og:description" content={description} />}
    {image && <meta property="og:image" content={image} />}
    {url && <meta property="og:url" content={url} />}
  </Helmet>
);

export default SeoHead;
