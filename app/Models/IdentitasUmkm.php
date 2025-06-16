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
        'alamat_usaha',
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
}
