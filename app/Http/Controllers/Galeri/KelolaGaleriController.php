<?php

namespace App\Http\Controllers\Galeri;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KelolaGaleriController extends Controller
{
    public function index()
    {
        $galeri = Galeri::with('pegawai:id_pegawai,nama_pegawai')
            ->orderBy('tanggal', 'desc')
            ->paginate(9);

        return Inertia::render('HalamanGaleri', [
            'galeri' => $galeri
        ]);
    }

    public function adminIndex()
    {
        return Inertia::render('Pegawai/Galeri/ListGaleri', [
            'galeri' => Galeri::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Galeri/TambahGaleri');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul'      => 'required|string|max:255',
            'gambar'     => 'required|image|mimes:jpg,jpeg,png|max:2048',
            'tanggal'    => 'required|date',
            'keterangan' => 'nullable|string',
        ]);

        $path = null;
        if ($request->hasFile('gambar')) {
            $path = $request->file('gambar')->store('galeri-kegiatan', 'public');
        }

        Galeri::create([
            'judul'      => $request->judul,
            'slug'       => Str::slug($request->judul) . '-' . Str::random(5),
            'gambar'     => $path,
            'tanggal'    => $request->tanggal,
            'keterangan' => $request->keterangan,
            'id_pegawai' => Auth::id(),
        ]);

        return redirect()->route('index.galeri')->with('message', 'Galeri berhasil ditambahkan!');
    }

    public function edit($id_galeri)
    {
        $galeri = Galeri::findOrFail($id_galeri);

        return Inertia::render('Pegawai/Galeri/EditGaleri', [
            'galeri' => $galeri,
        ]);
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::findOrFail($id);

        $request->validate([
            'judul'      => 'required|string|max:255',
            'gambar'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tanggal'    => 'required|date',
            'keterangan' => 'nullable|string',
        ]);

        $data = [
            'judul'      => $request->judul,
            'slug'       => Str::slug($request->judul) . '-' . Str::random(5),
            'tanggal'    => $request->tanggal,
            'keterangan' => $request->keterangan,
        ];

        if ($request->hasFile('gambar')) {
            Storage::disk('public')->delete($galeri->gambar);
            $data['gambar'] = $request->file('gambar')->store('galeri-kegiatan', 'public');
        }

        $galeri->update($data);

        return redirect()->back()->with('message', 'Galeri berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $galeri = Galeri::findOrFail($id);

        if ($galeri->gambar) {
            Storage::disk('public')->delete($galeri->gambar);
        }

        $galeri->delete();

        return redirect()->back()->with('message', 'Galeri berhasil dihapus!');
    }
}
