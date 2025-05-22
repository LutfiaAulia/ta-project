<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobil extends Model
{
    use HasFactory;

    protected $table = 'mobil';
    protected $primaryKey = 'id_mobil';

    protected $fillable = [
        'nama_mobil',
        'plat_mobil',
        'status',
    ];

    public function booking()
    {
        return $this->hasMany(Booking::class, 'id_mobil', 'id_mobil');
    }

    public function sedangDigunakan($tanggalMulai, $tanggalAkhir, $waktuMulai, $waktuAkhir)
    {
        return $this->booking()
            ->whereDate('tanggal_mulai', '<=', $tanggalAkhir)
            ->whereDate('tanggal_akhir', '>=', $tanggalMulai)
            ->whereTime('waktu_mulai', '<=', $waktuAkhir)
            ->whereTime('waktu_akhir', '>=', $waktuMulai)
            ->exists();
    }
}
