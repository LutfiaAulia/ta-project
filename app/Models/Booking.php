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
        'user_id',
        'id_mobil',
    ];

    protected $casts = [
        'jadwal' => 'datetime',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'nip');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
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
