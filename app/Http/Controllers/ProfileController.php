<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load('instansi'); // Pastikan relasi 'instansi' dimuat

        return Inertia::render('Profile/Edit', [
            'user' => $user,  // Mengirimkan data user beserta instansi
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Jika email berubah, set email_verified_at menjadi null
        if ($validated['email'] !== $user->email) {
            $user->email_verified_at = null;
        }

        // Perbarui data user di tabel 'users'
        $user->fill([
            'nama' => $validated['nama'],
            'email' => $validated['email'],
        ]);
        $user->save();

        // Perbarui atau buat data instansi di tabel 'instansi'
        if ($user->instansi) {
            // Jika data instansi sudah ada, update data instansi
            $user->instansi()->update([
                'nama_instansi' => $validated['nama_instansi'],
                'alamat' => $validated['alamat'],
                'no_hp' => $validated['no_hp'],
            ]);
        } else {
            // Jika data instansi belum ada, buat data instansi baru
            $user->instansi()->create([
                'nama_instansi' => $validated['nama_instansi'],
                'alamat' => $validated['alamat'],
                'no_hp' => $validated['no_hp'],
            ]);
        }

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
