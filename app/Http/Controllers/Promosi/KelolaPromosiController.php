<?php

namespace App\Http\Controllers\Promosi;

use App\Http\Controllers\Controller;
use App\Models\LegalitasProduk;
use App\Models\Promosi;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class KelolaPromosiController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $id_umkm = $user->umkm->id ?? null;

        $promosi = Promosi::select('id_promosi', 'nama_produk', 'deskripsi_produk', 'harga_produk', 'status')
            ->where('id_umkm', $id_umkm)
            ->get();

        return Inertia::render('Umkm/ProdukUmkm', [
            'promosi' => $promosi,
            'user_type' => 'umkm',
        ]);
    }

    public function create()
    {
        $legpro = LegalitasProduk::where('status', 'aktif')->get();

        return Inertia::render('Umkm/TambahProduk', [
            'legpro' => $legpro,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori_produk' => 'required|string|max:100',
            'sub_kategori' => 'nullable|string|max:100',
            'harga_produk' => 'required|numeric',
            'deskripsi_produk' => 'required|string',
            'foto_produk' => 'nullable|image|max:2048',
            'legalitas_produk' => 'nullable|array',
            'legalitas_produk.*' => 'exists:legalitas_produk,id_legpro',
        ]);

        $fotoPath = null;
        if ($request->hasFile('foto_produk')) {
            $fotoPath = $request->file('foto_produk')->store('foto_produk', 'public');
        }

        $user = Auth::user();
        $id_umkm = $user->user_type === 'umkm' && $user->umkm
            ? $user->umkm->id
            : null;

        $promosi = Promosi::create([
            'nama_produk' => $request->nama_produk,
            'kategori_produk' => $request->kategori_produk,
            'sub_kategori' => $request->sub_kategori,
            'harga_produk' => $request->harga_produk,
            'deskripsi_produk' => $request->deskripsi_produk,
            'foto_produk' => $fotoPath,
            'id_umkm' => $id_umkm,
            'user_type' => $user->user_type,
        ]);

        if ($request->filled('legalitas_produk')) {
            $promosi->legalitasProduk()->sync($request->legalitas_produk);
        }

        return redirect()->route('umkm.produk')->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit($id)
    {
        $produk = Promosi::with('legalitasProduk')->findOrFail($id);
        $legpro = LegalitasProduk::select('id_legpro', 'singkatan')->where('status', 'aktif')->get();

        $legalitasIds = $produk->legalitasProduk->pluck('id_legpro')->map(fn($id) => (string)$id)->toArray();
        $produkData = $produk->toArray();
        $produkData['legalitas_produk'] = $legalitasIds;

        return inertia('Umkm/EditProduk', [
            'produk' => $produkData,
            'userType' => 'umkm',
            'legalitas_produk' => $legpro,
        ]);
    }

    public function update(Request $request, $id)
    {
        $produk = Promosi::findOrFail($id);

        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori_produk' => 'required|string|max:255',
            'sub_kategori' => 'required|string|max:255',
            'harga_produk' => 'required|numeric',
            'legalitas_produk' => 'required|array',
            'legalitas_produk.*' => 'exists:legalitas_produk,id_legpro',
            'deskripsi_produk' => 'required|string',
            'foto_produk' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto_produk')) {
            if ($produk->foto_produk && Storage::exists('public/' . $produk->foto_produk)) {
                Storage::delete('public/' . $produk->foto_produk);
            }

            $path = $request->file('foto_produk')->store('produk', 'public');
            $validated['foto_produk'] = $path;
        }

        if ($request->filled('legalitas_produk')) {
            $produk->legalitasProduk()->sync($request->legalitas_produk);
        }

        $validated['status'] = 'diajukan';
        $produk->update($validated);

        return redirect()->route('umkm.produk')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $produk = Promosi::findOrFail($id);

        if ($produk->foto_produk && Storage::exists('public/' . $produk->foto_produk)) {
            Storage::delete('public/' . $produk->foto_produk);
        }

        $produk->delete();

        return redirect()->route('umkm.produk')->with('success', 'Produk berhasil dihapus.');
    }

    public function index()
    {
        $umkm = Umkm::with(['user', 'identitas'])->get();

        $mappedUmkm = $umkm->map(function ($item) {
            return [
                'id' => $item->id,
                'nib' => $item->user->nib ?? '-',
                'nama_pemilik' => $item->user->nama ?? '-',
                'nama_usaha' => $item->identitas->nama_usaha ?? '-',
                'kabupaten_kota' => $item->identitas->kabupaten_kota ?? '-',
            ];
        });
        
        $listKabupaten = $umkm->pluck('identitas.kabupaten_kota')->unique()->filter()->values();

        return Inertia::render('Pegawai/Promosi/ListUmkm', [
            'daftar_umkm' => $mappedUmkm,
            'list_kabupaten' => $listKabupaten,
        ]);
    }


    public function showPegawai(Request $request)
    {
        $id_umkm = $request->query('id_umkm');

        $promosi = collect();
        $daftar_umkm = Umkm::with('identitas:id_umkm,nama_usaha')
            ->select('id')
            ->get();

        if ($id_umkm) {
            $promosi = Promosi::select('id_promosi', 'nama_produk', 'deskripsi_produk', 'harga_produk', 'status')
                ->where('id_umkm', $id_umkm)
                ->get();
        }

        return Inertia::render('Umkm/ProdukUmkm', [
            'promosi' => $promosi,
            'user_type' => 'pegawai',
            'daftar_umkm' => $daftar_umkm,
            'selected_umkm' => $id_umkm,
        ]);
    }

    public function editPegawai($id)
    {
        $produk = Promosi::with('umkm')->findOrFail($id);
        $id_umkm = $produk->umkm ? $produk->umkm->id : null;

        return inertia('Umkm/EditProduk', [
            'produk' => $produk,
            'userType' => 'pegawai',
            'id_umkm' => $id_umkm,
        ]);
    }


    public function updatePegawai(Request $request, $id)
    {
        $produk = Promosi::findOrFail($id);

        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'kategori_produk' => 'required|string|max:255',
            'sub_kategori' => 'required|string|max:255',
            'harga_produk' => 'required|numeric',
            'deskripsi_produk' => 'required|string',
            'foto_produk' => 'nullable|image|max:2048',
            'id_umkm' => 'nullable|integer',
        ]);

        if ($request->hasFile('foto_produk')) {
            if ($produk->foto_produk && Storage::exists('public/' . $produk->foto_produk)) {
                Storage::delete('public/' . $produk->foto_produk);
            }
            $path = $request->file('foto_produk')->store('produk', 'public');
            $validated['foto_produk'] = $path;
        }

        $produk->update($validated);
        $id_umkm = $request->input('id_umkm');

        if ($id_umkm) {
            return redirect()->route('pegawai.show.promosi', ['id_umkm' => $id_umkm])->with('success', 'Produk berhasil diperbarui.');
        }

        return redirect()->route('pegawai.show.promosi')->with('success', 'Produk berhasil diperbarui.');
    }

    public function destroyPegawai($id)
    {
        $produk = Promosi::findOrFail($id);

        $id_umkm = $produk->id_umkm;

        if ($produk->foto_produk && Storage::exists('public/' . $produk->foto_produk)) {
            Storage::delete('public/' . $produk->foto_produk);
        }

        $produk->delete();

        return redirect()->route('pegawai.show.promosi', ['id_umkm' => $id_umkm])->with('success', 'Produk berhasil dihapus.');
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', Rule::in(['diajukan', 'diterima', 'ditolak'])],
            'alasan_penolakan' => [
                Rule::requiredIf($request->status === 'ditolak'),
                'nullable',
                'string',
                'max:255'
            ],
        ]);

        $promosi = Promosi::findOrFail($id);
        $promosi->status = $request->status;

        if ($request->status === 'ditolak') {
            $promosi->alasan_penolakan = $request->alasan_penolakan;
        }

        $promosi->save();
        $id_umkm = $promosi->id_umkm;

        return redirect()->route('pegawai.show.promosi', ['id_umkm' => $id_umkm])
            ->with('success', 'Status berhasil diperbarui.');
    }
}
