<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistrationRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Password;

class AuthenticationController extends Controller
{
    public function login(LoginRequest $request): UserResource
    {
        $data = $request->validated();
        $user = User::query()->where('email', $data['email'])->first();
        if (!Hash::check($data['password'], $user['password'])) {
            throw ValidationException::withMessages(
                ['email' => 'Username or password is incorrect.']
            );
        }
        $user->access_token = $user->createToken('token', ['*'], now()->addDay())->plainTextToken;
        Cookie::queue(
            Cookie::make(
                'access_token',
                $user->access_token,
                1440,
                '/',
                null,
                false,
                true,
                false,
            )
        );
        return new UserResource($user);
    }

    public function registration(RegistrationRequest $request): USerResource
    {
        $data = $request->validated();
        $user = user::query()->create($data);
        $user->access_token = $user->createToken('token', ['*'], now()->addDay())->plainTextToken;
        Cookie::queue(
            Cookie::make(
                'access_token',
                $user->access_token,
                1440,
                '/',
                null,
                true,
                false,
                false,
            )
        );
        return new UserResource($user);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }

        return response()->json();
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }

        return response()->json();
    }
}
