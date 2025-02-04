import { useBlockProps, InspectorControls, ResizableBox } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const { customWidth } = attributes;
  const { width, height } = attributes;

  console.log( attributes )


  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Block Width', 'my-plugin')}>
          <RangeControl
            value={customWidth}
            __nextHasNoMarginBottom={ true }
            onChange={(value) => setAttributes({ customWidth: value })}
            min={100}
            max={200}
            step={10}
          />
        </PanelBody>
      </InspectorControls>

      <div
        {...useBlockProps({
          style: { width: customWidth ? `${customWidth}px` : 'full' },
          className: "bg-red-400"
        })}
      >
        <p>{__('Resize me!', 'my-plugin')}</p>
      </div>
      
    </>
  );
}