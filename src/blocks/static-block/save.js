import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  
  // In a static block using apiVersion: 3, useBlockProps.save() adds any necessary classes and attributes.
	const blockProps = useBlockProps.save();
	// Since attributes are persisted, RichText.Content will output the saved content.
	return (
		<div { ...blockProps }>
      <div className={`bg-green-500 p-4`}>
        <h2 className="text-2xl font-bold mb-4">Static Block</h2>
        <div className="">
          Stathicc..
        </div>
      </div>
		</div>
	);
}