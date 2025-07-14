<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $table = 'booking';
    protected $primaryKey = 'id_booking';

    protected $fillable = [
        'tanggal_mulai',
        'tanggal_akhir',
        'waktu_mulai',
        'waktu_akhir',
        'acara',
        'peserta',
        'layanan',
        'kabupaten_kota',
        'kecamatan',
        'kenagarian_kelurahan',
        'lokasi',
        'no_hp',
        'surat',
        'pegawailap',
        'alasan_ditolak',
        'status_booking',
        'nip',
        'id_instansi',
        'id_mobil',
        'id_sopir',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_akhir' => 'date',
        'waktu_mulai' => 'datetime',
        'waktu_akhir' => 'datetime',
    ];

    public function pegawaiLapangan()
    {
        return $this->belongsToMany(Pegawai::class, 'booking_pegawai', 'id_booking', 'id_pegawai');
    }

    public function instansi()
    {
        return $this->belongsTo(Instansi::class, 'id_instansi');
    }

    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'id_mobil', 'id_mobil');
    }

    public function sopir()
    {
        return $this->belongsTo(Sopir::class, 'id_sopir', 'id_sopir');
    }

    public function layanan()
    {
        return $this->belongsToMany(Layanan::class, 'booking_layanan', 'id_booking', 'id_layanan');
    }

    public function suratMasuk()
    {
        return $this->hasOne(SuratMasuk::class, 'id_booking');
    }

    public function pelayananUmkm()
    {
        return $this->hasMany(PelayananUmkm::class, 'id_booking');
    }

    public function laporan()
    {
        return $this->hasOne(Laporan::class, 'id_booking', 'id_booking');
    }
}
