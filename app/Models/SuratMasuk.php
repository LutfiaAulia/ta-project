<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuratMasuk extends Model
{
    use HasFactory;

    protected $table = 'surat_masuk';
    protected $primaryKey = 'id_surat';

    protected $fillable = [
        'no_surat',
        'asal_surat',
        'perihal',
        'keterangan',
        'tgl_diterima',
        'tgl_surat',
        'surat',
        'id_pegawai',
        'id_booking',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'id_booking');
    }

    public function disposisi()
    {
        return $this->hasMany(Disposisi::class, 'id_surat', 'id_surat');
    }
    
}
