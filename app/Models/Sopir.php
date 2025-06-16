<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sopir extends Model
{
    use HasFactory;

    protected $table = 'sopir';
    protected $primaryKey = 'id_sopir';

    protected $fillable = [
        'nama',
        'no_hp',
        'alamat',
        'status',
    ];

    public function booking()
    {
        return $this->hasMany(Booking::class, 'id_sopir', 'id_sopir');
    }
}
