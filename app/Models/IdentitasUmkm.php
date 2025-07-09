<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IdentitasUmkm extends Model
{
    use HasFactory;

    protected $table = 'identitas_umkm';
    protected $primaryKey = 'id_identitas';

    protected $fillable = [
        'id_umkm',
        'nama_usaha',
        'jenis_usaha',
        'kabupaten_kota',
        'kecamatan',
        'kanagarian_kelurahan',
        'alamat_detail',
        'deskripsi',
        'foto_usaha',
        'latitude',
        'longitude',
    ];

    public function umkm()
    {
        return $this->belongsTo(Umkm::class, 'id_umkm');
    }

    public function sosial_media()
    {
        return $this->hasMany(SosialMedia::class, 'id_identitas');
    }

    public function kategori_umkm()
    {
        return $this->belongsToMany(Kategori::class, 'umkm_kategori', 'id_identitas', 'id_kategori');
    }

    public function promosi()
    {
        return $this->hasMany(Promosi::class, 'id_umkm', 'id_umkm');
    }
}
