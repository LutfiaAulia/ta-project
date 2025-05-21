<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KelolaUserController extends Controller
{
    public function show(Request $request): Response
    {
        $type = $request->query('type');

        $query = User::query()->with(['pegawai']);

        if ($type === 'pegawai') {
            $query->where('user_type', 'pegawai')->with('pegawai');
        } elseif ($type === 'instansi') {
            $query->where('user_type', 'instansi');
        } elseif ($type === 'umkm') {
            $query->where('user_type', 'umkm');
        }

        $users = $query->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'type' => $user->user_type,
                'nama' => $user->nama,
                'nip' => $user->user_type === 'pegawai' ? $user->nip : null,
                'nib' => $user->user_type === 'umkm' ? $user->nib : null,
                'email' => $user->user_type === 'instansi' ? $user->email : null,
                'pegawai' => $user->pegawai ? ['role' => $user->pegawai->role] : null,
            ];
        });

        return Inertia::render('Pegawai/KelolaUser', [
            'users' => $users,
            'currentType' => $type,
        ]);
    }

    public function create(Request $request): Response
    {
        $type = $request->query('type');
        return Inertia::render('Pegawai/TambahUser', [
            'user_type' => $type,
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_type' => 'required|in:pegawai,umkm',
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:18',
            'nib' => 'nullable|string|max:13',
            'nik' => 'nullable|string|max:16',
            'no_hp' => 'nullable|string|min:12|max:13',
            'jabatan' => 'nullable|string|max:100',
            'role' => $request->user_type === 'pegawai' ? 'required|string|in:Admin,Kabid,Lapangan,AdmUmum,Kadin' : '',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'nama' => $validated['nama'],
            'password' => bcrypt($validated['password']),
            'nip' => $validated['user_type'] === 'pegawai' ? $validated['nip'] : null,
            'nib' => $validated['user_type'] === 'umkm' ? $validated['nib'] : null,
            'user_type' => $validated['user_type'],
        ]);

        if ($validated['user_type'] === 'pegawai') {
            $user->pegawai()->create([
                'no_hp' => $validated['no_hp'],
                'jabatan' => $validated['jabatan'],
                'role' => $validated['role'],
            ]);
        } elseif ($validated['user_type'] === 'umkm') {
            $user->umkm()->create([
                'nik' => $validated['nik'],
                'no_hp' => $validated['no_hp'],
            ]);
        }

        return redirect()->route('user.show', ['type' => $validated['user_type']])
            ->with('success', 'User berhasil ditambahkan');
    }
}
