
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		headingType = 'static',
		staticTextPrefix = 'I am a',
		dynamicText = 'Developer, Designer, Creator',
		staticHeadingText = 'Animated Heading',
		animation = { type: 'fade-in-up', duration: 1, delay: 0 },
		tag = 'h2',
	} = attributes;

	const blockProps = useBlockProps();

	const animationTypes = [
		{ label: 'None', value: 'none' },
		{ label: 'Fade In', value: 'fade-in' },
		{ label: 'Fade In Up', value: 'fade-in-up' },
		{ label: 'Fade In Down', value: 'fade-in-down' },
		{ label: 'Slide In Left', value: 'slide-in-left' },
		{ label: 'Slide In Right', value: 'slide-in-right' },
		{ label: 'Scale Up', value: 'scale-up' },
		{ label: 'Rotate In', value: 'rotate-in' },
		{ label: 'Bounce In', value: 'bounce-in' },
	];

	const TagName = tag;
	const dynamicWords = dynamicText
		? dynamicText.split(',').map((s) => s.trim())
		: ['...'];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Heading Settings', 'custom-blocks')}>
					<SelectControl
						label={__('Heading Type', 'custom-blocks')}
						value={headingType}
						options={[
							{ label: 'Dynamic Text', value: 'dynamic' },
							{ label: 'Static Text', value: 'static' },
						]}
						onChange={(value) => setAttributes({ headingType: value })}
					/>

					{headingType === 'dynamic' && (
						<>
							<TextControl
								label={__('Static Text Prefix', 'custom-blocks')}
								value={staticTextPrefix}
								onChange={(value) =>
									setAttributes({ staticTextPrefix: value })
								}
							/>
							<TextareaControl
								label={__(
									'Dynamic Words (comma-separated)',
									'custom-blocks'
								)}
								value={dynamicText}
								onChange={(value) =>
									setAttributes({ dynamicText: value })
								}
							/>
						</>
					)}

					{headingType === 'static' && (
						<TextControl
							label={__('Heading Text', 'custom-blocks')}
							value={staticHeadingText}
							onChange={(value) =>
								setAttributes({ staticHeadingText: value })
							}
						/>
					)}
				</PanelBody>
				<PanelBody
					title={__('Animation & Structure', 'custom-blocks')}
					initialOpen={false}
				>
					<SelectControl
						label={__('Animation Type', 'custom-blocks')}
						value={animation.type}
						options={animationTypes}
						onChange={(type) => setAttributes({ animation: { ...animation, type } })}
					/>
					<RangeControl
						label={__('Animation Duration (s)', 'custom-blocks')}
						value={animation.duration}
						min={0.1}
						max={5}
						step={0.1}
						onChange={(duration) => setAttributes({ animation: { ...animation, duration } })}
					/>
					<RangeControl
						label={__('Animation Delay (s)', 'custom-blocks')}
						value={animation.delay}
						min={0}
						max={5}
						step={0.1}
						onChange={(delay) => setAttributes({ animation: { ...animation, delay } })}
					/>
					<SelectControl
						label={__('HTML Tag', 'custom-blocks')}
						value={tag}
						options={[
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'p', value: 'p' },
						]}
						onChange={(value) => setAttributes({ tag: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<TagName className="dynamic-heading-editor-preview">
					{headingType === 'dynamic' ? (
						<>
							<span className="static-text">{staticTextPrefix}&nbsp;</span>
							<span className="dynamic-text-wrapper">
								<span className="dynamic-text">{dynamicWords[0]}</span>
							</span>
						</>
					) : (
						staticHeadingText
					)}
				</TagName>
			</div>
		</>
	);
}



