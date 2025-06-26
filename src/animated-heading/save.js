import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: 'wp-block-animated-heading',
		'data-animation': animationType,
		'data-duration': duration,
		'data-delay': delay,
		'data-trigger-scroll': triggerOnScroll,
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

	return (
		<div {...blockProps}>
			<RichText.Content
				tagName={TagName}
				value={content}
			/>
		</div>
	);
}
