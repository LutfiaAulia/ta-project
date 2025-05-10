<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Authenticatable
{
    use HasFactory;

    protected $table = 'pegawai';
    protected $primaryKey = 'nip';

    protected $fillable = [
        'nip',
        'nama',
        'jabatan',
        'password',
        'role',
        'no_hp',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getAuthIdentifierName()
    {
        return 'nip';
    }
}
