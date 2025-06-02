<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingPelayananUmkm extends Model
{
    use HasFactory;

    protected $table = 'booking_pelayananumkm';

    protected $fillable = [
        'id_booking',
        'id_pelayanan',
        'total_aset',
        'omset',
        'pengeluaran',
        'pendapat_bersih',
        'pelatihan',
        'id_layanan',
        'permasalahan',
    ];

    public function pelayanan()
    {
        return $this->belongsTo(PelayananUmkm::class, 'id_pelayanan');
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'id_booking');
    }

    public function layanan()
    {
        return $this->belongsTo(Layanan::class, 'id_layanan', 'id_layanan');
    }
}
