import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    BlockControls,
    AlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    TextareaControl,
    SelectControl,
    Button,
    Icon,
    __experimentalToolsPanel as ToolsPanel,
    __experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';

// Import editor styles
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { headings = [], textAlign } = attributes;

    // Add a unique ID to each heading if it doesn't have one.
    // This is crucial for React's key prop and for stable rendering.
    useEffect(() => {
        const needsId = headings.some(h => !h.id);
        if (needsId) {
            setAttributes({
                headings: headings.map(h => ({ ...h, id: h.id || uuidv4() })),
            });
        }
    }, [headings]);


    const blockProps = useBlockProps({
        className: `has-text-align-${textAlign || 'left'}`,
    });

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

    const updateHeading = (index, key, value) => {
        const newHeadings = [...headings];
        newHeadings[index] = { ...newHeadings[index], [key]: value };
        setAttributes({ headings: newHeadings });
    };

    const addHeading = () => {
        setAttributes({
            headings: [
                ...headings,
                {
                    id: uuidv4(),
                    staticText: 'I am a',
                    dynamicText: 'Developer, Designer, Creator',
                    animationType: 'fade-in-up',
                    tag: 'h2',
                    // Default style values that can be overridden by typography controls
                    style: {
                        typography: {
                            fontSize: '32px',
                            fontStyle: 'normal',
                            fontWeight: '700',
                        },
                        color: { text: '#333333' }
                    }
                },
            ],
        });
    };

    const removeHeading = (index) => {
        const newHeadings = headings.filter((_, i) => i !== index);
        setAttributes({ headings: newHeadings });
    };

    const onTextAlignChange = (newAlign) => {
        setAttributes({ textAlign: newAlign });
    };


    return (
        <>
            <InspectorControls group="settings">
                <PanelBody title={__('Heading Items', 'custom-blocks')} initialOpen={true}>
                    {headings.map((heading, index) => (
                        <PanelBody key={heading.id} title={`${__('Heading', 'custom-blocks')} ${index + 1}`} initialOpen={false}>
                            <div className="dynamic-heading-repeater-item">
                                <TextControl
                                    label={__('Static Text', 'custom-blocks')}
                                    value={heading.staticText}
                                    onChange={(value) => updateHeading(index, 'staticText', value)}
                                    help={__('The text that appears before the dynamic words.', 'custom-blocks')}
                                />
                                <TextareaControl
                                    label={__('Dynamic Text (comma-separated)', 'custom-blocks')}
                                    value={heading.dynamicText}
                                    onChange={(value) => updateHeading(index, 'dynamicText', value)}
                                    help={__('Enter words separated by commas. E.g., Fun, Exciting, Awesome', 'custom-blocks')}
                                />
                                <SelectControl
                                    label={__('Animation Type', 'custom-blocks')}
                                    value={heading.animationType}
                                    options={animationTypes}
                                    onChange={(value) => updateHeading(index, 'animationType', value)}
                                />
                                <SelectControl
                                    label={__('HTML Tag', 'custom-blocks')}
                                    value={heading.tag || 'h2'}
                                    options={[
                                        { label: 'H1', value: 'h1' },
                                        { label: 'H2', value: 'h2' },
                                        { label: 'H3', value: 'h3' },
                                        { label: 'H4', value: 'h4' },
                                        { label: 'H5', value: 'h5' },
                                        { label: 'H6', value: 'h6' },
                                        { label: 'p', value: 'p' },
                                    ]}
                                    onChange={(value) => updateHeading(index, 'tag', value)}
                                />
                                <Button
                                    isDestructive
                                    variant="secondary"
                                    onClick={() => removeHeading(index)}
                                    className="repeater-remove-button"
                                >
                                    <Icon icon={trash} />
                                    {__('Remove Heading', 'custom-blocks')}
                                </Button>
                            </div>
                        </PanelBody>
                    ))}
                    <Button variant="primary" onClick={addHeading}>
                        <Icon icon={plus} />
                        {__('Add Heading', 'custom-blocks')}
                    </Button>
                </PanelBody>
            </InspectorControls>

            <InspectorControls group="styles">
                 <ToolsPanel label={__('Typography & Colors', 'custom-blocks')}>
                    {/* These controls are now suggestions. The user can use the Global Styles UI. */}
                    <p>Use the style controls in the toolbar or the Styles tab to customize appearance.</p>
                 </ToolsPanel>
            </InspectorControls>


            <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={onTextAlignChange}
                />
            </BlockControls>


            <div {...blockProps}>
                {headings.length === 0 ? (
                    <div className="dynamic-heading-placeholder">
                        <p>{__('Add a heading from the settings panel to get started.', 'custom-blocks')}</p>
                        <Button variant="primary" onClick={addHeading}>
                            {__('Add Heading', 'custom-blocks')}
                        </Button>
                    </div>
                ) : (
                    headings.map((heading, index) => {
                        const TagName = heading.tag || 'h2';
                        const dynamicWords = heading.dynamicText ? heading.dynamicText.split(',').map(s => s.trim()) : ['...'];
                        const headingStyle = {
                            color: heading.style?.color?.text,
                            fontSize: heading.style?.typography?.fontSize,
                            fontStyle: heading.style?.typography?.fontStyle,
                            fontWeight: heading.style?.typography?.fontWeight,
                        };

                        return (
                            <TagName
                                key={heading.id}
                                className="dynamic-heading-editor-preview"
                                style={headingStyle}
                            >
                                <span className="static-text">{heading.staticText}&nbsp;</span>
                                <span className="dynamic-text-wrapper">
                                    <span className="dynamic-text">{dynamicWords[0]}</span>
                                </span>
                            </TagName>
                        );
                    })
                )}
            </div>
        </>
    );
}

