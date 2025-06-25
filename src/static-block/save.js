import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { content, textColor, showBorder } = attributes;

	const blockProps = useBlockProps.save({
		style: {
			color: textColor,
			border: showBorder ? '2px dashed #888' : 'none',
			padding: '15px',
		},
	});

	return (
		<RichText.Content
			{ ...blockProps }
			tagName="p"
			value={content}
		/>
	);
}

