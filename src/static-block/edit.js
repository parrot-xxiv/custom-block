import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { content, textColor, showBorder } = attributes;

	const blockProps = useBlockProps({
		style: {
			color: textColor,
			border: showBorder ? '2px dashed #888' : 'none',
			padding: '15px',
		},
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Block Settings', 'custom-blocks')} initialOpen={true}>
					<ToggleControl
						label={__('Show Border', 'custom-blocks')}
						checked={showBorder}
						onChange={(val) => setAttributes({ showBorder: val })}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Color Settings', 'custom-blocks')}
					colorSettings={[
						{
							value: textColor,
							onChange: (color) => setAttributes({ textColor: color }),
							label: __('Text Color', 'custom-blocks'),
						},
					]}
				/>
			</InspectorControls>

			<RichText
				{ ...blockProps }
				tagName="p"
				value={content}
				allowedFormats={['core/bold', 'core/italic']}
				onChange={(val) => setAttributes({ content: val })}
				placeholder={__('Write something…', 'custom-blocks')}
			/>
		</>
	);
}
