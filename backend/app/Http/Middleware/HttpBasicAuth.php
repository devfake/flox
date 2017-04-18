<?php

namespace App\Http\Middleware;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

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
      if(Auth::check() || Auth::validate(['username' => $request->getUser(), 'password' => $request->getPassword()])) {
        return $next($request);
      }

      return response('Invalid credentials.', Response::HTTP_UNAUTHORIZED, ['WWW-Authenticate' => 'Basic']);
    }
}
