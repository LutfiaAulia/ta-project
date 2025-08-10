<?php

namespace App\Http\Controllers\Chatbot;

use App\Http\Controllers\Controller;
use App\Models\IdentitasUmkm;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function handle(Request $request)
    {
        $message = strtolower(trim($request->message));

        if (empty($message)) {
            return response()->json(['response' => 'Silakan ketik pertanyaan Anda.']);
        }

        $commonResponses = [
            'halo' => 'Halo! Saya siap membantu Anda mencari informasi UMKM di Sumatera Barat. Silakan tanya tentang produk, kategori, atau lokasi UMKM.',
            'hai' => 'Hai! Ada yang bisa saya bantu tentang UMKM Sumatera Barat?',
            'help' => "Saya bisa membantu Anda mencari UMKM berdasarkan:\n• Kategori (makanan, kerajinan, dll)\n• Lokasi (kota/kabupaten)\n• Nama produk\n\nContoh: \"makanan padang\" atau \"kerajinan payakumbuh\"",
            'bantuan' => "Saya bisa membantu Anda mencari UMKM berdasarkan:\n• Kategori (makanan, kerajinan, dll)\n• Lokasi (kota/kabupaten)\n• Nama produk\n\nContoh: \"makanan padang\" atau \"kerajinan payakumbuh\"",
        ];

        // Jika pesan mengandung kata kunci umum, langsung balas
        foreach ($commonResponses as $keyword => $response) {
            if (strpos($message, $keyword) !== false) {
                return response()->json(['response' => $response]);
            }
        }

        // Pisah kata
        $words = explode(' ', $message);
        $validWords = [];

        // Cek tiap kata, apakah ada di database (minimal 1 kolom/relasi)
        foreach ($words as $word) {
            $word = trim($word);
            if ($word === '') continue;

            $exists = IdentitasUmkm::where('kabupaten_kota', 'like', "%$word%")
                ->orWhere('kecamatan', 'like', "%$word%")
                ->orWhere('kanagarian_kelurahan', 'like', "%$word%")
                ->orWhereHas('kategori_umkm', fn($q) => $q->where('nama_kategori', 'like', "%$word%"))
                ->orWhereHas('promosi', fn($q) => $q->where('nama_produk', 'like', "%$word%"))
                ->orWhere('nama_usaha', 'like', "%$word%")
                ->exists();

            if ($exists) {
                $validWords[] = $word;
            }
        }

        if (empty($validWords)) {
            return response()->json([
                'type' => 'text',
                'response' => 'Maaf, kata yang Anda masukkan tidak dikenali. Silakan gunakan kata kunci seperti kategori, lokasi, atau produk UMKM yang anda cari.'
            ]);
        }

        // Query dengan AND antar kata valid
        $query = IdentitasUmkm::with(['kategori_umkm', 'sosial_media', 'promosi', 'umkm'])
            ->where(function ($q) use ($validWords) {
                foreach ($validWords as $word) {
                    $q->where(function ($qq) use ($word) {
                        $qq->where('kabupaten_kota', 'like', "%$word%")
                            ->orWhere('kecamatan', 'like', "%$word%")
                            ->orWhere('kanagarian_kelurahan', 'like', "%$word%")
                            ->orWhereHas('kategori_umkm', fn($qk) => $qk->where('nama_kategori', 'like', "%$word%"))
                            ->orWhereHas('promosi', fn($qp) => $qp->where('nama_produk', 'like', "%$word%"))
                            ->orWhere('nama_usaha', 'like', "%$word%");
                    });
                }
            });

        $results = $query->limit(5)->get();

        if ($results->isEmpty()) {
            return response()->json([
                'type' => 'text',
                'response' => "Maaf, saya tidak menemukan UMKM yang cocok dengan Anda cari."
            ]);
        }

        return response()->json([
            'type' => 'umkm_list',
            'data' => $results->map(function ($umkm) {
                return [
                    'id' => $umkm->id_identitas,
                    'name' => $umkm->nama_usaha,
                    'image' => $umkm->foto_usaha,
                    'kategori' => $umkm->kategori_umkm->pluck('nama_kategori')->implode(', '),
                    'lokasi' => "{$umkm->kabupaten_kota}, {$umkm->kanagarian_kelurahan}",
                    'produk' => $umkm->umkm?->promosi->take(5)->map(fn($p) => $p->nama_produk)->toArray() ?? [],
                ];
            }),
        ]);
    }
}
