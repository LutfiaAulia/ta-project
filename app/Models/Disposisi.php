<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disposisi extends Model
{
    use HasFactory;

    protected $table = 'disposisi';
    protected $primaryKey = 'id_disposisi';

    protected $fillable = [
        'isi',
        'tanggal',
        'tujuan',
        'catatan',
        'id_surat',
        'id_pegawai',
    ];

    /**
     * Relasi ke SuratMasuk
     */
    public function surat_masuk()
    {
        return $this->belongsTo(SuratMasuk::class, 'id_surat', 'id_surat');
    }

    /**
     * Relasi ke User
     */
    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai');
    }
}
