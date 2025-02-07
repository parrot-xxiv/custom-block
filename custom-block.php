<?php
/**
 * Plugin Name:       Custom Block
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-block
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
// function create_block_custom_block_block_init() {
// 	register_block_type( __DIR__ . '/build/featured-post' );
// 	register_block_type( __DIR__ . '/build/another-block' );
// }
// add_action( 'init', 'create_block_custom_block_block_init' );

add_action('init', function() {
  // Automatically register all blocks
  $blocks = glob(__DIR__ . '/build/blocks/*/block.json');
  
  foreach ($blocks as $block) {
    register_block_type($block);
  }
});



function custom_block_category($categories, $editor_context) {
    return array_merge(
        [['slug' => 'my-custom-category', 'title' => '🔥 My Custom Blocks']], // Place at the top
        $categories // Default categories
    );
}
add_filter('block_categories_all', 'custom_block_category', 10, 2);

// Enqueue Tailwind CSS
add_action('enqueue_block_assets', function() {
  wp_enqueue_style(
    'custom-blocks-tailwind',
    plugins_url('build/tailwind.css', __FILE__),
    array(),
    filemtime(plugin_dir_path(__FILE__) . 'build/tailwind.css')
  );
});

function my_theme_setup() {
    add_theme_support( 'align-wide' );
    add_theme_support( 'appearance-tools' );

}

add_action( 'after_setup_theme', 'my_theme_setup' );


function my_plugin_enqueue_scripts() {
    wp_enqueue_script(
        'rellax',
        plugins_url( 'src/blocks/parallax-banner/rellax.min.js', __FILE__ ),
        array(),
        '1.0.0',
        true
    );
    
    wp_enqueue_script(
        'myparallaxscript',
        plugins_url( 'src/blocks/parallax-banner/parallax.js', __FILE__ ),
        array( 'rellax' ),
        '1.0.0',
        true
    );
}
add_action( 'wp_enqueue_scripts', 'my_plugin_enqueue_scripts' );
add_action( 'enqueue_block_editor_assets', 'my_plugin_enqueue_scripts' );



