<?php

namespace App\Http\Controllers\Program;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramPublicController extends Controller
{
    public function index(Request $request)
    {
        $programList = Program::whereIn('status', ['active', 'upcoming'])
            ->orderBy('id_program', 'desc')
            ->paginate(9)
            ->through(fn($item) => [
                'id_program' => $item->id_program,
                'judul' => $item->judul,
                'slug' => $item->slug,
                'excerpt' => $item->excerpt,
                'image' => $item->image,
                'is_open' => $item->is_open,
            ]);

        return Inertia::render('ArsipProgram', [
            'programs' => $programList,
        ]);
    }

    public function show($slug)
    {
        $program = Program::where('slug', $slug)->active()->firstOrFail();

        $programLain = Program::where('id_program', '!=', $program->id_program)
            ->active()
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'judul' => $item->judul,
                'slug' => $item->slug,
                'image' => $item->image,
            ]);

        return Inertia::render('DetailProgram', [
            'program' => [
                'id_program' => $program->id_program,
                'judul' => $program->judul,
                'deskripsi' => $program->deskripsi,
                'image' => $program->image,
                'is_open' => $program->is_open,
                'penulis' => 'Admin',
            ],
            'programLain' => $programLain,
        ]);
    }
}
