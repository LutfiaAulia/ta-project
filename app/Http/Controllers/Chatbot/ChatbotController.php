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
                'response' => "Maaf, saya tidak menemukan UMKM yang cocok dengan '{$request->message}'.\n\nCoba cari dengan kata kunci:\n• Kategori: makanan, kerajinan, fashion\n• Lokasi: padang, bukittinggi, payakumbuh\n• Atau ketik 'bantuan' untuk panduan lengkap",
            ]);
        }

        $response = "Saya menemukan " . $results->count() . " UMKM yang cocok:\n\n";
        foreach ($results as $index => $umkm) {
            $response .= ($index + 1) . ". *{$umkm->nama_usaha}*\n";
            $response .= "   📍 Lokasi: {$umkm->kabupaten_kota}\n";

            if ($umkm->kategori_umkm && $umkm->kategori_umkm->count()) {
                $kategori = $umkm->kategori_umkm->pluck('nama_kategori')->join(', ');
                $response .= "   🏷️ Kategori: {$kategori}\n";
            }

            if ($umkm->deskripsi) {
                $response .= "   📝 " . Str::limit($umkm->deskripsi, 100) . "\n";
            }

            $sosmed = $umkm->sosial_media->first();
            if ($sosmed && $sosmed->instagram) {
                $response .= "   📱 Instagram: {$sosmed->instagram}\n";
            }

            if ($umkm->promosi && $umkm->promosi->count()) {
                $produkList = $umkm->promosi->take(3)->pluck('nama_produk')->join(', ');
                $response .= "   🛍️ Produk: {$produkList}\n";
            }

            $response .= "\n";
        }

        $response .= "Butuh info lebih detail? Ketik nama UMKM yang ingin Anda ketahui lebih lanjut.";

        return response()->json(['response' => $response]);
    }
}
