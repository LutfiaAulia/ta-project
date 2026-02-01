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

        return Inertia::render('Pegawai/User/ListUser', [
            'users' => $users,
            'currentType' => $type,
        ]);
    }

    public function create(Request $request): Response
    {
        $type = $request->query('type');
        return Inertia::render('Pegawai/User/TambahUser', [
            'user_type' => $type,
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'user_type' => 'required|in:pegawai,umkm',
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:18',
            'no_hp' => 'nullable|string|min:12|max:13',
            'jabatan' => 'nullable|string|max:100',
            'password' => 'required|string|min:8|confirmed',
        ];

        if ($request->user_type === 'umkm') {
            $rules['nib'] = ['required', 'string', 'max:16', \Illuminate\Validation\Rule::unique('users', 'nib')];
            $rules['nik'] = ['required', 'string', 'max:16', \Illuminate\Validation\Rule::unique('umkm', 'nik')];
        }

        if ($request->user_type === 'pegawai') {
            $rules['role'] = 'required|string|in:Admin,Kepala Bidang,Pegawai Lapangan,Administrasi Umum,Kepala Dinas';
        }

        $validated = $request->validate($rules);

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

        return Inertia::render('Pegawai/User/EditUser', [
            'user' => $data,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::with(['pegawai', 'instansi', 'umkm'])->findOrFail($id);

        $rules = [
            'nama' => 'required|string|max:255',
            'nip' => 'nullable|string|max:18',
            'no_hp' => 'nullable|string|min:12|max:13',
            'jabatan' => 'nullable|string|max:100',
            'password' => 'nullable|string|min:8|confirmed',
        ];

        if ($user->user_type === 'umkm') {
            $rules['nib'] = [
                'required',
                'string',
                'max:16',
                \Illuminate\Validation\Rule::unique('users', 'nib')->ignore($user->id),
            ];
            $rules['nik'] = [
                'required',
                'string',
                'max:16',
                \Illuminate\Validation\Rule::unique('umkm', 'nik')->ignore(optional($user->umkm)->id ?? null, 'id'),
            ];
        }

        if ($user->user_type === 'pegawai') {
            $rules['role'] = 'required|string|in:Admin,Pegawai Lapangan,Kepala PLUT';
        }

        if ($user->user_type === 'instansi') {
            $rules['email'] = 'required|email';
            $rules['nama_instansi'] = 'required|string|max:255';
        }

        $validated = $request->validate($rules);
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
