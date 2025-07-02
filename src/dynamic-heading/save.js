import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        headingType = 'static',
        staticTextPrefix = 'I am a',
        dynamicText = 'Developer, Designer, Creator',
        staticHeadingText = 'Animated Heading',
        animationType = 'fade-in-up',
        tag = 'h2',
        fontFamily
    } = attributes;

    const blockProps = useBlockProps.save();

    const TagName = tag;

    return (
        <div {...blockProps}>
            {headingType === 'dynamic' ? (
                <TagName
                    className="dynamic-heading-item"
                    data-animation-type={animationType}
                    data-dynamic-text={JSON.stringify(dynamicText.split(',').map(s => s.trim()))}
                >
                    <span className="static-text-wrapper">
                        <span className="static-text-inner">{staticTextPrefix}&nbsp;</span>
                    </span>
                    <span className="dynamic-text-wrapper">
                        <span className="dynamic-text-inner">{dynamicText.split(',')[0].trim()}</span>
                    </span>
                </TagName>
            ) : (
                <TagName
                    style={{"font-family": fontFamily}}
                    className="dynamic-heading-item"
                    data-animation-type={animationType}
                    data-dynamic-text="[]" // Pass empty array for static headings
                >
                    {staticHeadingText}
                </TagName>
            )}
        </div>
    );
}


