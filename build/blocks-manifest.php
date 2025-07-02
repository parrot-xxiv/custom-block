<?php
// This file is generated. Do not modify it manually.
return array(
	'animated-heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/animated-heading',
		'version' => '0.1.0',
		'title' => 'Animated Heading',
		'category' => 'custom-category',
		'icon' => 'smiley',
		'description' => 'Animated Heading',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'textColor' => array(
				'default' => '#FF0000',
				'type' => 'string'
			),
			'content' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'h1,h2,h3,h4,h5,h6',
				'default' => 'Animated Heading'
			),
			'level' => array(
				'type' => 'number',
				'default' => 2
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'fadeInUp'
			),
			'duration' => array(
				'type' => 'number',
				'default' => 1
			),
			'delay' => array(
				'type' => 'number',
				'default' => 0
			),
			'triggerOnScroll' => array(
				'type' => 'boolean',
				'default' => true
			),
			'fontSize' => array(
				'type' => 'string'
			),
			'fontFamily' => array(
				'type' => 'string'
			),
			'fontWeight' => array(
				'type' => 'string'
			),
			'textTransform' => array(
				'type' => 'string'
			),
			'letterSpacing' => array(
				'type' => 'string'
			),
			'lineHeight' => array(
				'type' => 'string'
			),
			'textAlign' => array(
				'type' => 'string'
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'gradient' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'custom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'dynamic-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/dynamic-block',
		'version' => '0.1.0',
		'title' => 'Dynamic Block',
		'category' => 'custom-category',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'custom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'dynamic-heading' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/dynamic-heading',
		'version' => '0.1.0',
		'title' => 'Dynamic Heading',
		'category' => 'custom-category',
		'icon' => 'smiley',
		'description' => 'Dynamic Heading',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'styles' => true
		),
		'textdomain' => 'custom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'textColor' => array(
				'default' => '#FF0000',
				'type' => 'string'
			),
			'content' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'h1,h2,h3,h4,h5,h6',
				'default' => 'Animated Heading'
			),
			'level' => array(
				'type' => 'number',
				'default' => 2
			),
			'animationType' => array(
				'type' => 'string',
				'default' => 'fadeInUp'
			),
			'duration' => array(
				'type' => 'number',
				'default' => 1
			),
			'delay' => array(
				'type' => 'number',
				'default' => 0
			),
			'triggerOnScroll' => array(
				'type' => 'boolean',
				'default' => true
			),
			'fontSize' => array(
				'type' => 'string'
			),
			'fontFamily' => array(
				'type' => 'string'
			)
		)
	),
	'navigation' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/navigation',
		'version' => '0.1.0',
		'title' => 'Navigation',
		'category' => 'custom-category',
		'icon' => 'smiley',
		'description' => 'Navigation',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'custom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'static-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'custom-blocks/static-block',
		'version' => '0.1.0',
		'title' => 'Static Block',
		'category' => 'custom-category',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'content' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'p'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'showBorder' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'textdomain' => 'custom-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
