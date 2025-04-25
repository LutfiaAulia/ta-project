<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pelayanan_umkm', function (Blueprint $table) {
            $table->id('id_pelayanan');
            $table->string('nik');
            $table->string('nama');
            $table->string('jenis_kelamin');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('email');
            $table->string('jenis_usaha');
            $table->string('nama_usaha');
            $table->string('alamat usaha');
            $table->string('layanan');
            $table->string('nip');
            $table->unsignedBigInteger('id_booking');
            
            $table->foreign('nip')->references('nip')->on('pegawai')->onDelete('cascade');
            $table->foreign('id_booking')->references('id_booking')->on('booking')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelayanan_umkm');
    }
};
