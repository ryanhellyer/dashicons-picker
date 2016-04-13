<?php

/**
 * Plugin Name: Dashicons Picker Example Widget
 * Description: A plugin to showcase the dashicons picker as a widget
 * Author:      Ryan Hellyer
 * Author URI:  https://geek.hellyer.kiwi/
 * Version:     1.0
 */


/**
 * Adds Dashicons_Picker_Widget widget.
 */
class Dashicons_Picker_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {
		parent::__construct(
			'dashicons_picker_widget', // Base ID
			__( 'Widget Title', 'text_domain' ), // Name
			array( 'description' => __( 'A Dashicons Picker Widget', 'text_domain' ), ) // Args
		);

		add_action( 'admin_enqueue_scripts', array( $this, 'scripts' ) );
	}

	/**
	 * Enqueue dashicons picker scripts
	 */
	public function scripts() {

		$plugin_url = plugin_dir_url( __FILE__ );

		wp_enqueue_style( 'dashicons-picker',  $plugin_url . 'css/dashicons-picker.css', array( 'dashicons' ), '1.0', false );
		wp_enqueue_script( 'dashicons-picker', $plugin_url . 'js/dashicons-picker.js',   array( 'jquery'    ), '1.1', true  );
	}

	/**
	 * Back-end widget form.
	 *
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {

		?>

		<table class="form-table">
			<tr>
				<th scope="row">
					<label for="<?php echo $this->get_field_id( 'fontawesome-icon' ); ?>"><?php _e( 'Icon' ); ?></label>
				</th>
				<td>
					<input class="regular-text" type="text" id="<?php echo $this->get_field_id( 'fontawesome-icon' ); ?>" name="<?php echo $this->get_field_name( 'fontawesome-icon' ); ?>" value="<?php if( isset( $options['icon1'] ) ) { echo esc_attr( $options['icon1'] ); } ?>"/>
					<input type="button" data-target="#<?php echo $this->get_field_id( 'fontawesome-icon' ); ?>" class="button dashicons-picker" value="Choose Icon" />
				</td>
			</tr>
		</table><?php 
	}

}

// register Foo_Widget widget
function register_dashicons_picker_widget() {
	register_widget( 'Dashicons_Picker_Widget' );
}
add_action( 'widgets_init', 'register_dashicons_picker_widget' );
