<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = 'kategori';
    protected $primaryKey = 'id_kategori';

    protected $fillable = [
        'nama_kategori'
    ];

    public function identitas_umkm()
    {
        return $this->belongsToMany(IdentitasUmkm::class,'umkm_kategori','id_kategori', 'id_identitas');
    }
}
