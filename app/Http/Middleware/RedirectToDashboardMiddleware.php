<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class RedirectToDashboardMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (isset($_COOKIE['access_token'])) {
            $token = PersonalAccessToken::findToken($_COOKIE['access_token']);
            if ($token && $token->expires_at > now()) {
                return redirect('/');
            }
            unset($_COOKIE['access_token']);
            setcookie('access_token', '', -1, '/');
        }
        return $next($request);
    }
}
