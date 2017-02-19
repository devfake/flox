<?php

namespace App\Http\Middleware;

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
      if($request->getUser() == config('auth.HTTP_BASIC_USERNAME') && $request->getPassword() == config('auth.HTTP_BASIC_PASSWORD')) {
        return $next($request);
      }

      return response('Invalid credentials.', Response::HTTP_UNAUTHORIZED, ['WWW-Authenticate' => 'Basic']);
    }
}
