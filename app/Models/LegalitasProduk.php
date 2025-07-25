<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LegalitasProduk extends Model
{
    use HasFactory;

    protected $table = 'legalitas_produk';
    protected $primaryKey = 'id_legpro';

    protected $fillable = [
        'nama_legalitas',
        'singkatan',
        'deskripsi',
        'status',
    ];

    public function pelayanan_umkm()
    {
        return $this->belongsToMany(PelayananUmkm::class, 'pelayanan_legpro', 'id_legpro', 'id_pelayanan');
    }

    public function promosi()
    {
        return $this->belongsToMany(Promosi::class, 'produk_legpro', 'id_legpro', 'id_promosi');
    }
}
