<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PelayananUmkm extends Model
{
    use HasFactory;

    protected $table = 'pelayanan_umkm';

    protected $primaryKey = 'id_pelayanan';

    protected $fillable = [
        'nama_lengkap',
        'nik',
        'alamat_lengkap',
        'email',
        'no_hp',
        'nama_usaha',
        'bentuk_usaha',
        'sektor_usaha',
        'legalitas_usaha',
        'pembiayaan',
        'nib',
        'alamat_usaha',
        'modal_usaha',
    ];

    public function bookingPelayananUmkm()
    {
        return $this->hasMany(BookingPelayananUmkm::class, 'id_pelayanan');
    }
}
