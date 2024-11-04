<?php
/**
 * Plugin Name: Interactive Universities Map
 * Plugin URI: https://www.geds.fr
 * Description: Carte interactive des universités partenaires
 * Version: 1.0.0
 * Author: GEDS
 * Author URI: https://www.geds.fr
 * License: GPL v2 or later
 * Text Domain: interactive-universities-map
 */

if (!defined('ABSPATH')) {
    exit;
}

define('IUM_VERSION', '1.0.0');
define('IUM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('IUM_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once IUM_PLUGIN_DIR . 'includes/class-interactive-universities-map.php';

function ium_init() {
    $plugin = new Interactive_Universities_Map();
    $plugin->init();
}

add_action('plugins_loaded', 'ium_init');