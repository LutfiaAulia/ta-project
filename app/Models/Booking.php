<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'booking';

    protected $fillable = [
        'jadwal',
        'acara',
        'peserta',
        'layanan',
        'lokasi',
        'no_hp',
        'surat',
        'pegawailap',
        'alasan_ditolak',
        'status_booking',
        'nip',
        'id_instansi',
        'id_mobil',
    ];

    protected $casts = [
        'jadwal' => 'datetime',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'nip');
    }

    public function instansi()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'id_mobil');
    }
}
