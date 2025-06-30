<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\Umkm;
use Illuminate\Support\Facades\Auth;

class KelolaProfilController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load('umkm');

        return inertia('Umkm/Profil', [
            'nib' => $user->nib,
            'nama' => $user->nama,
            'nik' => $user->umkm->nik ?? '',
            'noHp' => $user->umkm->no_hp ?? '',
            'tanggalLahir' => $user->umkm->tanggal_lahir ?? '',
            'alamat' => $user->umkm->alamat ?? '',
        ]);
    }

    public function updateProfile(Request $request)
    {
        /**
         * @var \App\Models\User $user
         */
        $user = Auth::user();

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|max:20',
            'noHp' => 'required|string|max:20',
            'tanggalLahir' => 'required|date',
            'alamat' => 'required|string|max:1000',
        ]);

        $user->update([
            'nama' => $validated['nama'],
        ]);

        $umkm = $user->umkm ?? new Umkm(['user_id' => $user->id]);

        $umkm->fill([
            'nik' => $validated['nik'],
            'no_hp' => $validated['noHp'],
            'tanggal_lahir' => $validated['tanggalLahir'],
            'alamat' => $validated['alamat'],
        ])->save();

        return redirect()->back()->with('success', 'Profil berhasil diperbarui.');
    }

    public function updatePassword(Request $request)
    {
        /**
         * @var \App\Models\User $user
         */
        $user = Auth::user();

        $validated = $request->validate([
            'currentPassword' => 'required',
            'newPassword' => ['required', 'confirmed', Password::min(8)],
        ]);

        if (!Hash::check($validated['currentPassword'], $user->password)) {
            return back()->withErrors(['currentPassword' => 'Password lama tidak cocok.']);
        }

        $user->update([
            'password' => Hash::make($validated['newPassword']),
        ]);

        return redirect()->back()->with('success', 'Password berhasil diganti.');
    }
}
