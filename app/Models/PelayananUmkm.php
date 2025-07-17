<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PelayananUmkm extends Model
{
    use HasFactory;

    protected $table = 'pelayanan_umkm';

    protected $primaryKey = 'id_pelayanan';

    protected $fillable = [
        'id_booking',
        'id_layanan',
        'nama_lengkap',
        'jenis_kelamin',
        'umur',
        'nik',
        'pendidikan',
        'no_hp',
        'nama_usaha',
        'legalitas_usaha',
        'legalitas_produk',
        'alamat_usaha',
        'kabupaten_kota',
        'kecamatan',
        'kenagarian_kelurahan',
        'tenaga_kerja',
        'aset',
        'omset',
        'pendapatan_bersih',
        'pelatihan',
        'tindak_lanjut',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'id_booking');
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class, 'id_layanan');
    }

    public function legalitasProduk()
    {
        return $this->belongsToMany(LegalitasProduk::class, 'pelayanan_legpro', 'id_pelayanan', 'id_legpro');
    }
}
