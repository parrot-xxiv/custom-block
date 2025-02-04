import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { testimonialText } = attributes;

  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <div className={`bg-green-500 p-4`}>
        <h2 className="text-2xl font-bold mb-4">Testi</h2>
        <div className="testimonial-content">
          <RichText.Content
            tagName="p"
            className="testimonial-text"
            value={testimonialText}
          />
        </div>
      </div>
    </div>
  );
}