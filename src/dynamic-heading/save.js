import { useBlockProps } from '@wordpress/block-editor';
import { getBlockSupport } from '@wordpress/blocks';
import { colord } from 'colord';

export default function save({ attributes }) {
    const { headings = [], textAlign } = attributes;

    // A helper function to generate style objects.
    // This will parse the style attribute and return a CSS style object.
    const getStyle = (style) => {
        const styleObject = {};
        if (style?.color?.text) styleObject.color = style.color.text;
        if (style?.typography?.fontSize) styleObject.fontSize = style.typography.fontSize;
        if (style?.typography?.fontStyle) styleObject.fontStyle = style.typography.fontStyle;
        if (style?.typography?.fontWeight) styleObject.fontWeight = style.typography.fontWeight;
        return styleObject;
    };

    const blockProps = useBlockProps.save({
        className: `has-text-align-${textAlign || 'left'}`,
    });

    return (
        <div {...blockProps}>
            {headings.map((heading, index) => {
                const TagName = heading.tag || 'h2';
                const dynamicWords = heading.dynamicText ? heading.dynamicText.split(',').map(s => s.trim()) : [];
                const headingStyle = getStyle(heading.style);

                return (
                    <TagName
                        key={heading.id}
                        className="dynamic-heading-item"
                        style={headingStyle}
                        data-animation-type={heading.animationType}
                        data-dynamic-text={JSON.stringify(dynamicWords)} // Pass as a JSON string
                    >
                        <span className="static-text-wrapper">
                            <span className="static-text-inner">{heading.staticText}&nbsp;</span>
                        </span>
                        <span className="dynamic-text-wrapper">
                             {/* The first word is rendered server-side for non-JS users */}
                            <span className="dynamic-text-inner">{dynamicWords[0] || ''}</span>
                        </span>
                    </TagName>
                );
            })}
        </div>
    );
}

