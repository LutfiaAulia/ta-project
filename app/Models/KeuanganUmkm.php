<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeuanganUmkm extends Model
{
    use HasFactory;

    protected $table = 'keuangan_umkm';
    protected $primaryKey = 'id_keuangan';

    protected $fillable = [
        'umkm_id',
        'tahun',
        'aset',
        'omset',
        'jumlah_karyawan',
    ];

    public function umkm()
    {
        return $this->belongsTo(Umkm::class, 'umkm_id');
    }

    public function getAsetRpAttribute()
    {
        return 'Rp ' . number_format($this->aset, 0, ',', '.');
    }

    public function getOmsetRpAttribute()
    {
        return 'Rp ' . number_format($this->omset, 0, ',', '.');
    }
}
