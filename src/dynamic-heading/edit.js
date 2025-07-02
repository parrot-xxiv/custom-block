import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
    ToolsPanel,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    SelectControl,
    FontSizePicker,
} from '@wordpress/components';
import { useSettings } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        headingType = 'static', // 'dynamic' or 'static'
        staticTextPrefix = 'I am a',
        dynamicText = 'Developer, Designer, Creator',
        staticHeadingText = 'Animated Heading',
        animationType = 'fade-in-up',
        tag = 'h2',
		fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif',
    } = attributes;


	// const fontSizes = useSettings('typography.fontSizes') || [];
	const fontFamilies = useSettings('typography.fontFamilies') || [];

    const blockProps = useBlockProps();

    const animationTypes = [
        { label: 'None', value: 'none' },
        { label: 'Fade In', value: 'fade-in' },
        { label: 'Fade In Up', value: 'fade-in-up' },
        { label: 'Fade In Down', value: 'fade-in-down' },
        { label: 'Slide In Left', value: 'slide-in-left' },
        { label: 'Slide In Right', value: 'slide-in-right' },
        { label: 'Slide In Up', value: 'slide-in-up' },
        { label: 'Slide In Down', value: 'slide-in-down' },
        { label: 'Scale Up', value: 'scale-up' },
        { label: 'Rotate In', value: 'rotate-in' },
        { label: 'Bounce In', value: 'bounce-in' },
    ];

    const TagName = tag;
    const dynamicWords = dynamicText ? dynamicText.split(',').map(s => s.trim()) : ['...'];

    console.log(fontFamily,fontFamilies[0].theme)

    return (
        <>
            <InspectorControls group="styles">
                <PanelBody title={__('Typography', 'animated-heading')} initialOpen={true}>
					{/* <FontSizePicker
						fontSizes={fontSizes}
						value={fontSize}
						fallbackFontSize={16}
						onChange={(newFontSize) => setAttributes({ fontSize: newFontSize })}
                        __next40pxDefaultSize
                    /> */}
					{fontFamilies[0].theme.length > 0 && (
						<SelectControl
							label={__('Font Family', 'animated-heading')}
							value={fontFamily}
							options={[
								{ label: 'Default', value: '' },
								...fontFamilies[0].theme.map(family => ({
									label: family.name,
									value: family.fontFamily.replace(/\\/g, '')
								}))
							]}
							onChange={(newFontFamily) => setAttributes({ fontFamily: newFontFamily })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
						/>
					)}
				</PanelBody>
            </InspectorControls>

            <InspectorControls>
                <PanelBody title={__('Heading Settings', 'custom-blocks')}>
                    <SelectControl
                        label={__('Heading Type', 'custom-blocks')}
                        value={headingType}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
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
                                onChange={(value) => setAttributes({ staticTextPrefix: value })}
                                help={__('The text before the cycling words.', 'custom-blocks')}
                                __next40pxDefaultSize
                                __nextHasNoMarginBottom
                            />
                            <TextareaControl
                                label={__('Dynamic Words (comma-separated)', 'custom-blocks')}
                                value={dynamicText}
                                onChange={(value) => setAttributes({ dynamicText: value })}
                                help={__('Enter words to cycle through, separated by commas.', 'custom-blocks')}
                                __nextHasNoMarginBottom
                            />
                        </>
                    )}

                    {headingType === 'static' && (
                        <TextControl
                            label={__('Heading Text', 'custom-blocks')}
                            value={staticHeadingText}
                            onChange={(value) => setAttributes({ staticHeadingText: value })}
                            __next40pxDefaultSize
                            __nextHasNoMarginBottom
                        />
                    )}
                </PanelBody>
                <PanelBody title={__('Animation & Structure', 'custom-blocks')} initialOpen={false}>
                    <SelectControl
                        label={__('Animation Type', 'custom-blocks')}
                        value={animationType}
                        options={animationTypes}
                        onChange={(value) => setAttributes({ animationType: value })}
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom

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
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom

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


