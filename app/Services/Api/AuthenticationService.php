<?php

namespace App\Services\Api;

use App\Models\User;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class AuthenticationService
{
    public function login(array $data): User
    {
        $user = User::query()->where('email', $data['email'])->first();
        if (!Hash::check($data['password'], $user->password)) {
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

        return $user;
    }

    public function registration(array $data): User
    {
        $user = User::query()->create($data);

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

        return $user;
    }

    public function forgotPassword(array $data): void
    {
        $status = Password::sendResetLink($data);
        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [trans($status)],
            ]);
        }
    }

    public function resetPassword(array $data): void
    {
        $status = Password::reset(
            $data,
            function (User $user, string $password) {
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

    }
}
