import React from 'react';
import { Helmet } from 'react-helmet-async';

const SeoHead = ({ title, description, image, url, keywords = [] }) => (
  <Helmet>
    <title>{title ? `${title} | Nash Sajt Studio` : 'Nash Sajt Studio'}</title>
    {description && <meta name="description" content={description} />}
    {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
    {url && <link rel="canonical" href={url} />}
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title ? `${title} | Nash Sajt Studio` : 'Nash Sajt Studio'} />
    {description && <meta property="og:description" content={description} />}
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
  </Helmet>
);

export default SeoHead;
