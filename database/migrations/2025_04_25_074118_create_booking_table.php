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
        Schema::create('booking', function (Blueprint $table) {
            $table->id('id_booking');
            $table->date('tanggal_mulai');
            $table->date('tanggal_akhir');
            $table->time('waktu_mulai');
            $table->time('waktu_akhir');
            $table->text('acara');
            $table->integer('peserta');
            $table->string('lokasi');
            $table->string('no_hp');
            $table->string('surat');
            $table->string('pegawailap')->nullable();
            $table->text('alasan_ditolak')->nullable();
            $table->string('status_booking');
            $table->unsignedBigInteger('id_instansi')->nullable();
            $table->unsignedBigInteger('id_mobil')->nullable();
            $table->unsignedBigInteger('id_sopir')->nullable();

            $table->foreign('id_instansi')->references('id')->on('instansi')->nullOnDelete();
            $table->foreign('id_mobil')->references('id_mobil')->on('mobil')->nullOnDelete();
            $table->foreign('id_sopir')->references('id_sopir')->on('sopir')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
