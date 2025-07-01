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

            $pegawai = Auth::user()->pegawai;
            $role = $pegawai?->role;

            switch ($role) {
                case 'Admin':
                    return redirect()->intended('/pegawai/dashboardAdmin');
                case 'Kepala Dinas':
                    return redirect()->intended('/pegawai/dashboardKadin');
                case 'Kepala Bidang':
                    return redirect()->intended('/pegawai/dashboardKabid');
                case 'Pegawai Lapangan':
                    return redirect()->intended('/pegawai/dashboardLapangan');
                case 'Administrasi Umum':
                    return redirect()->intended('/pegawai/dashboardAdm');
                default:
                    return redirect()->intended('/pegawai/login');
            }
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
