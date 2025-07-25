<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promosi extends Model
{
    use HasFactory;

    protected $table = 'promosi';
    protected $primaryKey = 'id_promosi';

    protected $fillable = [
        'nama_produk',
        'kategori_produk',
        'sub_kategori',
        'harga_produk',
        'deskripsi_produk',
        'foto_produk',
        'status',
        'alasan_penolakan',
        'id_umkm',
        'user_type',
    ];

    /**
     * Relasi ke model User.
     */
    public function umkm()
    {
        return $this->belongsTo(Umkm::class, 'id_umkm');
    }

    public function legalitasProduk()
    {
        return $this->belongsToMany(LegalitasProduk::class, 'produk_legpro', 'id_promosi', 'id_legpro');
    }
}
