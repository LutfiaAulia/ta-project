<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginUmkmController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/LoginUmkm');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'nib' => ['required'],
            'password' => ['required'],
        ]);

        $userNonaktif = \App\Models\User::where('nib', $credentials['nib'])
            ->where('user_type', 'umkm')
            ->where('status', 'nonaktif')
            ->first();

        if ($userNonaktif) {
            return back()->withErrors([
                'nib' => 'Akun Anda dinonaktifkan, silakan hubungi admin.'
            ]);
        }

        if (Auth::attempt([
            'nib' => $credentials['nib'],
            'password' => $credentials['password'],
            'user_type' => 'umkm',
            'status' => 'aktif'
        ])) {
            $request->session()->regenerate();

            return redirect()->intended('/umkm/dashboard');
        }

        return back()->withErrors([
            'nib' => 'NIB atau Password Salah'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
