<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BidangLayanan extends Model
{
    use HasFactory;

    protected $table = 'bidang_layanan';
    protected $primaryKey = 'id_bidang';

    protected $fillable = [
        'nama_bidang',
        'status'
    ];

    public function layanan()
    {
        return $this->hasMany(Layanan::class, 'id_bidang', 'id_bidang');
    }
}
