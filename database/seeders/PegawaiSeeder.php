<?php

namespace Database\Seeders;

use App\Models\Pegawai;
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
        Pegawai::create([
            'nip' => '198403262023012008',
            'nama' => 'Andi Kurniawan',
            'jabatan' => 'Staff Umum',
            'password' => Hash::make('12345678'),
            'role' => 'pegawai',
            'no_hp' => '081234567890',
        ]);

        Pegawai::create([
            'nip' => '199007082022011008',
            'nama' => 'Siti Rahma',
            'jabatan' => 'Kepala Bidang',
            'password' => Hash::make('rahasia321'),
            'role' => 'admin',
            'no_hp' => '089876543210',
        ]);
    }
}
