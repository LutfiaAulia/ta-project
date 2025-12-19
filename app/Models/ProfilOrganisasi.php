<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilOrganisasi extends Model
{
    use HasFactory;

    protected $table = 'profil_organisasi';
    protected $primaryKey = 'id_proforg';

    protected $fillable = [
        'id_proforg',
        'visi',
        'misi',
        'tugas',
        'fungsi',
        'maklumat_pelayanan',
        'gambar_struktur',
        'id_pegawai',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai');
    }
}
