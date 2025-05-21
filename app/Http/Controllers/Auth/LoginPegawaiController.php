<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginPegawaiController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/LoginPegawai');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'nip' => ['required'],
            'password' => ['required'],
        ]);

        if (Auth::attempt([
            'nip' => $credentials['nip'],
            'password' => $credentials['password'],
            'user_type' => 'pegawai',
            'status' => 'aktif',
        ])) {
            $request->session()->regenerate();

            return redirect()->intended('/pegawai/dashboard');
        }

        return back()->withErrors([
            'nip' => 'NIP atau password salah.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/pegawai/login');
    }
}
