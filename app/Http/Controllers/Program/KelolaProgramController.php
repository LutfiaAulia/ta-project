<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KelolaProgramController extends Controller
{
    public function adminIndex()
    {
        return Inertia::render('Pegawai/Program/ListProgram', [
            'program' => Program::orderBy('created_at', 'desc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Pegawai/Program/TambahProgram');
    }

    public function store(Request $request)
    {
        $request->validate([
            'judul'      => 'required|string|max:255',
            'deskripsi'  => 'required',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'excerpt'    => 'nullable|string|max:255',
            'status'     => 'required|in:active,inactive,upcoming',
            'is_open'    => 'required|boolean',
            'id_pegawai' => 'required|exists:pegawai,id',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('program-plut', 'public');
        }

        Program::create([
            'judul'      => $request->judul,
            'slug'       => Str::slug($request->judul) . '-' . Str::random(5),
            'deskripsi'  => $request->deskripsi,
            'image'      => $path,
            'excerpt'    => $request->excerpt,
            'status'     => $request->status,
            'is_open'    => $request->is_open,
            'id_pegawai' => $request->id_pegawai,
        ]);

        return redirect()->route('admin.list.program')->with('success', 'Program berhasil ditambahkan!');
    }

    public function edit($id_program)
    {
        $program = Program::findOrFail($id_program);

        return Inertia::render('Pegawai/Program/EditProgram', [
            'program' => $program,
        ]);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $request->validate([
            'judul'      => 'required|string|max:255',
            'deskripsi'  => 'required',
            'image'      => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'excerpt'    => 'nullable|string|max:255',
            'status'     => 'required|in:active,inactive,upcoming',
            'is_open'    => 'required|boolean',
            'id_pegawai' => 'required|exists:pegawai,id',
        ]);

        $data = $request->only(['judul', 'deskripsi', 'excerpt', 'status', 'is_open', 'id_pegawai']);
        $data['slug'] = Str::slug($request->judul) . '-' . Str::random(5);

        if ($request->hasFile('image')) {
            if ($program->image) {
                Storage::disk('public')->delete($program->image);
            }
            $data['image'] = $request->file('image')->store('program-plut', 'public');
        }

        $program->update($data);

        return redirect()->route('admin.list.program')->with('success', 'Program berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $program = Program::findOrFail($id);

        if ($program->image) {
            Storage::disk('public')->delete($program->image);
        }

        $program->delete();

        return redirect()->back()->with('success', 'Program berhasil dihapus!');
    }
}
