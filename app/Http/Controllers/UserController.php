<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function logout(): JsonResponse
    {
        /** @var PersonalAccessToken $currentToken */
        $currentToken = auth()->user()->currentAccessToken();
        $currentToken->update(['expires_at' => now()->subHour()]);

        return response()->json();
    }

}
