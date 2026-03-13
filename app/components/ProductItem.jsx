import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';

/**
 * @param {{
 *   product:
 *     | CollectionItemFragment
 *     | ProductItemFragment
 *     | RecommendedProductFragment;
 *   loading?: 'eager' | 'lazy';
 * }}
 */
export function ProductItem({product, loading}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  
  // Extract price
  const price = product.priceRange.minVariantPrice;
  const formattedPrice = Math.round(parseFloat(price.amount));
  
  return (
    <>
      <style>{`
        .product-item {
          text-decoration: none;
          display: block;
        }
        
        .product-item-image {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          border: 8px solid rgba(180,175,165,0.15);
          margin-bottom: 16px;
          background: linear-gradient(135deg, #F5F2ED 0%, #E8D7AE 60%, #F5F2ED 100%);
        }
        
        .product-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .product-item h4 {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 400;
          color: #1A1A1A;
          margin: 0 0 6px 0;
          text-align: center;
        }
        
        .product-item-price {
          font-size: 15px;
          font-weight: 500;
          color: #1A1A1A;
          text-align: center;
          display: block;
        }
        
        @media (max-width: 768px) {
          .product-item h4 {
            font-size: 16px;
          }
          
          .product-item-price {
            font-size: 14px;
          }
          
          .product-item-image {
            border-width: 6px;
            margin-bottom: 12px;
          }
        }
      `}</style>
      
      <Link
        className="product-item"
        key={product.id}
        prefetch="intent"
        to={variantUrl}
      >
        {image && (
          <div className="product-item-image">
            <Image
              alt={image.altText || product.title}
              aspectRatio="1/1"
              data={image}
              loading={loading}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
            />
          </div>
        )}
        <h4>{product.title}</h4>
        <span className="product-item-price">
          From £{formattedPrice.toLocaleString()}
        </span>
      </Link>
    </>
  );
}

/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('storefrontapi.generated').CollectionItemFragment} CollectionItemFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductFragment} RecommendedProductFragment */
