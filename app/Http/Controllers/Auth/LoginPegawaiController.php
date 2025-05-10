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

        // Coba autentikasi menggunakan guard pegawai
        if (Auth::guard('pegawai')->attempt($credentials)) {
            $request->session()->regenerate();

            // Optional: jika kamu ingin redirect berdasarkan role, kamu bisa cek di sini
            // $pegawai = Auth::guard('pegawai')->user();
            // if ($pegawai->role === 'admin') return redirect()->route('pegawai.admin.dashboard');

            return redirect()->intended('/pegawai/dashboard');
        }

        return back()->withErrors([
            'nip' => 'NIP atau password salah.',
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('pegawai')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/pegawai/login');
    }
}
