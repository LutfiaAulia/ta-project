<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    use HasFactory;

    protected $table = 'layanan';
    protected $primaryKey = 'id_layanan';

    protected $fillable = [
        'id_bidang',
        'layanan',
        'deskripsi_layanan'
    ];

    public function bidang()
    {
        return $this->belongsTo(BidangLayanan::class, 'id_bidang', 'id_bidang');
    }

    public function booking()
    {
        return $this->belongsToMany(Booking::class, 'booking_layanan', 'id_layanan', 'id_booking');
    }

    public function pelayananUmkm()
    {
        return $this->hasMany(PelayananUmkm::class, 'id_layanan');
    }
}
