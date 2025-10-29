import PropTypes from 'prop-types';

const GalleryGrid = ({ images }) => (
  <section className="section-container py-16">
    <div className="mb-10 text-center">
      <h2 className="font-display text-3xl font-semibold text-slate-900">Recent launches</h2>
      <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
        Browse a curated selection of websites, ecommerce experiences, and marketing assets designed
        for founders and small teams.
      </p>
    </div>
    <div className="grid gap-5 md:grid-cols-3">
      {images.map((image) => (
        <figure key={image.id || image.url} className="group relative overflow-hidden rounded-3xl">
          <img
            src={image.url}
            alt={image.altText}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
            <span className="text-sm font-semibold">{image.caption}</span>
            <span className="text-xs text-slate-200">{image.seoDescription}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);

GalleryGrid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      url: PropTypes.string.isRequired,
      altText: PropTypes.string.isRequired,
      caption: PropTypes.string,
      seoDescription: PropTypes.string,
    })
  ),
};

export default GalleryGrid;
