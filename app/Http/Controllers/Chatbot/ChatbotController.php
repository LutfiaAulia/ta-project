<?php

namespace App\Http\Controllers\Chatbot;

use App\Http\Controllers\Controller;
use App\Models\IdentitasUmkm;
use App\Models\Kategori;
use App\Models\Promosi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ChatbotController extends Controller
{
    public function handle(Request $request)
    {
        $message = strtolower(trim($request->message));

        if (empty($message)) {
            return response()->json(['response' => 'Silakan ketik pertanyaan Anda.']);
        }

        // Keyword umum & respons sederhana
        $commonResponses = [
            'halo' => 'Halo! Saya siap membantu Anda mencari informasi UMKM di Sumatera Barat. Silakan tanya tentang produk, kategori, atau lokasi tertentu.',
            'hai' => 'Hai! Ada yang bisa saya bantu tentang UMKM Sumatera Barat?',
            'help' => "Saya bisa membantu Anda mencari UMKM berdasarkan:\n• Kategori (makanan, kerajinan, dll)\n• Lokasi (kota/kabupaten)\n• Nama produk\n\nContoh: \"makanan padang\" atau \"kerajinan payakumbuh\"",
            'bantuan' => "Saya bisa membantu Anda mencari UMKM berdasarkan:\n• Kategori (makanan, kerajinan, dll)\n• Lokasi (kota/kabupaten)\n• Nama produk\n\nContoh: \"makanan padang\" atau \"kerajinan payakumbuh\"",
        ];

        foreach ($commonResponses as $keyword => $response) {
            if (strpos($message, $keyword) !== false) {
                return response()->json(['response' => $response]);
            }
        }

        // Jika bukan keyword umum, lanjut pencarian fleksibel
        $keywords = explode(' ', $message);

        $query = IdentitasUmkm::with(['kategori_umkm', 'sosial_media', 'promosi', 'umkm'])
            ->where(function ($q) use ($keywords) {
                foreach ($keywords as $word) {
                    $q->orWhere('kabupaten_kota', 'like', "%$word%")
                        ->orWhereHas('kategori_umkm', fn($qq) => $qq->where('nama_kategori', 'like', "%$word%"))
                        ->orWhereHas('promosi', fn($qq) => $qq->where('nama_produk', 'like', "%$word%"))
                        ->orWhere('nama_usaha', 'like', "%$word%")
                        ->orWhere('deskripsi', 'like', "%$word%");
                }
            });

        $results = $query->limit(5)->get();

        if ($results->isEmpty()) {
            return response()->json([
                'type' => 'text', 
                'response' => "Maaf, saya tidak menemukan UMKM yang cocok ..."
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
            })
        ]);
    }
}
