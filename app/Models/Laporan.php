<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    protected $table = 'laporan';
    protected $primaryKey = 'id_laporan';

    protected $fillable = [
        'judul',
        'dasar',
        'maksud',
        'tujuan',
        'biaya',
        'ringkasan_pelaksana',
        'kesimpulan',
        'saran',
        'nama_penulis',
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

    public function dokumentasi()
    {
        return $this->hasMany(Dokumentasi::class, 'id_laporan', 'id_laporan');
    }
}
