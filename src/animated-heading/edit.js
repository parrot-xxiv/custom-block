import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	RichText, 
	InspectorControls,
	PanelColorSettings,
	FontSizePicker,
	BlockControls,
	AlignmentToolbar
} from '@wordpress/block-editor';
import { 
	PanelBody, 
	SelectControl, 
	RangeControl, 
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	GradientPicker
} from '@wordpress/components';
import { useSettings } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { 
		content, 
		level, 
		animationType, 
		duration, 
		delay, 
		triggerOnScroll,
		fontSize,
		fontFamily,
		fontWeight,
		textTransform,
		letterSpacing,
		lineHeight,
		textAlign,
		textColor,
		backgroundColor,
		gradient
	} = attributes;

	const fontSizes = useSettings('typography.fontSizes') || [];
	const fontFamilies = useSettings('typography.fontFamilies') || [];

	const blockProps = useBlockProps({
		className: `wp-block-animated-heading animation-${animationType}`,
		style: {
			fontSize: fontSize,
			fontFamily: fontFamily,
			fontWeight: fontWeight,
			textTransform: textTransform,
			letterSpacing: letterSpacing,
			lineHeight: lineHeight,
			textAlign: textAlign,
			color: textColor,
			backgroundColor: backgroundColor,
			background: gradient,
		}
	});

	const TagName = `h${level}`;

	const animationOptions = [
		{ label: 'Fade In Up', value: 'fadeInUp' },
		{ label: 'Fade In Down', value: 'fadeInDown' },
		{ label: 'Fade In Left', value: 'fadeInLeft' },
		{ label: 'Fade In Right', value: 'fadeInRight' },
		{ label: 'Scale In', value: 'scaleIn' },
		{ label: 'Rotate In', value: 'rotateIn' },
		{ label: 'Bounce In', value: 'bounceIn' },
		{ label: 'Slide In Up', value: 'slideInUp' },
	];

	const fontWeightOptions = [
		{ label: 'Normal', value: 'normal' },
		{ label: 'Bold', value: 'bold' },
		{ label: '100', value: '100' },
		{ label: '200', value: '200' },
		{ label: '300', value: '300' },
		{ label: '400', value: '400' },
		{ label: '500', value: '500' },
		{ label: '600', value: '600' },
		{ label: '700', value: '700' },
		{ label: '800', value: '800' },
		{ label: '900', value: '900' },
	];

	const textTransformOptions = [
		{ label: 'None', value: 'none' },
		{ label: 'Uppercase', value: 'uppercase' },
		{ label: 'Lowercase', value: 'lowercase' },
		{ label: 'Capitalize', value: 'capitalize' },
	];

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(newAlignment) => setAttributes({ textAlign: newAlignment })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Heading Settings', 'animated-heading')}>
					<RangeControl
						label={__('Heading Level', 'animated-heading')}
						value={level}
						onChange={(newLevel) => setAttributes({ level: newLevel })}
						min={1}
						max={6}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Color Settings', 'animated-heading')}
					colorSettings={[
						{
							value: textColor,
							onChange: (newTextColor) => setAttributes({ textColor: newTextColor }),
							label: __('Text Color', 'animated-heading'),
						},
						{
							value: backgroundColor,
							onChange: (newBackgroundColor) => setAttributes({ backgroundColor: newBackgroundColor }),
							label: __('Background Color', 'animated-heading'),
						},
					]}
				/>

				<PanelBody title={__('Typography', 'animated-heading')} initialOpen={true}>
					<FontSizePicker
						fontSizes={fontSizes}
						value={fontSize}
						fallbackFontSize={16}
						onChange={(newFontSize) => setAttributes({ fontSize: newFontSize })}
					/>

					{fontFamilies[0].theme.length > 0 && (
						<SelectControl
							label={__('Font Family', 'animated-heading')}
							value={fontFamily}
							options={[
								{ label: 'Default', value: '' },
								...fontFamilies[0].theme.map(family => ({
									label: family.name,
									value: family.fontFamily
								}))
							]}
							onChange={(newFontFamily) => setAttributes({ fontFamily: newFontFamily })}
						/>
					)}

					<SelectControl
						label={__('Font Weight', 'animated-heading')}
						value={fontWeight}
						options={fontWeightOptions}
						onChange={(newFontWeight) => setAttributes({ fontWeight: newFontWeight })}
					/>

					<SelectControl
						label={__('Text Transform', 'animated-heading')}
						value={textTransform}
						options={textTransformOptions}
						onChange={(newTextTransform) => setAttributes({ textTransform: newTextTransform })}
					/>

					<UnitControl
						label={__('Letter Spacing', 'animated-heading')}
						value={letterSpacing}
						onChange={(newLetterSpacing) => setAttributes({ letterSpacing: newLetterSpacing })}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' },
						]}
					/>

					<UnitControl
						label={__('Line Height', 'animated-heading')}
						value={lineHeight}
						onChange={(newLineHeight) => setAttributes({ lineHeight: newLineHeight })}
						units={[
							{ value: 'px', label: 'px' },
							{ value: 'em', label: 'em' },
							{ value: 'rem', label: 'rem' },
							{ value: '', label: 'unitless' },
						]}
					/>
				</PanelBody>

				
				<PanelBody title={__('Gradient Background', 'animated-heading')}>
					<GradientPicker
						value={gradient}
						onChange={(newGradient) => setAttributes({ gradient: newGradient })}
						clearable={true}
					/>
				</PanelBody>
				
				<PanelBody title={__('Animation Settings', 'animated-heading')}>
					<SelectControl
						label={__('Animation Type', 'animated-heading')}
						value={animationType}
						options={animationOptions}
						onChange={(newAnimation) => setAttributes({ animationType: newAnimation })}
					/>
					
					<RangeControl
						label={__('Duration (seconds)', 'animated-heading')}
						value={duration}
						onChange={(newDuration) => setAttributes({ duration: newDuration })}
						min={0.1}
						max={5}
						step={0.1}
					/>
					
					<RangeControl
						label={__('Delay (seconds)', 'animated-heading')}
						value={delay}
						onChange={(newDelay) => setAttributes({ delay: newDelay })}
						min={0}
						max={3}
						step={0.1}
					/>
					
					<ToggleControl
						label={__('Trigger on Scroll', 'animated-heading')}
						checked={triggerOnScroll}
						onChange={(newTrigger) => setAttributes({ triggerOnScroll: newTrigger })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<RichText
					tagName={TagName}
					value={content}
					onChange={(newContent) => setAttributes({ content: newContent })}
					placeholder={__('Add your animated heading...', 'animated-heading')}
					allowedFormats={['core/bold', 'core/italic']}
				/>
			</div>
		</>
	);
}
