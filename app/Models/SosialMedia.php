<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SosialMedia extends Model
{
    use HasFactory;

    protected $table = 'sosial_media';
    protected $primaryKey = 'id_sosmed';

    protected $fillable = [
        'platform',
        'url',
        'id_identitas',
    ];

    public function identitas()
    {
        return $this->belongsTo(IdentitasUmkm::class, 'id_identitas');
    }
}
