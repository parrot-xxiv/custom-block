import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    InspectorControls,
    RichText,
    URLInput 
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    ToggleControl,
    SelectControl,
    ColorPalette,
    RangeControl
} from '@wordpress/components';
import { registerBlockType } from '@wordpress/blocks';
import './editor.scss';

registerBlockType('custom-blocks/navigation', {
    edit: ({ attributes, setAttributes }) => {
        const {
            navItems = [],
            alignment = 'left',
            showBorder = true,
            backgroundColor = '#ffffff',
            textColor = '#333333',
            activeColor = '#007cba',
            fontSize = 16,
            spacing = 20
        } = attributes;

        const blockProps = useBlockProps({
            className: `nav-alignment-${alignment}`
        });

        const addNavItem = () => {
            const newItems = [...navItems, { text: 'New Item', url: '#', isActive: false }];
            setAttributes({ navItems: newItems });
        };

        const updateNavItem = (index, field, value) => {
            const newItems = [...navItems];
            newItems[index][field] = value;
            setAttributes({ navItems: newItems });
        };

        const removeNavItem = (index) => {
            const newItems = navItems.filter((_, i) => i !== index);
            setAttributes({ navItems: newItems });
        };

        const navStyles = {
            backgroundColor,
            padding: `${spacing/2}px ${spacing}px`,
            border: showBorder ? '1px solid #ddd' : 'none',
            borderRadius: showBorder ? '4px' : '0',
            display: 'flex',
            justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
            gap: `${spacing}px`
        };

        const linkStyles = (isActive) => ({
            color: isActive ? activeColor : textColor,
            fontSize: `${fontSize}px`,
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: isActive ? `${activeColor}20` : 'transparent'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Navigation Settings', 'custom-blocks')} initialOpen={true}>
                        <SelectControl
                            label={__('Alignment', 'custom-blocks')}
                            value={alignment}
                            options={[
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                                { label: 'Right', value: 'right' }
                            ]}
                            onChange={(value) => setAttributes({ alignment: value })}
                        />
                        
                        <ToggleControl
                            label={__('Show Border', 'custom-blocks')}
                            checked={showBorder}
                            onChange={(value) => setAttributes({ showBorder: value })}
                        />

                        <RangeControl
                            label={__('Font Size', 'custom-blocks')}
                            value={fontSize}
                            onChange={(value) => setAttributes({ fontSize: value })}
                            min={12}
                            max={24}
                        />

                        <RangeControl
                            label={__('Spacing', 'custom-blocks')}
                            value={spacing}
                            onChange={(value) => setAttributes({ spacing: value })}
                            min={10}
                            max={40}
                        />
                    </PanelBody>

                    <PanelBody title={__('Colors', 'custom-blocks')} initialOpen={false}>
                        <div style={{ marginBottom: '16px' }}>
                            <label>{__('Background Color', 'custom-blocks')}</label>
                            <ColorPalette
                                value={backgroundColor}
                                onChange={(value) => setAttributes({ backgroundColor: value || '#ffffff' })}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label>{__('Text Color', 'custom-blocks')}</label>
                            <ColorPalette
                                value={textColor}
                                onChange={(value) => setAttributes({ textColor: value || '#333333' })}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label>{__('Active Color', 'custom-blocks')}</label>
                            <ColorPalette
                                value={activeColor}
                                onChange={(value) => setAttributes({ activeColor: value || '#007cba' })}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody title={__('Navigation Items', 'custom-blocks')} initialOpen={false}>
                        {navItems.map((item, index) => (
                            <div key={index} style={{ marginBottom: '16px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
                                <TextControl
                                    label={__(`Item ${index + 1} Text`, 'custom-blocks')}
                                    value={item.text}
                                    onChange={(value) => updateNavItem(index, 'text', value)}
                                />
																<TextControl
                                    label={__(`URL`, 'custom-blocks')}
                                    value={item.url}
                                    onChange={(value) => updateNavItem(index, 'url', value)}
                                />
                                <ToggleControl
                                    label={__('Active Item', 'custom-blocks')}
                                    checked={item.isActive}
                                    onChange={(value) => updateNavItem(index, 'isActive', value)}
                                />
                                <button 
                                    className="button button-secondary"
                                    onClick={() => removeNavItem(index)}
                                    style={{ marginTop: '8px' }}
                                >
                                    {__('Remove Item', 'custom-blocks')}
                                </button>
                            </div>
                        ))}
                        
                        <button 
                            className="button button-primary"
                            onClick={addNavItem}
                        >
                            {__('Add Navigation Item', 'custom-blocks')}
                        </button>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <nav style={navStyles}>
                        {navItems.map((item, index) => (
                            <a 
                                key={index} 
                                href={item.url}
                                style={linkStyles(item.isActive)}
                                onClick={(e) => e.preventDefault()}
                            >
                                {item.text}
                            </a>
                        ))}
                    </nav>
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const {
            navItems = [],
            alignment = 'left',
            showBorder = true,
            backgroundColor = '#ffffff',
            textColor = '#333333',
            activeColor = '#007cba',
            fontSize = 16,
            spacing = 20
        } = attributes;

        const blockProps = useBlockProps.save({
            className: `nav-alignment-${alignment}`
        });

        const navStyles = {
            backgroundColor,
            padding: `${spacing/2}px ${spacing}px`,
            border: showBorder ? '1px solid #ddd' : 'none',
            borderRadius: showBorder ? '4px' : '0',
            display: 'flex',
            justifyContent: alignment === 'center' ? 'center' : alignment === 'right' ? 'flex-end' : 'flex-start',
            gap: `${spacing}px`
        };

        const linkStyles = (isActive) => ({
            color: isActive ? activeColor : textColor,
            fontSize: `${fontSize}px`,
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: isActive ? `${activeColor}20` : 'transparent'
        });

        return (
            <div {...blockProps}>
                <nav style={navStyles}>
                    {navItems.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.url}
                            style={linkStyles(item.isActive)}
                        >
                            {item.text}
                        </a>
                    ))}
                </nav>
            </div>
        );
    }
});
