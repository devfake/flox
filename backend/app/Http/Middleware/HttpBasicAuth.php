<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class HttpBasicAuth
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, $next)
  {
    if ($request->getUser() == env('HTTP_BASIC_USERNAME') && $request->getPassword() == env('HTTP_BASIC_PASSWORD')) {
      return $next($request);
    }

    $headers = array('WWW-Authenticate' => 'Basic');
    return response('Invalid credentials.', Response::HTTP_UNAUTHORIZED, $headers); 
  }
}
