<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
                'status' => $user->status,
            ];
        });

        return Inertia::render('Pegawai/ListUser', [
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
            'status' => 'aktif',
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

    public function updateStatus(Request $request, string $type, int $id)
    {
        $request->validate([
            'status' => 'required|in:aktif,nonaktif'
        ]);

        $user = User::where('id', $id)->where('user_type', $type)->first();

        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        $user->status = $request->input('status');
        $user->save();

        return response()->json(['message' => 'Status user berhasil diubah']);
    }

    public function edit($id): Response
    {
        $user = User::with(['pegawai', 'instansi', 'umkm'])->findOrFail($id);

        $data = [
            'id' => $user->id,
            'user_type' => $user->user_type,
            'nama' => $user->nama,
            'nip' => $user->nip,
            'nib' => $user->nib,
            'nik' => optional($user->umkm)->nik,
            'no_hp' => optional($user->pegawai)->no_hp ?? optional($user->umkm)->no_hp ?? optional($user->instansi)->no_hp,
            'jabatan' => optional($user->pegawai)->jabatan,
            'role' => optional($user->pegawai)->role,
            'email' => $user->email,
            'nama_instansi' => optional($user->instansi)->nama_instansi,
        ];

        return Inertia::render('Pegawai/EditUser', [
            'user' => $data,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::with(['pegawai','instansi', 'umkm'])->findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:18',
            'nib' => 'nullable|string|max:13',
            'nik' => 'nullable|string|max:16',
            'no_hp' => 'nullable|string|min:12|max:13',
            'jabatan' => 'nullable|string|max:100',
            'role' => Rule::requiredIf($user->user_type === 'pegawai'),
            'email' => Rule::requiredIf($user->user_type === 'instansi'),
            'nama_instansi' => Rule::requiredIf($user->user_type === 'instansi'),
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user->nama = $validated['nama'];
        if ($request->filled('password')) {
            $user->password = bcrypt($validated['password']);
        }

        if ($user->user_type === 'pegawai') {
            $user->nip = $validated['nip'];
            $user->save();

            $user->pegawai()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'no_hp' => $validated['no_hp'],
                    'jabatan' => $validated['jabatan'],
                    'role' => $validated['role'],
                ]
            );
        } elseif ($user->user_type === 'umkm') {
            $user->nib = $validated['nib'];
            $user->save();

            $user->umkm()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'nik' => $validated['nik'],
                    'no_hp' => $validated['no_hp'],
                ]
            );
        } elseif ($user->user_type === 'instansi') {
            $user->email = $validated['email'];
            $user->save();

            $user->instansi()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'nama_instansi' => $validated['nama_instansi'],
                    'no_hp' => $validated['no_hp'],
                ]
            );
        }

        return redirect()->route('user.show', ['type' => $user->user_type])
            ->with('success', 'User berhasil diperbarui');
    }
}
