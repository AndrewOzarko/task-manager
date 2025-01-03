<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\RedirectResponse;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function logout(): RedirectResponse
    {
        /** @var PersonalAccessToken $currentToken */
        $currentToken = auth()->user()->currentAccessToken();
        $currentToken->update(['expires_at' => now()->subHour()]);
        return redirect('/crm/login');
    }

}
