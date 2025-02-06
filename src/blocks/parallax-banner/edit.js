import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { Button, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { parallaxMediaId, parallaxMediaUrl } = attributes;
	const blockProps = useBlockProps();
	const containerRef = useRef(); // Reference for the block's container.
	const bannerRef = useRef(null);

	const onSelectImage = ( media ) => {
		console.log( media.id, media.url );
		setAttributes({ parallaxMediaId: media.id, parallaxMediaUrl: media.url });
	};

	useEffect( () => {
		// Get the ownerDocument from our container ref.
		const ownerDocument = containerRef.current && containerRef.current.ownerDocument;
		if ( ! ownerDocument ) {
			return;
		}

		const handleScroll = () => {
			console.log( 'scrolling...' );
			// Use ownerDocument.defaultView to access the window.
			const scroll = ownerDocument.defaultView.scrollY;
			if ( bannerRef.current ) {
				bannerRef.current.style.transform = `translateY(${ scroll * 0.5 }px)`;
			}
		};

		// Attach the scroll event listener to the ownerDocument.
		ownerDocument.addEventListener( 'scroll', handleScroll, true );

		return () => {
			ownerDocument.removeEventListener( 'scroll', handleScroll, true );
		};
	}, []);

	return (
		<div { ...useBlockProps({ ref: containerRef }) }>
			{ ! parallaxMediaUrl && (
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes={ [ 'image' ] }
					value={ parallaxMediaId }
					render={ ( { open } ) => (
						<Button onClick={ open }>
							{ __( 'Upload Image', 'custom-block' ) }
						</Button>
					) }
				/>
			) }

			{ parallaxMediaUrl && (
				<div className="parallax-banner relative h-[70vh] overflow-hidden">
					<div className="pwedeba banner-bg parallax-image absolute inset-0"
            // ref={ bannerRef }
            >
						<img
							src={ parallaxMediaUrl }
							alt="parallax-image"
							className="parallax-image cursor-pointer w-full h-full object-cover"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
