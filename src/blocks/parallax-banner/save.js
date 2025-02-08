import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Save({ attributes }) {

  const blockProps = useBlockProps.save();
  const { parallaxMediaUrl } = attributes;

  return (
    <div {...blockProps}>
      {parallaxMediaUrl && (
        <div className="parallax-banner relative h-[70vh] overflow-hidden">
          <div className="banner-bg absolute inset-0">
            <img
              src={parallaxMediaUrl}
              alt="parallax-image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}