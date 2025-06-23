<?php

namespace App\Http\Controllers\Promosi;
use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Umkm;
use App\Models\SosialMedia;
use Illuminate\Support\Facades\Storage;

class KelolaDataUmkmController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        $umkm = Umkm::with(['identitas', 'identitas.sosial_media', 'identitas.kategori_umkm'])
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('Umkm/IdentitasUmkm', [
            'umkm' => $umkm,
            'kategori_umkm' => Kategori::select('id_kategori', 'nama_kategori')->get(),
        ]);
    }


    public function update(Request $request)
    {
        $user = $request->user();
        $umkm = Umkm::where('user_id', $user->id)->firstOrFail();
        $identitas = $umkm->identitas;

        $validated = $request->validate([
            'jenis_usaha' => 'required|string|max:255',
            'nama_usaha' => 'required|string|max:255',
            'kabupaten_kota' => 'required|string|max:255',
            'kecamatan' => 'required|string|max:255',
            'kanagarian_kelurahan' => 'required|string|max:255',
            'alamat_detail' => 'required|string|max:255',
            'no_hp' => 'required|string|max:13',
            'deskripsi' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'foto_usaha' => 'nullable|image|max:2048',
            'instagram' => 'nullable|string|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'kategori_umkm' => 'nullable|array',
            'kategori_umkm.*' => 'integer|exists:kategori,id_kategori',
        ]);

        $umkm->update([
            'no_hp' => $validated['no_hp'],
        ]);

        $identitasData = [
            'jenis_usaha' => $validated['jenis_usaha'],
            'nama_usaha' => $validated['nama_usaha'],
            'kabupaten_kota' => $validated['kabupaten_kota'],
            'kecamatan' => $validated['kecamatan'],
            'kanagarian_kelurahan' => $validated['kanagarian_kelurahan'],
            'alamat_detail' => $validated['alamat_detail'],
            'deskripsi' => $validated['deskripsi'] ?? null,
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
        ];

        if ($request->hasFile('foto_usaha')) {
            if ($identitas && $identitas->foto_usaha) {
                Storage::disk('public')->delete($identitas->foto_usaha);
            }

            $fotoPath = $request->file('foto_usaha')->store('foto_usaha', 'public');
            $identitasData['foto_usaha'] = $fotoPath;
        }

        $identitas = $umkm->identitas()->updateOrCreate([], $identitasData);
        $kategoriIds = $request->input('kategori_umkm', []);
        $identitas->kategori_umkm()->sync($kategoriIds);

        $sosmedData = [
            'instagram' => $validated['instagram'],
            'whatsapp' => $validated['whatsapp'],
            'facebook' => $validated['facebook'],
        ];

        foreach ($sosmedData as $platform => $url) {
            if ($url) {
                SosialMedia::updateOrCreate(
                    [
                        'platform' => $platform,
                        'id_identitas' => $identitas->id_identitas,
                    ],
                    [
                        'url' => $url
                    ]
                );
            } else {
                SosialMedia::where('platform', $platform)
                    ->where('id_identitas', $identitas->id_identitas)
                    ->delete();
            }
        }

        return back()->with('success', 'Data berhasil diperbarui.');
    }
}
