<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promosi extends Model
{
    use HasFactory;

    protected $table = 'promosi';
    protected $primaryKey = 'id_promosi';

    protected $fillable = [
        'nama_produk',
        'kategori_produk',
        'harga_produk',
        'deskripsi_produk',
        'foto_produk',
        'user_id',
        'user_type',
    ];

    /**
     * Relasi ke model User.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
