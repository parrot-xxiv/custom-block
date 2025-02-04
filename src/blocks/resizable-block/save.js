import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
  const { postsToShow } = attributes;
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div className="featured-posts-grid">
        {postsToShow}
      </div>
    </div>
  );
}