import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
  const { postsToShow } = attributes;
  const { isFullWidth } = attributes;

  // Set up the toggle switch state
  const onFullWidth = (value) => {
    setAttributes({ isFullWidth: value });
    console.log(isFullWidth)
  };

  const blockProps = useBlockProps();
  return (
    <div {...blockProps}
      // {...useBlockProps({className: flexAutoClass})}
      >
      {/* Inspector controls */}
      <InspectorControls>
        <PanelBody title="Settings">
          <RangeControl
            label="width"
            value={postsToShow}
            onChange={(value) => setAttributes({ postsToShow: value })}
            min={0}
            max={800}
            disabled={isFullWidth}
            __nextHasNoMarginBottom={ true }
          />
          <ToggleControl
            label={__('Full Width', 'static-block')}
            checked={isFullWidth}
            onChange={onFullWidth}
            __nextHasNoMarginBottom={ true }
          />
        </PanelBody>
      </InspectorControls>

      {/* Editor preview */}
      <div className={`bg-green-500 p-4`}>
        <h2 className="text-2xl font-bold mb-4">Static Block</h2>
        <div className="">
          Stathicc..
        </div>
      </div>
    </div>
  );
}