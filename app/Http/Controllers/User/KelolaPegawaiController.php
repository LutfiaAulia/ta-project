<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KelolaPegawaiController extends Controller
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
}
