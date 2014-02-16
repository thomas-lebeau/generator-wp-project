<?php
/**
 * WordPress configurations on "wp-config.php" file.
 * For more information visit {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php} Codex page.
 *
 * @package WordPress
 */

/* Authentication Unique Keys and Salts. */
/* https://api.wordpress.org/secret-key/1.1/salt/ */
define('AUTH_KEY',         '<%= salts.authKey %>');
define('SECURE_AUTH_KEY',  '<%= salts.secureAuthKey %>');
define('LOGGED_IN_KEY',    '<%= salts.loggedInKey %>');
define('NONCE_KEY',        '<%= salts.nonceKey %>');
define('AUTH_SALT',        '<%= salts.authSalt %>');
define('SECURE_AUTH_SALT', '<%= salts.secureAuthSalt %>');
define('LOGGED_IN_SALT',   '<%= salts.loggedInSalt %>');
define('NONCE_SALT',       '<%= salts.nonceSalt %>');

/* MySQL database table prefix. */
$table_prefix = 'wp_';

if ( file_exists( dirname( __FILE__ ) . '/wp-config-local.php' ) ) {
    require( 'wp-config-local.php' );
} else if ( file_exists( dirname( __FILE__ ) . '/wp-config-staging.php' ) ) {
    require( 'wp-config-staging.php' );
} else {
  /* MySQL settings */
  define('DB_NAME',     '');
  define('DB_USER',     '');
  define('DB_PASSWORD', '');
  define('DB_HOST',     'localhost');
  define('DB_CHARSET',  'utf8');

  /* Custom WordPress URL. */
  define('WP_HOME',        '<%= wpHome %>');
  define('WP_SITEURL',     WP_HOME . '/wp');
}

define('WP_CONTENT_DIR', dirname(__FILE__) . '/wp-content');
define('WP_CONTENT_URL', WP_HOME . '/wp-content');


/* WordPress Localized Language. */
define('WPLANG', '');

/* Absolute path to the WordPress directory. */
if (!defined('ABSPATH'))
  define('ABSPATH', dirname(__FILE__) . '/');

/* Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
