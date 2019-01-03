<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Cookie;

class AfterMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Cookie::get('X-CSRF-TOKEN',false) !== csrf_token())
            return $next($request)->header('X-CSRF-TOKEN',csrf_token());

        return $next($request);
    }
}