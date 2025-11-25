<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    protected $table = 'berita';
    protected $primaryKey = 'id_berita';

    protected $fillable = [
        'judul',
        'slug',
        'ringkasan',
        'konten',
        'gambar',
        'tanggal_publikasi',
        'id_pegawai'
    ];

    /**
     * Relasi Pegawai
     */
    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai');
    }
}
