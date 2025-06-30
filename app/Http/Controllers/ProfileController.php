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
        $user = $request->user()->load('instansi');

        return Inertia::render('Profile/Edit', [
            'user' => $user, 
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

        if ($validated['email'] !== $user->email) {
            $user->email_verified_at = null;
        }

        $user->fill([
            'nama' => $validated['nama'],
            'email' => $validated['email'],
        ]);
        $user->save();

        if ($user->instansi) {
            $user->instansi()->update([
                'nama_instansi' => $validated['nama_instansi'],
                'alamat' => $validated['alamat'],
                'no_hp' => $validated['no_hp'],
            ]);
        } else {
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
