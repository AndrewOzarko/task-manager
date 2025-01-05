<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function logout(): JsonResponse
    {
        /** @var User $user */
        $user = auth()->user();

        /** @var PersonalAccessToken $currentToken */
        $currentToken = $user->currentAccessToken();
        $currentToken->update(['expires_at' => now()->subHour()]);

        return response()->json();
    }

}
