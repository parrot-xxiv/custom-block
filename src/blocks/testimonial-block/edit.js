import { useBlockProps, RichText } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const { testimonialText } = attributes;

  const blockProps = useBlockProps();
  const onChangeTestimonialText = (newText) => setAttributes({ testimonialText: newText });

  return (
    <div {...blockProps}>

      {/* Editor preview */}
      <div className="testimonial-content">
        <RichText
          tagName="p"
          className="testimonial-text"
          value={testimonialText}
          onChange={onChangeTestimonialText}
          placeholder={__('Enter testimonial text...', 'custom-block')}
        />
      </div>
    </div>
  );
}