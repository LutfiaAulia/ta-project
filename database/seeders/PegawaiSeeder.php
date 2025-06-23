<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Pegawai;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PegawaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Makanan & Minuman',
            'Kerajinan Tangan',
            'Pakaian & Tekstil',
            'Pertanian & Perkebunan',
            'Perikanan & Kelautan',
            'Jasa & Servis',
            'Teknologi & Elektronik',
            'Kesehatan & Kecantikan',
            'Pendidikan & Pelatihan',
            'Properti & Real Estate',
            'Otomotif',
            'Perdagangan & Retail',
            'Pariwisata & Hospitality',
            'Peralatan Rumah Tangga',
            'Mainan & Hiburan',
            'Lain-lain'
        ];

        foreach ($categories as $categoryName) {
            Kategori::create([
                'nama_kategori' => $categoryName,
            ]);
        }
    }
}
