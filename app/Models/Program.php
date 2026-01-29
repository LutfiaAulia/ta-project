<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    Use HasFactory;

    protected $table = 'program_plut';
    protected $primaryKey = 'id_program';

    protected $fillable = [
        'judul',
        'slug',
        'deskripsi',
        'image',
        'excerpt',
        'status',
        'is_open',
        'id_pegawai',
    ];

    protected $casts = [
        'is_open' => 'boolean',
    ];

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
