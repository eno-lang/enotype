<?php declare(strict_types=1);

namespace Enotype\En;
use \Exception;
use \DateTime;
use \DateTimeZone;

class Loaders {
  private const COLOR_REGEXP = '/^\s*#[0-9a-f]{3}([0-9a-f]{3})?\s*$/i';
  private const DATE_REGEXP = '/^\s*(\d{4})-(\d\d)-(\d\d)\s*$/';
  private const DATETIME_REGEXP = '/^\s*(\d{4})(?:-(\d\d)(?:-(\d\d)(?:T(\d\d):(\d\d)(?::(\d\d)(?:\.(\d+))?)?(?:(Z)|([+\-])(\d\d):(\d\d)))?)?)?\s*$/';
  private const EMAIL_REGEXP = '/^\s*[^@\s]+@[^@\s]+\.[^@\s]+\s*$/';
  private const FLOAT_REGEXP = '/^\s*-?\d+(\.\d+)?\s*$/';
  private const INTEGER_REGEXP = '/^\s*-?\d+\s*$/';
  private const LAT_LNG_REGEXP = '/^\s*(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/';
  private const URL_REGEXP = '/^\s*https?:\/\/[^\s.]+\.\S+\s*$/';

  public static function boolean($value) {
    $lower = strtolower(trim($value));
  
    if($lower === 'true') return true;
    if($lower === 'false') return false;
    if($lower === 'yes') return true;
    if($lower === 'no') return false;
  
    throw new Exception('A boolean is required - allowed values are \'true\', \'false\', \'yes\' and \'no\'.');
  }
  
  public static function color($value) {
    if(!preg_match(self::COLOR_REGEXP, $value)) {
      throw new Exception('A color is required, for instance \'#B6D918\', \'#fff\' or \'#01b\'.');
    }
  
    return $value;
  }
  
  public static function commaSeparated($value) {
    return array_map(
      function($item) { return trim($item); },
      explode(',', $value)
    );
  }
  
  public static function date($value) {
    $matched = preg_match(self::DATE_REGEXP, $value, $match);
  
    if(!$matched) {
      throw new Exception('A valid date is required, for instance \'1993-11-18\'.');
    }
  
    $date_time = new DateTime('0000-00-00', new DateTimeZone('UTC'));
    $date_time->setDate(
      intval($match[1]),
      intval($match[2]),
      intval($match[3])
    );
  
    return $date_time;
  }
  
  public static function datetime($value) {
    $matched = preg_match(self::DATETIME_REGEXP, $value, $match, PREG_UNMATCHED_AS_NULL);
  
    if(!$matched) {
      throw new Exception('A valid date or date and time are required, for instance \'1961-01-22\' or \'1989-11-09T19:17Z\' (see https://www.w3.org/TR/NOTE-datetime).');
    }
  
    $timezone_sign = isset($match[9]) ? $match[9] : '+';
    $timezone_hour = isset($match[10]) ? $match[10] : '00';
    $timezone_minutes = isset($match[11]) ? $match[11] : '00';
    $timezone = new DateTimeZone(
      isset($match[8]) ? '+0000' : "{$timezone_sign}{$timezone_hour}{$timezone_minutes}"
    );
  
    $date_time = new DateTime('0000-00-00', $timezone);
  
    $date_time->setDate(
      intval($match[1]),
      isset($match[2]) ? intval($match[2]) : 1,
      isset($match[3]) ? intval($match[3]) : 1
    );
    $date_time->setTime(
      isset($match[4]) ? intval($match[4]) : 0,
      isset($match[5]) ? intval($match[5]) : 0,
      isset($match[6]) ? intval($match[6]) : 0,
      isset($match[7]) ? (int)(floatval("0.{$match[7]}") * 1000000) : 0
    );
  
    return $date_time;
  }
  
  public static function email($value) {
    if(!preg_match(self::EMAIL_REGEXP, $value)) {
      throw new Exception('A valid email address is required, for instance \'jane.doe@eno-lang.org\'.');
    }
  
    return $value;
  }
  
  public static function float($value) {
    if(!preg_match(self::FLOAT_REGEXP, $value)) {
      throw new Exception('A decimal number is required, for instance \'13.0\', \'-9.159\' or \'42\'.');
    }
  
    return floatval($value);
  }
  
  public static function integer($value) {
    if(!preg_match(self::INTEGER_REGEXP, $value)) {
      throw new Exception('An integer is required, for instance \'42\' or \'-21\'.');
    }
  
    return intval($value);
  }
  
  public static function json($value) {
    $decoded = json_decode($value);
  
    switch(json_last_error()) {
      case JSON_ERROR_NONE:
          return $decoded;
      case JSON_ERROR_DEPTH:
        $error = 'Maximum stack depth exceeded';
        break;
      case JSON_ERROR_STATE_MISMATCH:
        $error = 'Underflow or the modes mismatch';
        break;
      case JSON_ERROR_CTRL_CHAR:
        $error = 'Unexpected control character found';
        break;
      case JSON_ERROR_SYNTAX:
        $error = 'Syntax error, malformed JSON';
        break;
      case JSON_ERROR_UTF8:
        $error = 'Malformed UTF-8 characters, possibly incorrectly encoded';
        break;
      default:
        $error = 'Unknown error';
        break;
    }
  
    throw new Exception("Valid JSON is required - the parser returned:\n" . $error);
  }
  
  public static function latLng($value) {
    $matched = preg_match(self::LAT_LNG_REGEXP, $value, $match);
  
    if(!$matched) {
      throw new Exception('A valid latitude/longitude coordinate pair is required, for instance \'48.2093723, 16.356099\'.');
    }
  
    return [ 'lat' => floatval($match[1]), 'lng' => floatval($match[2]) ];
  }
  
  public static function url($value) {
    if(!preg_match(self::URL_REGEXP, $value)) {
      throw new Exception('A valid URL is required, for instance \'https://eno-lang.org\'.');
    }
  
    return $value;
  }
}