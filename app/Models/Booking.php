<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'booking';
    protected $primaryKey = 'id_booking';

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

    public function pegawaiLapangan()
    {
        return $this->belongsToMany(Pegawai::class, 'booking_pegawai', 'id_booking', 'id_pegawai');
    }

    public function instansi()
    {
        return $this->belongsTo(Instansi::class, 'id_instansi');
    }

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'id_mobil');
    }

    public function layanan()
    {
        return $this->belongsToMany(Layanan::class, 'booking_layanan', 'id_booking', 'id_layanan');
    }
}
