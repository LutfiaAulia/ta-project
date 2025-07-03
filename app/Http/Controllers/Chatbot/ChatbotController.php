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
        $message = strtolower($request->input('message'));
        $response = '';

        // --- 1. Cari UMKM berdasarkan kategori produk ---
        $kategoriProduk = Kategori::pluck('nama_kategori')->filter(function ($nama) use ($message) {
            return Str::contains($message, strtolower($nama));
        })->first();

        if ($kategoriProduk) {
            $kategori = Kategori::where('nama_kategori', $kategoriProduk)->first();

            if ($kategori) {
                $umkms = $kategori->umkm()->with('umkm')->take(5)->get();

                if ($umkms->isNotEmpty()) {
                    $response .= "Berikut UMKM dengan kategori *$kategoriProduk*:\n";
                    foreach ($umkms as $identitas) {
                        $url = url("/list/umkm/promosi") . "?id_umkm={$identitas->id_identitas}";
                        $response .= "- {$identitas->nama_usaha} ({$identitas->kabupaten_kota})\n  🔗 $url\n";
                    }

                    return response()->json(['reply' => $response]);
                }
            }
        }


        // --- 2. Cari berdasarkan lokasi ---
        $kabupaten = IdentitasUmkm::distinct()->pluck('kabupaten_kota');
        foreach ($kabupaten as $kab) {
            if (Str::contains($message, strtolower($kab))) {
                $umkms = IdentitasUmkm::where('kabupaten_kota', 'like', "%$kab%")
                    ->take(5)
                    ->get();

                if ($umkms->isNotEmpty()) {
                    $response .= "UMKM yang berada di *$kab*:\n";
                    foreach ($umkms as $u) {
                        $url = url("/umkm/{$u->id_identitas}");
                        $response .= "- {$u->nama_usaha}\n  🔗 $url\n";
                    }
                    return response()->json(['reply' => $response]);
                }
            }
        }

        // --- 3. Cari berdasarkan kata kunci produk (nama_produk) ---
        $keyword = collect(['kopi', 'keripik', 'kue', 'batik', 'sabun']);
        foreach ($keyword as $word) {
            if (Str::contains($message, $word)) {
                $produk = Promosi::with('umkm.identitas_umkm')
                    ->where('nama_produk', 'like', "%$word%")
                    ->take(5)
                    ->get();

                if ($produk->isNotEmpty()) {
                    $response .= "Produk *$word* yang tersedia:\n";
                    foreach ($produk as $p) {
                        $identitas = $p->umkm?->identitas;
                        if ($identitas) {
                            $url = url("/umkm/{$identitas->id_identitas}");
                            $response .= "- {$p->nama_produk} oleh {$identitas->nama_usaha}\n  🔗 $url\n";
                        }
                    }
                    return response()->json(['reply' => $response]);
                }
            }
        }

        // --- 4. Cari berdasarkan harga ---
        if (Str::contains($message, 'di bawah') || Str::contains($message, 'dibawah')) {
            preg_match('/\d+/', $message, $matches);
            $hargaMax = isset($matches[0]) ? (int)$matches[0] * 1000 : 50000;

            $produk = Promosi::with('umkm.identitas_umkm')
                ->where('harga_produk', '<=', $hargaMax)
                ->take(5)
                ->get();

            if ($produk->isNotEmpty()) {
                $response .= "Produk dengan harga di bawah Rp" . number_format($hargaMax) . ":\n";
                foreach ($produk as $p) {
                    $identitas = $p->umkm?->identitas_umkm;
                    if ($identitas) {
                        $url = url("/umkm/{$identitas->id_identitas}");
                        $response .= "- {$p->nama_produk} (Rp" . number_format($p->harga_produk) . ") oleh {$identitas->nama_usaha}\n  🔗 $url\n";
                    }
                }
                return response()->json(['reply' => $response]);
            }
        }

        dd(env('OPENAI_API_KEY'));
        return response()->json([
            'reply' => $this->callOpenAI($message)
        ]);
    }

    private function callOpenAI($userMessage)
    {
        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-3.5-turbo',
            'messages' => [
                ['role' => 'system', 'content' => 'Kamu adalah asisten informasi untuk pengunjung website UMKM.'],
                ['role' => 'user', 'content' => $userMessage],
            ],
        ]);

        return $response['choices'][0]['message']['content'] ?? 'Maaf, saya tidak bisa menjawab itu.';
    }
}
