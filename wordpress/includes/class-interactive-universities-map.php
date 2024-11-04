<?php

class Interactive_Universities_Map {
    public function init() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_shortcode('interactive_universities_map', array($this, 'render_map'));
    }

    public function enqueue_scripts() {
        // Enregistrement des styles et scripts uniquement si le shortcode est présent
        if (is_singular() && has_shortcode(get_post()->post_content, 'interactive_universities_map')) {
            // Styles
            wp_enqueue_style(
                'interactive-universities-map',
                IUM_PLUGIN_URL . 'assets/css/bundle.css',
                array(),
                IUM_VERSION
            );

            // Scripts
            wp_enqueue_script(
                'interactive-universities-map',
                IUM_PLUGIN_URL . 'assets/js/bundle.js',
                array(),
                IUM_VERSION,
                true
            );

            // Configuration et données
            wp_localize_script(
                'interactive-universities-map',
                'iumData',
                array(
                    'ajaxUrl' => admin_url('admin-ajax.php'),
                    'nonce' => wp_create_nonce('ium_nonce'),
                    'pluginUrl' => IUM_PLUGIN_URL
                )
            );
        }
    }

    public function render_map($atts = array()) {
        // Fusion des attributs avec les valeurs par défaut
        $atts = shortcode_atts(array(
            'height' => '800px',
            'width' => '100%'
        ), $atts);

        // Conteneur pour notre application React
        $output = sprintf(
            '<div id="interactive-universities-map" style="height: %s; width: %s;"></div>',
            esc_attr($atts['height']),
            esc_attr($atts['width'])
        );

        return $output;
    }
}