<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddAccessTokenToHeaderMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (isset($_COOKIE['access_token'])) {
            $accessToken = $_COOKIE['access_token'];
            $request->headers->set('Authorization', 'Bearer ' . $accessToken);
        }
        return $next($request);
    }
}
