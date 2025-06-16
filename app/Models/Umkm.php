<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Umkm extends Model
{
    use HasFactory;

    protected $table = 'umkm';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'nib',
        'nik',
        'nama',
        'no_hp',
        'tanggal_lahir',
        'alamat',
    ];

    /**
     * Relasi ke model User (satu UMKM dimiliki oleh satu user)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function identitas()
    {
        return $this->hasOne(IdentitasUmkm::class, 'id_umkm');
    }
}
