import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ResizableBox } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit(props) {
  const {
    attributes: { height, width },
    setAttributes,
    toggleSelection,
  } = props;

  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Settings">
          <RangeControl
            label="Posts to Show"
            min={1}
            max={6}
          />
        </PanelBody>
      </InspectorControls>
      <ResizableBox
        size={{
          height: props.attributes.height,
          width: props.attributes.width,
        }}
        minHeight="50"
        minWidth="50"
        __experimentalShowTooltip={true}
        __experimentalTooltipProps={{
          showPx: true,
          fadeTimeout: 1000,
        }}
        enable={{
          top: false,
          right: true,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: true,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStop={(event, direction, elt, delta) => {
          props.setAttributes({
            height: parseInt(props.attributes.height + delta.height, 10),
            width: parseInt(props.attributes.width + delta.width, 10),
          });
          console.log("stops resizing")
        }}
        onResizeStart={() => {
          console.log("starts resizing")
        }}
      >
        <div className="bg-yellow-500 w-full h-full p-4">
          <h2 className="text-2xl font-bold mb-4">ResizableBox</h2>
          <div>Hi resize me</div>
        </div>
      </ResizableBox>
    </div>

  );
}