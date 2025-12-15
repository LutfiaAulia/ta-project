<?php

namespace App\Http\Controllers\Berita;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage as Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KelolaBeritaController extends Controller
{
    public function show()
    {
        $berita = Berita::all();

        return Inertia::render('Pegawai/Berita/ListBerita', [
            'berita' => $berita,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Berita/TambahBerita');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'ringkasan' => 'required|string',
            'konten' => 'required|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'tanggal_publikasi' => 'required|date',
        ]);

        $gambarPath = null;
        if ($request->hasFile('gambar')) {
            $gambarPath = $request->file('gambar')->store('berita_gambar', 'public');
        }

        $slug = Str::slug($request->judul);
        $originalSlug = $slug;
        $count = 1;
        while (Berita::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        Berita::create([
            'judul' => $validated['judul'],
            'slug' => $slug,
            'ringkasan' => $validated['ringkasan'],
            'konten' => $validated['konten'],
            'gambar' => $gambarPath,
            'tanggal_publikasi' => $validated['tanggal_publikasi'],
            'id_pegawai' => Auth::user()->pegawai->id ?? Auth::id(),
        ]);

        return redirect()->route('berita.list')->with('success', 'Berita baru berhasil dipublikasikan');
    }

    public function edit($id_berita)
    {
        $berita = Berita::findOrFail($id_berita);

        return Inertia::render('Pegawai/Berita/EditBerita', [
            'berita' => $berita,
        ]);
    }

    public function update(Request $request, $id_berita)
    {
        $berita = Berita::findOrFail($id_berita);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'ringkasan' => 'required|string',
            'konten' => 'required|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'tanggal_publikasi' => 'required|date',
        ]);

        $dataToUpdate = $validated;
        $newSlug = Str::slug($request->judul);

        if ($newSlug !== $berita->slug) {
            $originalSlug = $newSlug;
            $count = 1;
            while (Berita::where('slug', $newSlug)->where('id_berita', '!=', $berita->id_berita)->exists()) {
                $newSlug = $originalSlug . '-' . $count++;
            }
            $dataToUpdate['slug'] = $newSlug;
        }

        if ($request->hasFile('gambar')) {
            $oldPath = str_replace('storage/', 'public/', $berita->gambar);
            if ($berita->gambar && Storage::exists($oldPath)) {
                Storage::delete($oldPath);
            }

            $gambarPath = $request->file('gambar')->store('berita_gambar');
            $gambarPath = str_replace('public/', 'storage/', $gambarPath);

            $dataToUpdate['gambar'] = $gambarPath;
        } else {
            $dataToUpdate['gambar'] = $berita->gambar;
        }

        $berita->update($dataToUpdate);

        return redirect()->route('berita.list')->with('success', 'Berita berhasil diperbarui!');
    }

    public function destroy($id_berita)
    {
        $berita = Berita::findOrFail($id_berita);

        if ($berita->gambar) {
            $gambarPath = str_replace('storage/', 'public/', $berita->gambar);

            if (Storage::exists($gambarPath)) {
                Storage::delete($gambarPath);
            }
        }

        $berita->delete();

        return redirect()->route('berita.list')->with('success', 'Berita berhasil dihapus');
    }
}
