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
        'layanan'
    ];

    public function booking()
    {
        return $this->belongsToMany(Booking::class, 'booking_layanan', 'id_layanan', 'id_booking');
    }
}
